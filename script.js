
// Safely formats Gemini Markdown into readable HTML.
function renderAIInsight(markdown) {
  const container = $("aiResponseText");
  if (!container) return;

  container.replaceChildren();
  container.dir = currentLanguage === "ur" ? "rtl" : "ltr";
  container.style.textAlign = currentLanguage === "ur" ? "right" : "left";
  container.style.lineHeight = "1.9";
  container.style.whiteSpace = "normal";

  const normalized = String(markdown || "")
    .replace(/\r/g, "")
    .replace(/\\(?=#{1,6})/g, "")
    .replace(/\\#/g, "")
    .replace(/^[ \t]*#{1,6}[ \t]*$/gm, "")
    .replace(/^[ \t]*---+[ \t]*$/gm, "")
    .replace(/\\\(\\rightarrow\\\)|\$\\rightarrow\$/g, "→")
    .replace(/\\rightarrow/g, "→")
    .replace(/[ \t]+(#{1,6}\s)/g, "\n$1")
    .replace(/[ \t]+([*•-]\s)/g, "\n$1")
    .replace(/[ \t]+(\d+[.)]\s)/g, "\n$1")
    .trim();

  const lines = normalized.split("\n");
  let list = null;

  function addInline(parent, value) {
    const parts = value.split(/(\*\*.*?\*\*)/g);

    parts.forEach(part => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const strong = document.createElement("strong");
        strong.textContent = part.slice(2, -2);
        parent.appendChild(strong);
      } else if (part) {
        parent.appendChild(document.createTextNode(part));
      }
    });
  }

  lines.forEach(rawLine => {
    const line = rawLine.trim();

    if (!line || /^---+$/.test(line)) {
      list = null;
      return;
    }

    // Remove leftover standalone heading markers.
    if (/^\\?#{1,6}$/.test(line)) {
      list = null;
      return;
    }

    // Convert numbered section titles into headings.
    const numberedHeading = line.match(
      /^\d+[.)]\s+(.+)$/
    );

    if (
      numberedHeading &&
      /^(workflow summary|operational strengths|key risks|five practical improvements|practical improvements|priority levels|overall assessment|workflows summary|خلاصہ|عملی مضبوط پہلو|اہم خطرات|بہتری کی تجاویز|ترجیحات|مجموعی جائزہ)/i.test(
        numberedHeading[1].replace(/\*\*/g, "").trim()
      )
    ) {
      list = null;

      const h = document.createElement("h3");
      addInline(h, numberedHeading[1]);

      h.style.margin = "20px 0 10px";
      h.style.fontSize = "1.05rem";
      h.style.fontWeight = "700";

      container.appendChild(h);
      return;
    }

    // Standard Markdown headings.
    const heading = line.match(/^#{1,6}\s+(.+)/);

    if (heading) {
      list = null;

      const h = document.createElement("h3");
      addInline(h, heading[1]);

      h.style.margin = "20px 0 10px";
      h.style.fontSize = "1.05rem";
      h.style.fontWeight = "700";

      container.appendChild(h);
      return;
    }

    const numbered = line.match(/^\d+[.)]\s+(.+)/);
    const bullet = line.match(/^[-*•]\s+(.+)/);

    if (numbered || bullet) {
      const type = numbered ? "ol" : "ul";

      if (!list || list.tagName.toLowerCase() !== type) {
        list = document.createElement(type);
        list.style.paddingInlineStart = "25px";
        list.style.margin = "8px 0 14px";
        container.appendChild(list);
      }

      const li = document.createElement("li");
      addInline(li, (numbered || bullet)[1]);

      li.style.marginBottom = "7px";
      list.appendChild(li);
      return;
    }

    list = null;

    const p = document.createElement("p");
    addInline(p, line);
    p.style.margin = "8px 0";

    container.appendChild(p);
  });
}
