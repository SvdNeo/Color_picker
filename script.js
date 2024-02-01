const browseBtn = document.getElementById('browseImage');
const uploadedImage = document.getElementById('uploadedImage');

browseBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
  
    fileInput.onchange = (e) => {
        const file = e.target.files[0]; 
        const imgURL = URL.createObjectURL(file);
        uploadedImage.src = imgURL; 
    }
  
    fileInput.click();
});
