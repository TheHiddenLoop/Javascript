const toast = (() => {
  const container = document.getElementById("toast-container");

  let toastCount = 0;

  const DEFAULT_DURATION = 3000;

  const createToast = (message, type, duration = DEFAULT_DURATION) => {
    const toastId = `toast-${toastCount++}`;
    const toast = document.createElement("div");
    toast.id = toastId;
    toast.className = `toast toast-${type}`;

    let iconHtml = "";

    switch (type) {
      case "success":
        iconHtml = `<div class="toast-icon success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
        </div>`;
        break;
      case "error":
        iconHtml = `<div class="toast-icon error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
          </svg>
        </div>`;
        break;
      case "loading":
        iconHtml = `<div class="toast-icon"><div class="spinner"></div></div>`;
        duration = null;
        break;
      default:
        iconHtml = "";
    }

    toast.innerHTML = `
      ${iconHtml}
      <div class="toast-content">${message}</div>
    `;

    container.appendChild(toast);

    toast.offsetHeight;

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    if (duration !== null) {
      setTimeout(() => {
        dismissToast(toastId);
      }, duration);
    }

    return toastId;
  };

  const dismissToast = (toastId) => {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.remove("show");

      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  };

  return {
    success: (message, duration) => {
      return createToast(message, "success", duration);
    },
    error: (message, duration) => {
      return createToast(message, "error", duration);
    },
    loading: (message, duration) => {
      return createToast(message, "loading", duration);
    },
    dismiss: (toastId) => {
      dismissToast(toastId);
    },
  };
})();
