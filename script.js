
// NEUROCORE - Improved AI Insight Renderer
function renderAIInsight(markdown) {
  const container = $("aiResponseText");
  if (!container) return;

  container.replaceChildren();

  const isUrdu = currentLanguage === "ur";

  container.dir = isUrdu ? "rtl" : "ltr";
  container.style.textAlign = isUrdu ? "right" : "left";
  container.style.lineHeight = "1.9";
  container.style.whiteSpace = "normal";
  container.style.overflowWrap = "anywhere";

  const normalized = String(markdown || "")
    .replace(/\r/g, "")
    .replace(/\\(?=#{1,6})/g, "")
    .replace(/\\#/g, "")
    .replace(/^[ \t]*#{1,6}[ \t]*$/gm, "")
    .replace(/^[ \t]*\\?---+[ \t]*$/gm, "")
    .replace(/\\rightarrow/g, "→")
    .replace(/[ \t]+(#{1,6}\s)/g, "\n$1")
    .replace(/[ \t]+(\d+[.)]\s)/g, "\n$1")
    .replace(/[ \t]+([-*•]\s)/g, "\n$1")
    .trim();

  const lines = normalized.split("\n");
  let list = null;

  const sectionNames = [
    "workflow summary",
    "operational strengths",
    "key risks",
    "five practical improvements",
    "practical improvements",
    "priority levels",
    "overall assessment",
    "implementation priorities",
    "implementation priority",
    "ai-powered improvement recommendations",
    "expected operational benefits",
    "final intelligence assessment",
    "recommendations",
    "خلاصہ",
    "عملی مضبوط پہلو",
    "اہم خطرات",
    "بہتری کی تجاویز",
    "ترجیحات",
    "مجموعی جائزہ"
  ];

  function addInline(parent, value) {
    const parts = value.split(/(\*\*.*?\*\*|\*[^*]+\*)/g);

    parts.forEach(part => {
      if (!part) return;

      if (part.startsWith("**") && part.endsWith("**")) {
        const strong = document.createElement("strong");
        strong.textContent = part.slice(2, -2);
        parent.appendChild(strong);
      } else if (part.startsWith("*") && part.endsWith("*")) {
        const em = document.createElement("em");
        em.textContent = part.slice(1, -1);
        parent.appendChild(em);
      } else {
        parent.appendChild(document.createTextNode(part));
      }
    });
  }

  function addHeading(text, level = 3) {
    const h = document.createElement(
      level === 1 ? "h2" : "h3"
    );

    addInline(h, text.replace(/\*\*/g, "").trim());

    h.style.margin = "20px 0 10px";
    h.style.fontSize = level === 1 ? "1.35rem" : "1.08rem";
    h.style.fontWeight = "700";

    container.appendChild(h);
  }

  lines.forEach(rawLine => {
    const line = rawLine.trim();

    if (!line || /^---+$/.test(line)) {
      list = null;
      return;
    }

    // Remove standalone Markdown markers.
    if (/^\\?#{1,6}$/.test(line)) {
      list = null;
      return;
    }

    // Standard Markdown headings.
    const heading = line.match(/^#{1,6}\s+(.+)/);

    if (heading) {
      list = null;
      addHeading(heading[1], heading[1].startsWith("NEUROCORE") ? 1 : 3);
      return;
    }

    // Identify numbered section headings.
    const numbered = line.match(/^(\d+)[.)]\s+(.+)$/);

    if (numbered) {
      const title = numbered[2]
        .replace(/\*\*/g, "")
        .trim()
        .toLowerCase();

      const isSection = sectionNames.some(name =>
        title.startsWith(name)
      );

      if (isSection) {
        list = null;
        addHeading(numbered[2]);
        return;
      }
    }

    // Bullet and numbered lists.
    const bullet = line.match(/^[-*•]\s+(.+)/);
    const numberedItem = line.match(/^(\d+)[.)]\s+(.+)/);

    if (bullet || numberedItem) {
      const type = numberedItem ? "ol" : "ul";

      if (!list || list.tagName.toLowerCase() !== type) {
        list = document.createElement(type);
        list.style.paddingInlineStart = "25px";
        list.style.margin = "8px 0 14px";
        container.appendChild(list);
      }

      const li = document.createElement("li");

      addInline(
        li,
        numberedItem ? numberedItem[2] : bullet[1]
      );

      li.style.marginBottom = "7px";
      list.appendChild(li);
      return;
    }

    // Regular paragraphs.
    list = null;

    const p = document.createElement("p");
    addInline(p, line);
    p.style.margin = "8px 0";

    container.appendChild(p);
  });
}
