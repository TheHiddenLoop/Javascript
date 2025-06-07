document.getElementById('btn').addEventListener('click', function () {
    const loader = document.getElementById('loader');
    
    loader.style.display = 'inline-block';

    this.disabled = true;

    setTimeout(() => {
        loader.style.display = 'none';
        this.disabled = false;
    }, 3000); 
});
