function removeExistingToast(id) {
        const existing = document.getElementById(id);
        if (existing) existing.remove();
      }

      function successToast(message) {
        removeExistingToast("success-toast");

        const toast = document.createElement("div");
        toast.className = "toast-base toast-success show";
        toast.id = "success-toast";

        const icon = document.createElement("div");
        icon.className = "toast-icon";
        icon.innerHTML = '<i class="fas fa-check"></i>';

        const msg = document.createElement("div");
        msg.className = "toast-message";
        msg.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(msg);
        document.body.appendChild(toast);

        setTimeout(() => {
          toast.classList.remove("show");
          setTimeout(() => toast.remove(), 500);
        }, 3000);
      }

      function errorToast(message) {
        removeExistingToast("error-toast");

        const toast = document.createElement("div");
        toast.className = "toast-base toast-error show";
        toast.id = "error-toast";

        const icon = document.createElement("div");
        icon.className = "toast-icon";
        icon.innerHTML = '<i class="fas fa-times"></i>';

        const msg = document.createElement("div");
        msg.className = "toast-message";
        msg.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(msg);
        document.body.appendChild(toast);

        setTimeout(() => {
          toast.classList.remove("show");
          setTimeout(() => toast.remove(), 500);
        }, 3000);
      }