const browseBtn = document.getElementById('browseImage');
const uploadedImage = document.getElementById('uploadedImage');
const addBtn = document.getElementById('add'); 
const removeBtn = document.getElementById('remove');
const paletteContainer = document.querySelector('.dynamic-container');
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
    
    const colorPicker = createColorPicker(sRGBHex);
    uploadedImage.parentElement.appendChild(colorPicker); 
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

function createColorPicker(color) {
    const colorPicker = document.createElement('div');
    colorPicker.classList.add('color-picker');
    colorPicker.style.backgroundColor = color;
    colorPicker.draggable = true;
    colorPicker.dataset.color = color;

    colorPicker.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', color);
    });

    colorPicker.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    colorPicker.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedColor = e.dataTransfer.getData('text/plain');
        const targetColor = e.target.dataset.color;
        
        if (draggedColor !== targetColor) {
            const indexDragged = palette.indexOf(draggedColor);
            const indexTarget = palette.indexOf(targetColor);
            
            [palette[indexDragged], palette[indexTarget]] = [palette[indexTarget], palette[indexDragged]];
            
            const colorPickers = document.querySelectorAll('.color-picker');
            const colorPickerArray = Array.from(colorPickers);
            
            const [draggedPicker, targetPicker] = colorPickerArray.filter(picker => picker.dataset.color === draggedColor || picker.dataset.color === targetColor);
            
            const tempPosition = draggedPicker.style.order;
            draggedPicker.style.order = targetPicker.style.order;
            targetPicker.style.order = tempPosition;
        }
    });

    return colorPicker;
}
