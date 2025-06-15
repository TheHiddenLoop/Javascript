const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');

textInput.addEventListener('input', () => {
  const text = textInput.value.trim();
  const words = text === '' ? 0 : text.split(/\s+/).length;
  const characters = text.length;

  wordCount.textContent = words;
  charCount.textContent = characters;
});
