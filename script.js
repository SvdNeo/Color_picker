const imageCanvas = document.getElementById("imageCanvas");
const colorPaletteContainer = document.getElementById("colorPalette");
const imageInput = document.getElementById("imageInput");
let colorPickers = [];
let hexValues = [];
imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      if (!e.target.result) {
        img.src = "/default_image.jpg";
      } else {
        img.src = e.target.result;
      }

      img.onload = function () {
        imageCanvas
          .getContext("2d")
          .drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        addColorPicker();
        addColorPicker();
      };
    };

    reader.readAsDataURL(file);
  }
}

function addColorPicker() {
  if (colorPickers.length < 10) {
    const colorPicker = document.createElement("div");
    colorPicker.classList.add("colorPicker");
    colorPicker.style.top = getRandomPosition() + "px";
    colorPicker.style.left = getRandomPosition() + "px";

    colorPicker.addEventListener("mousedown", startDrag);
    colorPickers.push(colorPicker);
    updateColorPalette();
    document.getElementById("canvasContainer").appendChild(colorPicker);
    addActivePicker(colorPicker);

    if (colorPickers.length === 10) {
      document.getElementById("addColorPickerButton").disabled = true;
    }
  } else {
    alert("You have reached the maximum number of color pickers");
  }
}
