const editor = CodeMirror(document.getElementById("editor"), {
  value: "",
  mode: "javascript",
  lineNumbers: true,
});

const outputDiv = document.getElementById("output");
const languageSelect = document.getElementById("language");

const languageMap = {
  javascript: "javascript",
  python: "python",
  cpp: "text/x-c++src",
  c: "text/x-csrc",
  csharp: "text/x-csharp",
  typescript: "text/typescript",
  go: "text/x-go",
  rust: "text/x-rustsrc",
};

const judge0LangIds = {
  javascript: 63,   // Node.js
  python: 71,       // Python 3
  cpp: 54,          // C++ (GCC 9.2.0)
  c: 50,            // C (GCC 9.2.0)
  csharp: 51,       // C# (Mono)
  typescript: 74,   // TypeScript
  go: 60,           // Go
  rust: 73,         // Rust
};


languageSelect.addEventListener("change", () => {
  const selected = languageSelect.value;
  editor.setOption("mode", languageMap[selected]);
  outputDiv.textContent = "Output will appear here...";
});

async function runCode() {
    const code = editor.getValue();
    const lang = languageSelect.value;

    if (lang === "javascript") {
      const oldLog = console.log;
      let logOutput = "";
      console.log = function (...args) {
        logOutput += args.join(" ") + "\n";
      };
      try {
        const result = eval(code);
        outputDiv.textContent = logOutput || result || "Code executed (no output)";
      } catch (e) {
        outputDiv.textContent = "Error: " + e.message;
      }
      console.log = oldLog;
    } else {
      outputDiv.textContent = "Running code...";
      try {
        const response = await fetch("/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: code,
            language_id: judge0LangIds[lang],
          }),
        });

        const result = await response.json();
        outputDiv.textContent =
          result.stderr || result.compile_output || result.stdout || "No output.";
      } catch (err) {
        outputDiv.textContent = "Error calling backend: " + err.message;
      }
    }
  }
