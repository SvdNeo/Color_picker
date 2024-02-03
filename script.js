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

