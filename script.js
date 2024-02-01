const browseBtn = document.getElementById('browseImage');
const uploadedImage = document.getElementById('uploadedImage');
const addBtn = document.getElementById('add'); 
const removeBtn = document.getElementById('remove');
const paletteContainer = document.querySelector('.dynamic-container');
const image = document.getElementById('uploadedImage');
const exportBtn = document.getElementById('exportPalette');

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

let palette = [];

const eyeDropper = new EyeDropper();

addBtn.addEventListener('click', async () => {
    if (palette.length >= 10) {
      addBtn.disabled = true;
      return;
    }
  
    const { sRGBHex } = await eyeDropper.open();
    palette.push(sRGBHex);
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    swatch.style.backgroundColor = sRGBHex;
    paletteContainer.appendChild(swatch);
    
    if(palette.length < 10) {
      addBtn.disabled = false;
    }
});

removeBtn.addEventListener('click', () => {
    palette.pop();
    paletteContainer.lastChild.remove();
    
    if (palette.length < 10) {
      addBtn.disabled = false;
    }
});

function generateCSV() {
    const capitalizedPalette = palette.map(color => color.toUpperCase().replace('#', ''));
    return capitalizedPalette.join(',');
}

exportBtn.addEventListener('click', () => {
    const csvContent = generateCSV();
    const withHashContent = generateWithHash();
    const arrayContent = generateArray();
  
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
  
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <h2>Export Palette</h2>
      <div id="csvFormat">- CSV<br>${csvContent}</div>
      <div id="withHashFormat">- With #<br>${withHashContent}</div>
      <div id="arrayFormat">- Array<br>${arrayContent}</div>
    `;
  
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
});

function generateWithHash() {
    return palette.map(color => color.toUpperCase()).join(',');
}

function generateArray() {
    return "[" + palette.map(color => "'" + color.toUpperCase().replace('#', '') + "'").join(', ') + "]";
}
