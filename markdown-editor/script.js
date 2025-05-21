const textarea = document.getElementById("markdown");
const preview = document.getElementById("preview");

marked.setOptions({
    highlight: function(code, lang){
        return hljs.highlightAuto(code).value;
    },
    langPrefix: 'hljs language-',
});

textarea.addEventListener("input",()=>{
    const markdownText=textarea.value;
    preview.innerHTML=marked.parse(markdownText);
});

const initialMarkdown = `# Terminal-style Markdown Editor

Write some markdown below. Here's an example of a **bash** code block:

\`\`\`bash
npm install
git init
node app.js
\`\`\`

## Features

- markdown
- Syntax highlighting
- Terminal styling for bash blocks
`;

textarea.value=initialMarkdown;
preview.innerHTML=marked.parse(initialMarkdown);