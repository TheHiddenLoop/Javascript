function colorPickerTool(){

const colorPicker = new iro.ColorPicker("#picker", {
  width: 300,
  color: "#942f28",
  layout: [
    { component: iro.ui.Box },
    { component: iro.ui.Slider, options: { sliderType: "hue" } },
  ],
});

colorPicker.on("color:change", function (color) {
  document.getElementById("hexValue").textContent = color.hexString;
  document.getElementById("rgbValue").textContent =
    color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b;
  document.getElementById("hslValue").textContent = `${Math.round(
    color.hsl.h
  )}°, ${Math.round(color.hsl.s)}%, ${Math.round(color.hsl.l)}%`;

  document.getElementById("hsvValue").textContent = `${Math.round(
    color.hsv.h
  )}°, ${Math.round(color.hsv.s)}%, ${Math.round(color.hsv.v)}%`;

  document.getElementById("cmykValue").textContent = getCMYK(color.rgb);

  document.body.style.backgroundColor=color.hexString;
});

function getCMYK(rgb) {
  let r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255;
  let k = 1 - Math.max(r, g, b);
  if (k === 1) return "0%, 0%, 0%, 100%";
  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - k) / (1 - k);
  let y = (1 - b - k) / (1 - k);
  return `${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(
    y * 100
  )}%, ${Math.round(k * 100)}%`;
}

}

function copyToClipboard(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${text} to clipboard`);
  });
}


window.onload = (event) => {
colorPickerTool();
};


function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = 1;
  toast.style.top = "50px";
  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.top = "30px";
  }, 3000);
}