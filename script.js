const browseBtn = document.getElementById('browseImage');
const uploadedImage = document.getElementById('uploadedImage');
const addBtn = document.getElementById('add'); 
const removeBtn = document.getElementById('remove');
const paletteContainer = document.querySelector('.dynamic-container');
const image = document.getElementById('uploadedImage');
const exportBtn = document.getElementById('exportPalette');

let eyeDropper; 
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

uploadedImage.addEventListener('mouseover', () => {
  if (eyeDropper) {
      eyeDropper.enable();
  }
});

uploadedImage.addEventListener('mouseout', () => {
  if (eyeDropper) {
      eyeDropper.disable();
  }
});
const circles = document.querySelectorAll('.draggable-circle');

circles.forEach(circle => {
  circle.addEventListener('dragstart', (event) => {
    circle.style.opacity = '0.5'; // make it translucent while dragging
  });

  circle.addEventListener('dragend', (event) => {
    circle.style.opacity = '1'; // restore opacity when dragging ends
  });
});



uploadedImage.onload = () => {
    eyeDropper = new EyeDropper({
        image: uploadedImage, 
    });
};

addBtn.addEventListener('click', async () => {
    if (!eyeDropper) return; 

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
    
    if(palette.length <= 10) {
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
