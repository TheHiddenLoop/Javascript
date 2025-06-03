const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const documentsContainer = document.getElementById("documentsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");
const modal = document.getElementById("documentModal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.getElementById("modalTitle");
const documentPreview = document.getElementById("documentPreview");
const fileName = document.getElementById("fileName");
const fileType = document.getElementById("fileType");
const fileSize = document.getElementById("fileSize");
const uploadDate = document.getElementById("uploadDate");
const downloadBtn = document.getElementById("downloadBtn");
const deleteBtn = document.getElementById("deleteBtn");

let documents = JSON.parse(localStorage.getItem("documents")) || [];
let selectedDocumentId = null;
let selectedFiles = [];

function init() {
  renderDocuments();
  setupEventListeners();
}

function setupEventListeners() {
  dropArea.addEventListener("click", () => fileInput.click());
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
  });
  dropArea.addEventListener("dragleave", (e) => {
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", handleFileDrop);
  fileInput.addEventListener("change", (e) => {
    selectedFiles = Array.from(e.target.files);
    updateUploadAreaText();
  });

  uploadBtn.addEventListener("click", uploadDocuments);

  searchInput.addEventListener("input", filterDocuments);
  categoryFilter.addEventListener("change", filterDocuments);
  dateFilter.addEventListener("change", filterDocuments);

  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  downloadBtn.addEventListener("click", downloadDocument);
  deleteBtn.addEventListener("click", deleteDocument);
}

function renderDocuments(filteredDocs = null) {
  const docsToRender = filteredDocs || documents;

  if (docsToRender.length === 0) {
    documentsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <p>No documents found. Upload some documents to get started!</p>
            </div>
        `;
    return;
  }

  documentsContainer.innerHTML = "";

  docsToRender.forEach((doc) => {
    const docElement = document.createElement("div");
    docElement.className = "document-card";
    docElement.dataset.id = doc.id;

    let iconClass = "fa-file";
    if (doc.type === "pdf") iconClass = "fa-file-pdf";
    else if (doc.type === "doc") iconClass = "fa-file-word";
    else if (doc.type === "img") iconClass = "fa-file-image";

    docElement.innerHTML = `
            <div class="document-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="document-info">
                <h3 title="${doc.name}">${doc.name}</h3>
                <p>${formatDate(doc.date)}</p>
            </div>
        `;

    docElement.addEventListener("click", () => openDocumentModal(doc));
    documentsContainer.appendChild(docElement);
  });
}

function handleFileDrop(e) {
  e.preventDefault();
  dropArea.classList.remove("dragover");
  if (e.dataTransfer.files.length > 0) {
    selectedFiles = Array.from(e.dataTransfer.files);
    updateUploadAreaText();
  }
}

function updateUploadAreaText() {
  if (selectedFiles.length > 0) {
    dropArea.innerHTML = `<i class="fas fa-check-circle" style="color: #28a745;"></i>
            <p>${selectedFiles.length} file(s) selected</p>
            <small>Click to change selection</small>
        `;
  } else {
    dropArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Drag & Drop files here or click to browse</p>
        `;
  }
}
function uploadDocuments() {
  if (selectedFiles.length === 0) {
    alert("Please select at least one file to upload");
    return;
  }

  selectedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileData = e.target.result;
      const fileExtension = file.name.split(".").pop().toLowerCase();

      const newDocument = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: getFileType(fileExtension),
        extension: fileExtension,
        size: formatFileSize(file.size),
        sizeInBytes: file.size,
        date: new Date().toISOString(),
        data: fileData,
      };

      documents.unshift(newDocument);

      saveDocuments();
      renderDocuments();
    };

    reader.readAsDataURL(file);
  });
  selectedFiles = [];
  updateUploadAreaText();
  fileInput.value = "";
}

function getFileType(extension) {
  const pdfTypes = ["pdf"];
  const docTypes = ["doc", "docx", "txt", "rtf", "odt"];
  const imgTypes = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];

  if (pdfTypes.includes(extension)) return "pdf";
  if (docTypes.includes(extension)) return "doc";
  if (imgTypes.includes(extension)) return "img";
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function saveDocuments() {
  localStorage.setItem("documents", JSON.stringify(documents));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function filterDocuments() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const dateRange = dateFilter.value;

  const filtered = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || doc.type === category;

    const docDate = new Date(doc.date);
    const now = new Date();
    let matchesDate = true;

    if (dateRange === "today") {
      const today = new Date(now.getFullYear(), now.getMonth, now.getDate());
      matchesDate = docDate >= today;
    } else if (dateRange === "week") {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      matchesDate = docDate >= weekStart;
    } else if (dateRange === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      matchesDate = docDate >= monthStart;
    }

    return matchesSearch && matchesCategory && matchesDate;
  });
  renderDocuments(filtered);
}

function openDocumentModal(doc) {
  selectedDocumentId = doc.id;

  modalTitle.textContent = doc.name;
  fileName.textContent = doc.name;
  fileType.textContent = doc.extension.toUpperCase();
  fileSize.textContent = doc.size;
  uploadDate.textContent = formatDate(doc.date);

  if (doc.type === "img") {
    documentPreview.innerHTML = `<img src="${doc.data}" alt="${doc.name}">`;
  } else {
    let iconClass = "fa-file";
    if (doc.type === "pdf") iconClass = "fa-file-pdf";
    else if (doc.type === "doc") iconClass = "fa-file-word";

    documentPreview.innerHTML = `
            <i class="fas ${iconClass}" style="font-size: 100px; color: #555;"></i>
            <p style="margin-top: 15px;">Preview not available</p>
        `;
  }

  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
  selectedDocumentId = null;
}

function downloadDocument() {
  if (!selectedDocumentId) return;

  const doc = documents.find((d) => d.id === selectedDocumentId);
  if (!doc) return;

  const link = document.createElement("a");
  link.href = doc.data;
  link.download = doc.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function deleteDocument() {
  if (!selectedDocumentId) return;

  if (confirm("Are you sure you want to delete this document?")) {
    documents = documents.filter((doc) => doc.id !== selectedDocumentId);
    saveDocuments();
    renderDocuments();
    closeModal();
  }
}

document.addEventListener("DOMContentLoaded", init);
