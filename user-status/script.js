const statusDiv = document.getElementById('status');
    const text = document.getElementById('text');

    function updateStatus() {
      if (navigator.onLine) {
        statusDiv.classList.add('online');
        statusDiv.classList.remove('offline');
        text.textContent = 'Online';
      } else {
        statusDiv.classList.add('offline');
        statusDiv.classList.remove('online');
        text.textContent = 'Offline';
      }
    }

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    updateStatus();