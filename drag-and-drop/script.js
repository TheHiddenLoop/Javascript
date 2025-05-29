const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');

let selectedFiles = [];

function init() {
    setupEventListeners();
}

function setupEventListeners() {
    dropArea.addEventListener("click", () => fileInput.click());

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("dragover");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("dragover");
    });

    dropArea.addEventListener('drop', handleFileDrop);

    fileInput.addEventListener("change", (e) => {
        selectedFiles = Array.from(e.target.files);
        updateUploadAreaText();
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
        dropArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #28a745;"></i>
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

document.addEventListener('DOMContentLoaded', init);
