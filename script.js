const STORAGE_KEY = "neurocore_v4_records";
const AI_API_URL = "https://odd-cake-4256neurocore-ai-engine.zkj789.workers.dev/"; // Cloudflare Worker Gemini backend

let records = [];
try {
  records = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!Array.isArray(records)) records = [];
} catch {
  records = [];
}

const $ = id => document.getElementById(id);

const translations = {
  en: {
    subtitle:"INTELLIGENCE ENGINE",
    systemOnline:"SYSTEM ONLINE",
    mainMenu:"MAIN MENU",
    dashboard:"Dashboard",
    workflowAnalysis:"Workflow Analysis",
    videoCenter:"IT Video Center",
    reports:"Reports",
    riskMonitoring:"Risk Monitoring",
    engineActive:"ENGINE ACTIVE",
    workspace:"INTELLIGENCE WORKSPACE",
    overview:"Overview",
    liveSystem:"LIVE SYSTEM",
    intelligencePlatform:"WORKFLOW INTELLIGENCE PLATFORM",
    heroTitle:"Understand. Analyze. Optimize.",
    heroDescription:"Analyze operational workflows, identify risks and discover opportunities for smarter work.",
    startAnalysis:"Start Workflow Analysis →",
    systemOverview:"SYSTEM OVERVIEW",
    performanceMetrics:"Performance Metrics",
    updatedLive:"● UPDATED LIVE",
    totalAnalyses:"Total Analyses",
    allRecords:"All saved records",
    aiAssistedTasks:"AI-Assisted Tasks",
    aiRelatedMatches:"AI-related matches",
    automationTasks:"Automation Tasks",
    automationMatches:"Automation-related matches",
    highRiskTasks:"High Risk Tasks",
    riskDetected:"High-risk records",
    quickAction:"QUICK ACTION",
    analyzeWorkflow:"Analyze a Workflow",
    quickActionDescription:"Submit a work process to evaluate its category, risk level and improvement opportunities.",
    openAnalyzer:"Open Analyzer →",
    learningHub:"LEARNING HUB",
    itLearningCenter:"IT Learning Center",
    learningDescription:"Explore IT support, networking, cybersecurity and technology tutorials.",
    exploreVideos:"Explore Videos →",
    analysisModule:"INTELLIGENCE MODULE / 01",
    analysisDescription:"Describe a workflow to analyze its operations, risks and improvement opportunities.",
    workflowDescription:"Describe Your Workflow",
    workflowPlaceholder:"Example: Our IT department receives support requests through email...",
    analyzeWorkflowBtn:"◈ Analyze Workflow",
    loadSample:"Load Sample",
    clear:"Clear",
    processing:"Analyzing workflow...",
    analysisOutput:"ANALYSIS OUTPUT",
    intelligenceReport:"Intelligence Report",
    completed:"COMPLETED",
    category:"CATEGORY",
    riskLevel:"RISK LEVEL",
    aiMatches:"AI MATCHES",
    executionPriority:"EXECUTION PRIORITY",
    recommendations:"Recommendations",
    aiInsights:"AI Insights",
    learningModule:"LEARNING MODULE / 02",
    videoDescription:"Learn practical IT skills through selected video tutorials.",
    selectTutorial:"Select a Tutorial",
    videoPlaceholder:"Choose a learning video from the gallery below.",
    videoPlayer:"Video Player",
    chooseVideo:"Choose a tutorial to start learning.",
    tutorialLibrary:"Tutorial Library",
    learningVideos:"LEARNING VIDEOS",
    itSupport:"IT SUPPORT",
    itSupportTutorial:"IT Support Fundamentals",
    networking:"NETWORKING",
    networkingTutorial:"Networking Basics",
    cybersecurity:"CYBERSECURITY",
    cybersecurityTutorial:"Cybersecurity Awareness",
    troubleshooting:"TROUBLESHOOTING",
    troubleshootingTutorial:"Computer Troubleshooting",
    watchTutorial:"Watch Tutorial →",
    reportModule:"REPORTING MODULE / 03",
    reportsDescription:"Review saved workflow analyses and export your records.",
    savedRecords:"SAVED RECORDS",
    analysisHistory:"Analysis History",
    exportCsv:"↓ Export CSV",
    date:"DATE",
    workflow:"WORKFLOW",
    risk:"RISK",
    priority:"PRIORITY",
    noReports:"No Reports Yet",
    noReportsDescription:"Your workflow analysis records will appear here.",
    createFirstReport:"Create Your First Report",
    riskModule:"SECURITY MODULE / 04",
    riskDescription:"Monitor risk levels identified in your workflow analysis records.",
    highRisk:"HIGH RISK",
    mediumRisk:"MEDIUM RISK",
    lowRisk:"LOW RISK",
    monitoringLog:"MONITORING LOG",
    riskActivity:"Risk Activity",
    recordBased:"RECORD BASED",
    noRiskRecords:"No Risk Records",
    noRiskDescription:"Analyze a workflow to populate risk monitoring.",
    prototypeNotice:"PORTFOLIO PROTOTYPE",
    hybrid:"HYBRID WORKFLOW",
    aiCategory:"AI WORKFLOW",
    automationCategory:"AUTOMATION WORKFLOW",
    itCategory:"IT SUPPORT",
    generalCategory:"GENERAL WORKFLOW",
    high:"HIGH",
    medium:"MEDIUM",
    low:"LOW",
    urgent:"URGENT",
    attention:"ATTENTION REQUIRED",
    normal:"NORMAL",
    recommendationHigh:"High operational risk indicators detected. Review security, access permissions and process controls before proceeding.",
    recommendationMedium:"Potential operational or data risks detected. Review procedures and safeguards.",
    recommendationLow:"No major risk indicators detected by this prototype. Continue routine monitoring.",
    emptyInput:"Please enter a workflow description first.",
    saved:"Analysis completed and saved.",
    exportEmpty:"There are no reports to export yet.",
    videoError:"This video could not be loaded. Please try another tutorial.",
    localMode:"Local rule-based analysis",
    backendMissing:"Gemini AI backend is not connected. This result uses local rule-based analysis, not a real AI model.",
    aiLoading:"Gemini AI is analyzing your workflow. Please wait...",
    aiError:"Gemini could not complete the analysis. Local rule-based results are still available. Error: "
  },
  ur: {
    subtitle:"انٹیلیجنس انجن",
    systemOnline:"سسٹم آن لائن",
    mainMenu:"مرکزی مینو",
    dashboard:"ڈیش بورڈ",
    workflowAnalysis:"ورک فلو تجزیہ",
    videoCenter:"آئی ٹی ویڈیو سینٹر",
    reports:"رپورٹس",
    riskMonitoring:"خطرات کی نگرانی",
    engineActive:"انجن فعال ہے",
    workspace:"انٹیلیجنس ورک اسپیس",
    overview:"جائزہ",
    liveSystem:"لائیو سسٹم",
    intelligencePlatform:"ورک فلو انٹیلیجنس پلیٹ فارم",
    heroTitle:"سمجھیں۔ تجزیہ کریں۔ بہتر بنائیں۔",
    heroDescription:"کام کے طریقہ کار کا تجزیہ کریں، خطرات کی شناخت کریں اور بہتر کام کے مواقع تلاش کریں۔",
    startAnalysis:"تجزیہ شروع کریں ←",
    systemOverview:"سسٹم کا جائزہ",
    performanceMetrics:"کارکردگی کے اعداد و شمار",
    updatedLive:"● تازہ ترین معلومات",
    totalAnalyses:"کل تجزیے",
    allRecords:"تمام محفوظ ریکارڈ",
    aiAssistedTasks:"اے آئی سے متعلق کام",
    aiRelatedMatches:"اے آئی سے متعلق نتائج",
    automationTasks:"آٹومیشن کے کام",
    automationMatches:"آٹومیشن سے متعلق نتائج",
    highRiskTasks:"زیادہ خطرے والے کام",
    riskDetected:"زیادہ خطرے کے ریکارڈ",
    quickAction:"فوری کارروائی",
    analyzeWorkflow:"ورک فلو کا تجزیہ کریں",
    quickActionDescription:"کسی کام کی تفصیل درج کریں تاکہ اس کی قسم، خطرے اور بہتری کے مواقع کا جائزہ لیا جا سکے۔",
    openAnalyzer:"تجزیہ کھولیں ←",
    learningHub:"تعلیمی مرکز",
    itLearningCenter:"آئی ٹی تعلیمی مرکز",
    learningDescription:"آئی ٹی سپورٹ، نیٹ ورکنگ، سائبر سکیورٹی اور ٹیکنالوجی کے اسباق دیکھیں۔",
    exploreVideos:"ویڈیوز دیکھیں ←",
    analysisModule:"انٹیلیجنس ماڈیول / 01",
    analysisDescription:"ورک فلو کی تفصیل درج کریں تاکہ اس کے کام، خطرات اور بہتری کے مواقع کا تجزیہ کیا جا سکے۔",
    workflowDescription:"اپنے ورک فلو کی تفصیل لکھیں",
    workflowPlaceholder:"مثال: ہمارا آئی ٹی شعبہ ای میل کے ذریعے سپورٹ کی درخواستیں وصول کرتا ہے...",
    analyzeWorkflowBtn:"◈ ورک فلو کا تجزیہ کریں",
    loadSample:"مثال لوڈ کریں",
    clear:"صاف کریں",
    processing:"ورک فلو کا تجزیہ جاری ہے...",
    analysisOutput:"تجزیے کا نتیجہ",
    intelligenceReport:"انٹیلیجنس رپورٹ",
    completed:"مکمل",
    category:"قسم",
    riskLevel:"خطرے کی سطح",
    aiMatches:"اے آئی نتائج",
    executionPriority:"ترجیح",
    recommendations:"تجاویز",
    aiInsights:"اے آئی بصیرت",
    learningModule:"تعلیمی ماڈیول / 02",
    videoDescription:"منتخب ویڈیو اسباق کے ذریعے عملی آئی ٹی مہارتیں سیکھیں۔",
    selectTutorial:"سبق منتخب کریں",
    videoPlaceholder:"نیچے دی گئی گیلری سے ویڈیو منتخب کریں۔",
    videoPlayer:"ویڈیو پلیئر",
    chooseVideo:"سیکھنے کے لیے کوئی سبق منتخب کریں۔",
    tutorialLibrary:"اسباق کی لائبریری",
    learningVideos:"تعلیمی ویڈیوز",
    itSupport:"آئی ٹی سپورٹ",
    itSupportTutorial:"آئی ٹی سپورٹ کی بنیادی باتیں",
    networking:"نیٹ ورکنگ",
    networkingTutorial:"نیٹ ورکنگ کی بنیادی باتیں",
    cybersecurity:"سائبر سکیورٹی",
    cybersecurityTutorial:"سائبر سکیورٹی آگاہی",
    troubleshooting:"مسائل کا حل",
    troubleshootingTutorial:"کمپیوٹر کے مسائل حل کرنا",
    watchTutorial:"سبق دیکھیں ←",
    reportModule:"رپورٹنگ ماڈیول / 03",
    reportsDescription:"محفوظ شدہ تجزیے دیکھیں اور اپنے ریکارڈ برآمد کریں۔",
    savedRecords:"محفوظ ریکارڈ",
    analysisHistory:"تجزیے کی تاریخ",
    exportCsv:"↓ CSV برآمد کریں",
    date:"تاریخ",
    workflow:"ورک فلو",
    risk:"خطرہ",
    priority:"ترجیح",
    noReports:"ابھی کوئی رپورٹ موجود نہیں",
    noReportsDescription:"آپ کے ورک فلو کے تجزیے یہاں دکھائی دیں گے۔",
    createFirstReport:"پہلی رپورٹ بنائیں",
    riskModule:"سکیورٹی ماڈیول / 04",
    riskDescription:"اپنے ورک فلو کے تجزیوں میں شناخت کیے گئے خطرات کی نگرانی کریں۔",
    highRisk:"زیادہ خطرہ",
    mediumRisk:"درمیانہ خطرہ",
    lowRisk:"کم خطرہ",
    monitoringLog:"نگرانی کا ریکارڈ",
    riskActivity:"خطرات کی سرگرمیاں",
    recordBased:"ریکارڈ کی بنیاد پر",
    noRiskRecords:"خطرے کا کوئی ریکارڈ نہیں",
    noRiskDescription:"خطرات کی نگرانی کے لیے کسی ورک فلو کا تجزیہ کریں۔",
    prototypeNotice:"پورٹ فولیو پروٹوٹائپ",
    hybrid:"مشترکہ ورک فلو",
    aiCategory:"اے آئی ورک فلو",
    automationCategory:"آٹومیشن ورک فلو",
    itCategory:"آئی ٹی سپورٹ",
    generalCategory:"عمومی ورک فلو",
    high:"زیادہ",
    medium:"درمیانہ",
    low:"کم",
    urgent:"فوری",
    attention:"توجہ درکار",
    normal:"معمول",
    recommendationHigh:"زیادہ عملی خطرات کے اشارے ملے ہیں۔ آگے بڑھنے سے پہلے سکیورٹی، رسائی کی اجازتوں اور طریقہ کار کا جائزہ لیں۔",
    recommendationMedium:"ممکنہ عملی یا ڈیٹا کے خطرات کی نشاندہی ہوئی ہے۔ طریقہ کار اور حفاظتی اقدامات کا جائزہ لیں۔",
    recommendationLow:"اس پروٹوٹائپ کو کوئی بڑا خطرہ نظر نہیں آیا۔ معمول کی نگرانی جاری رکھیں۔",
    emptyInput:"براہ کرم پہلے ورک فلو کی تفصیل درج کریں۔",
    saved:"تجزیہ مکمل اور محفوظ ہو گیا۔",
    exportEmpty:"برآمد کرنے کے لیے ابھی کوئی رپورٹ موجود نہیں۔",
    videoError:"یہ ویڈیو لوڈ نہیں ہو سکی۔ کوئی دوسری ویڈیو منتخب کریں۔",
    localMode:"مقامی قواعد پر مبنی تجزیہ",
    backendMissing:"Gemini AI بیک اینڈ منسلک نہیں ہے۔ یہ نتیجہ مقامی قواعد پر مبنی ہے، حقیقی AI ماڈل پر نہیں۔",
    aiLoading:"Gemini AI آپ کے ورک فلو کا تجزیہ کر رہا ہے۔ براہ کرم انتظار کریں...",
    aiError:"Gemini تجزیہ مکمل نہیں کر سکا۔ مقامی قواعد پر مبنی نتائج دستیاب ہیں۔ خرابی: "
  }
};

let currentLanguage = "en";
let analysisTimer = null;

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function applyLanguage(lang) {
  currentLanguage = lang === "ur" ? "ur" : "en";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ur" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLanguage][key]) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  updateReports();
  updateRisks();
  updateDashboard();

  const activeVideo = document.querySelector(".video-card.selected");
  if (activeVideo) {
    $("videoTitle").textContent =
      currentLanguage === "ur"
        ? activeVideo.dataset.titleUr
        : activeVideo.dataset.title;
    $("videoDescription").textContent =
      currentLanguage === "ur"
        ? activeVideo.dataset.descriptionUr
        : activeVideo.dataset.description;
  }
}

function saveRecords() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error("Could not save records:", error);
    alert("Browser storage is unavailable or full.");
  }
}

function showPage(page) {
  const target = $(page);
  if (!target) return;

  document.querySelectorAll(".page").forEach(el => {
    el.classList.remove("active");
  });

  document.querySelectorAll(".nav").forEach(el => {
    el.classList.toggle("active", el.dataset.page === page);
  });

  target.classList.add("active");

  if (page === "dashboard") updateDashboard();
  if (page === "reports") updateReports();
  if (page === "risks") updateRisks();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function countMatches(text, words) {
  return words.filter(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("\\b" + escaped + "\\b", "i").test(text);
  }).length;
}

const aiWords = [
  "ai", "artificial intelligence", "machine learning",
  "gemini", "chatbot", "neural network", "generative ai"
];

const autoWords = [
  "automation", "automate", "automated", "workflow automation",
  "automatic", "script", "bot", "integration"
];

const highWords = [
  "breach", "data leak", "unauthorized", "ransomware",
  "malware", "critical vulnerability", "data theft"
];

const mediumWords = [
  "security", "password", "permission", "access",
  "backup", "sensitive data", "risk", "failure"
];

function evaluateWorkflow(text) {
  const aiCount = countMatches(text, aiWords);
  const autoCount = countMatches(text, autoWords);

  const highCount = highWords.filter(word => text.toLowerCase().includes(word)).length;
  const mediumCount = mediumWords.filter(word => text.toLowerCase().includes(word)).length;

  let category = "GENERAL WORKFLOW";

  if (aiCount && autoCount) category = "HYBRID WORKFLOW";
  else if (aiCount) category = "AI WORKFLOW";
  else if (autoCount) category = "AUTOMATION WORKFLOW";
  else if (/it support|computer|network|hardware|software|troubleshoot/i.test(text)) {
    category = "IT SUPPORT";
  }

  let risk = "LOW";
  if (highCount > 0) risk = "HIGH";
  else if (mediumCount > 0) risk = "MEDIUM";

  let priority = "NORMAL";
  if (risk === "HIGH") priority = "URGENT";
  else if (risk === "MEDIUM") priority = "ATTENTION REQUIRED";

  let recommendation = "No major risk indicators detected by this prototype. Continue routine monitoring.";
  if (risk === "HIGH") recommendation = t("recommendationHigh");
  if (risk === "MEDIUM") recommendation = t("recommendationMedium");
  if (risk === "LOW") recommendation = t("recommendationLow");

  return {
    category,
    risk,
    aiCount,
    autoCount,
    priority,
    recommendation
  };
}

function displayCategory(category) {
  const map = {
    "HYBRID WORKFLOW": "hybrid",
    "AI WORKFLOW": "aiCategory",
    "AUTOMATION WORKFLOW": "automationCategory",
    "IT SUPPORT": "itCategory",
    "GENERAL WORKFLOW": "generalCategory"
  };
  return t(map[category] || category);
}

function displayRisk(risk) {
  return t(risk.toLowerCase());
}

function displayPriority(priority) {
  const map = {
    "URGENT": "urgent",
    "ATTENTION REQUIRED": "attention",
    "NORMAL": "normal"
  };
  return t(map[priority] || priority);
}

function runAnalysis() {
  const text = $("workflowInput").value.trim();

  if (!text) {
    alert(t("emptyInput"));
    return;
  }

  if (analysisTimer) clearInterval(analysisTimer);

  $("analysisResult").hidden = true;
  $("processingBox").hidden = false;

  let progress = 0;
  $("analysisProgress").style.width = "0%";

  analysisTimer = setInterval(() => {
    progress += 10;
    $("analysisProgress").style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(analysisTimer);
      analysisTimer = null;
      finishAnalysis(text);
    }
  }, 90);
}

function finishAnalysis(text) {
  const result = evaluateWorkflow(text);

  const record = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    text,
    ...result,
    engine: "RULES + GEMINI",
    aiInsight: ""
  };

  records.unshift(record);
  saveRecords();

  $("processingBox").hidden = true;
  $("analysisResult").hidden = false;

  $("categoryResult").textContent = displayCategory(result.category);
  $("riskResult").textContent = displayRisk(result.risk);
  $("aiMatches").textContent = result.aiCount;
  $("autoMatches").textContent = result.autoCount;
  $("priorityResult").textContent = displayPriority(result.priority);
  $("recommendationResult").textContent = result.recommendation;

  $("aiResponse").hidden = false;
  $("aiResponseText").textContent = t("aiLoading");

  updateDashboard();
  updateReports();
  updateRisks();

  console.info(t("localMode"), result);
  requestGeminiInsight(text, record.id);
}


// Formats Gemini Markdown output into readable HTML elements.
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
    .replace(/[ \t]*---+[ \t]*/g, "\n")
    .replace(/[ \t]+(#{1,3}\s)/g, "\n$1")
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

    const heading = line.match(/^#{1,3}\s+(.+)/);
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

    const bullet = line.match(/^[*•-]\s+(.+)/);
    const numbered = line.match(/^\d+[.)]\s+(.+)/);

    if (bullet || numbered) {
      const type = numbered ? "ol" : "ul";
      if (!list || list.tagName.toLowerCase() !== type) {
        list = document.createElement(type);
        list.style.paddingInlineStart = "25px";
        list.style.margin = "8px 0 14px";
        container.appendChild(list);
      }

      const li = document.createElement("li");
      addInline(li, (bullet || numbered)[1]);
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

async function requestGeminiInsight(workflow, recordId) {
  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        workflow,
        language: currentLanguage
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success || !data.insight) {
      throw new Error(
        data.details || data.error || ("HTTP " + response.status)
      );
    }

    const record = records.find(item => item.id === recordId);
    if (record) {
      record.aiInsight = data.insight;
      saveRecords();
    }

    renderAIInsight(data.insight);

  } catch (error) {
    console.error("Gemini connection error:", error);
    const message = currentLanguage === "ur"
      ? t("aiError") + (error.message || "نامعلوم خرابی")
      : t("aiError") + (error.message || "Unknown error");
    $("aiResponseText").textContent = message;
  }
}

function updateDashboard() {
  $("totalStat").textContent = records.length;

  $("aiStat").textContent = records.filter(r => Number(r.aiCount) > 0).length;
  $("autoStat").textContent = records.filter(r => Number(r.autoCount) > 0).length;
  $("highStat").textContent = records.filter(r => r.risk === "HIGH").length;
}

function updateReports() {
  const body = $("reportsBody");
  const empty = $("emptyReports");

  if (!body || !empty) return;

  body.replaceChildren();
  empty.hidden = records.length > 0;

  records.forEach(record => {
    const tr = document.createElement("tr");

    const values = [
      record.date || "",
      (record.text || "").slice(0, 65),
      displayCategory(record.category),
      displayRisk(record.risk),
      displayPriority(record.priority)
    ];

    values.forEach(value => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });

    body.appendChild(tr);
  });
}

function updateRisks() {
  const list = $("riskList");
  const empty = $("emptyRisks");

  if (!list || !empty) return;

  list.replaceChildren();

  const high = records.filter(r => r.risk === "HIGH").length;
  const medium = records.filter(r => r.risk === "MEDIUM").length;
  const low = records.filter(r => r.risk === "LOW").length;

  $("riskHigh").textContent = high;
  $("riskMedium").textContent = medium;
  $("riskLow").textContent = low;

  empty.hidden = records.length > 0;

  records.forEach(record => {
    const item = document.createElement("div");
    item.className = "risk-item";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = (record.text || "Workflow").slice(0, 70);

    const date = document.createElement("p");
    date.textContent = record.date || "";

    info.append(title, date);

    const badge = document.createElement("span");
    badge.className = "risk-badge " + (record.risk || "low").toLowerCase();
    badge.textContent = displayRisk(record.risk || "LOW");

    item.append(info, badge);
    list.appendChild(item);
  });
}

function exportCSV() {
  if (!records.length) {
    alert(t("exportEmpty"));
    return;
  }

  const headings = ["Date", "Workflow", "Category", "Risk", "AI Matches", "Automation Matches", "Priority"];

  const rows = records.map(r => [
    r.date, r.text, r.category, r.risk, r.aiCount, r.autoCount, r.priority
  ]);

  const csv = [headings, ...rows]
    .map(row => row.map(value =>
      '"' + String(value ?? "").replace(/"/g, '""') + '"'
    ).join(","))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "NEUROCORE_Reports.csv";
  link.click();

  URL.revokeObjectURL(url);
}

function loadVideo(videoId, title, description, titleUr, descriptionUr, card) {
  const screen = $("videoScreen");

  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube-nocookie.com/embed/" +
    encodeURIComponent(videoId) + "?autoplay=1&rel=0";
  iframe.title = title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  screen.replaceChildren(iframe);

  $("videoTitle").textContent = currentLanguage === "ur" ? titleUr : title;
  $("videoDescription").textContent = currentLanguage === "ur" ? descriptionUr : description;

  document.querySelectorAll(".video-card").forEach(el => {
    el.classList.remove("selected");
  });

  if (card) card.classList.add("selected");
}

function initialize() {
  document.querySelectorAll(".nav").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.go));
  });

  $("languageSelect").addEventListener("change", event => {
    applyLanguage(event.target.value);
  });

  $("analyzeBtn").addEventListener("click", runAnalysis);

  $("sampleBtn").addEventListener("click", () => {
    $("workflowInput").value =
      "Our IT support team uses AI chatbot assistance and automation scripts to manage support tickets, improve response time, protect sensitive data, and monitor security risks.";
  });

  $("clearBtn").addEventListener("click", () => {
    $("workflowInput").value = "";
    $("analysisResult").hidden = true;
    $("processingBox").hidden = true;
    if (analysisTimer) clearInterval(analysisTimer);
  });

  $("exportBtn").addEventListener("click", exportCSV);

  document.querySelectorAll(".video-card").forEach(card => {
    card.addEventListener("click", () => {
      loadVideo(
        card.dataset.video,
        card.dataset.title,
        card.dataset.description,
        card.dataset.titleUr,
        card.dataset.descriptionUr,
        card
      );
    });
  });

  applyLanguage("en");
  updateDashboard();
  updateReports();
  updateRisks();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
