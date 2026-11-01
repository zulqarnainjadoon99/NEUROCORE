
/* =====================================================
   NEUROCORE INTELLIGENCE ENGINE V5.0
   Complete Frontend Controller
   Gemini AI + Dashboard + Reports + Risk Monitoring
===================================================== */

"use strict";

// 1. CONFIGURATION
const API_URL =
  "https://odd-cake-4256neurocore-ai-engine.zkj789.workers.dev";

const STORAGE_KEY = "neurocore_v5_records";

const $ = id => document.getElementById(id);

let currentLanguage = "en";
let records = loadRecords();
let currentVideo = null;


// 2. TRANSLATIONS
const translations = {
  en: {
    subtitle: "INTELLIGENCE ENGINE",
    systemOnline: "SYSTEM ONLINE",
    mainMenu: "MAIN MENU",
    dashboard: "Dashboard",
    workflowAnalysis: "Workflow Analysis",
    videoCenter: "IT Video Center",
    reports: "Reports",
    riskMonitoring: "Risk Monitoring",
    engineActive: "ENGINE ACTIVE",
    workspace: "INTELLIGENCE WORKSPACE",
    overview: "Overview",
    liveSystem: "LIVE SYSTEM",
    intelligencePlatform: "WORKFLOW INTELLIGENCE PLATFORM",
    heroTitle: "Understand. Analyze. Optimize.",
    heroDescription: "Analyze operational workflows, identify risks and discover opportunities for smarter work.",
    startAnalysis: "Start Workflow Analysis →",
    systemOverview: "SYSTEM OVERVIEW",
    performanceMetrics: "Performance Metrics",
    updatedLive: "● UPDATED LIVE",
    totalAnalyses: "Total Analyses",
    allRecords: "All saved records",
    aiAssistedTasks: "AI-Assisted Tasks",
    aiRelatedMatches: "AI-related matches",
    automationTasks: "Automation Tasks",
    automationMatches: "Automation-related matches",
    highRiskTasks: "High Risk Tasks",
    riskDetected: "High-risk records",
    quickAction: "QUICK ACTION",
    analyzeWorkflow: "Analyze a Workflow",
    quickActionDescription: "Submit a work process to evaluate its category, risk level and improvement opportunities.",
    openAnalyzer: "Open Analyzer →",
    learningHub: "LEARNING HUB",
    itLearningCenter: "IT Learning Center",
    learningDescription: "Explore IT support, networking, cybersecurity and technology tutorials.",
    exploreVideos: "Explore Videos →",
    analysisModule: "INTELLIGENCE MODULE / 01",
    analysisDescription: "Describe a workflow to analyze its operations, risks and improvement opportunities.",
    workflowDescription: "Describe Your Workflow",
    workflowPlaceholder: "Example: Our IT department receives support requests through email...",
    analyzeWorkflowBtn: "◈ Analyze Workflow",
    loadSample: "Load Sample",
    clear: "Clear",
    processing: "Analyzing workflow...",
    analysisOutput: "ANALYSIS OUTPUT",
    intelligenceReport: "Intelligence Report",
    completed: "COMPLETED",
    category: "CATEGORY",
    riskLevel: "RISK LEVEL",
    aiMatches: "AI MATCHES",
    executionPriority: "EXECUTION PRIORITY",
    recommendations: "Recommendations",
    aiInsights: "AI Insights",
    learningModule: "LEARNING MODULE / 02",
    videoDescription: "Learn practical IT skills through selected video tutorials.",
    selectTutorial: "Select a Tutorial",
    videoPlaceholder: "Choose a learning video from the gallery below.",
    videoPlayer: "Video Player",
    chooseVideo: "Choose a tutorial to start learning.",
    tutorialLibrary: "Tutorial Library",
    learningVideos: "LEARNING VIDEOS",
    itSupport: "IT SUPPORT",
    itSupportTutorial: "IT Support Fundamentals",
    networking: "NETWORKING",
    networkingTutorial: "Networking Basics",
    cybersecurity: "CYBERSECURITY",
    cybersecurityTutorial: "Cybersecurity Awareness",
    troubleshooting: "TROUBLESHOOTING",
    troubleshootingTutorial: "Computer Troubleshooting",
    watchTutorial: "Watch Tutorial →",
    reportModule: "REPORTING MODULE / 03",
    reportsDescription: "Review saved workflow analyses and export your records.",
    savedRecords: "SAVED RECORDS",
    analysisHistory: "Analysis History",
    exportCsv: "↓ Export CSV",
    date: "DATE",
    workflow: "WORKFLOW",
    risk: "RISK",
    priority: "PRIORITY",
    noReports: "No Reports Yet",
    noReportsDescription: "Your workflow analysis records will appear here.",
    createFirstReport: "Create Your First Report",
    riskModule: "SECURITY MODULE / 04",
    riskDescription: "Monitor risk levels identified in your workflow analysis records.",
    highRisk: "HIGH RISK",
    mediumRisk: "MEDIUM RISK",
    lowRisk: "LOW RISK",
    monitoringLog: "MONITORING LOG",
    riskActivity: "Risk Activity",
    recordBased: "RECORD BASED",
    noRiskRecords: "No Risk Records",
    noRiskDescription: "Analyze a workflow to populate risk monitoring.",
    prototypeNotice: "PORTFOLIO PROTOTYPE"
  },

  ur: {
    subtitle: "انٹیلیجنس انجن",
    systemOnline: "سسٹم آن لائن",
    mainMenu: "مرکزی مینو",
    dashboard: "ڈیش بورڈ",
    workflowAnalysis: "ورک فلو تجزیہ",
    videoCenter: "آئی ٹی ویڈیو سینٹر",
    reports: "رپورٹس",
    riskMonitoring: "خطرات کی نگرانی",
    engineActive: "انجن فعال",
    workspace: "انٹیلیجنس ورک اسپیس",
    overview: "جائزہ",
    liveSystem: "لائیو سسٹم",
    intelligencePlatform: "ورک فلو انٹیلیجنس پلیٹ فارم",
    heroTitle: "سمجھیں۔ تجزیہ کریں۔ بہتر بنائیں۔",
    heroDescription: "کام کے طریقہ کار کا تجزیہ کریں، خطرات کی نشاندہی کریں اور بہتری کے مواقع دریافت کریں۔",
    startAnalysis: "ورک فلو تجزیہ شروع کریں ←",
    systemOverview: "سسٹم کا جائزہ",
    performanceMetrics: "کارکردگی کے اعداد و شمار",
    updatedLive: "لائیو اپ ڈیٹ",
    totalAnalyses: "کل تجزیے",
    allRecords: "تمام محفوظ ریکارڈز",
    aiAssistedTasks: "AI سے معاونت یافتہ کام",
    aiRelatedMatches: "AI سے متعلق نتائج",
    automationTasks: "آٹومیشن کے کام",
    automationMatches: "آٹومیشن سے متعلق نتائج",
    highRiskTasks: "زیادہ خطرے والے کام",
    riskDetected: "زیادہ خطرے والے ریکارڈز",
    quickAction: "فوری کارروائی",
    analyzeWorkflow: "ورک فلو کا تجزیہ کریں",
    quickActionDescription: "کام کا طریقہ جمع کریں تاکہ اس کی قسم، خطرے اور بہتری کے مواقع کا جائزہ لیا جا سکے۔",
    openAnalyzer: "تجزیہ کار کھولیں ←",
    learningHub: "تعلیمی مرکز",
    itLearningCenter: "آئی ٹی لرننگ سینٹر",
    learningDescription: "آئی ٹی سپورٹ، نیٹ ورکنگ اور سائبر سکیورٹی کے اسباق دیکھیں۔",
    exploreVideos: "ویڈیوز دیکھیں ←",
    analysisModule: "انٹیلیجنس ماڈیول / 01",
    analysisDescription: "ورک فلو کی تفصیل دیں تاکہ اس کے طریقہ کار، خطرات اور بہتری کے مواقع کا تجزیہ کیا جا سکے۔",
    workflowDescription: "اپنے ورک فلو کی تفصیل لکھیں",
    workflowPlaceholder: "مثال: ہمارا آئی ٹی شعبہ ای میل کے ذریعے سپورٹ کی درخواستیں وصول کرتا ہے...",
    analyzeWorkflowBtn: "◈ ورک فلو کا تجزیہ کریں",
    loadSample: "مثال لوڈ کریں",
    clear: "صاف کریں",
    processing: "ورک فلو کا تجزیہ جاری ہے...",
    analysisOutput: "تجزیے کا نتیجہ",
    intelligenceReport: "انٹیلیجنس رپورٹ",
    completed: "مکمل",
    category: "قسم",
    riskLevel: "خطرے کی سطح",
    aiMatches: "AI نتائج",
    executionPriority: "عمل درآمد کی ترجیح",
    recommendations: "تجاویز",
    aiInsights: "AI کی بصیرت",
    learningModule: "تعلیمی ماڈیول / 02",
    videoDescription: "منتخب ویڈیو اسباق کے ذریعے عملی آئی ٹی مہارتیں سیکھیں۔",
    selectTutorial: "سبق منتخب کریں",
    videoPlaceholder: "نیچے دی گئی گیلری سے ویڈیو منتخب کریں۔",
    videoPlayer: "ویڈیو پلیئر",
    chooseVideo: "سیکھنے کے لیے کوئی سبق منتخب کریں۔",
    tutorialLibrary: "سبق کی لائبریری",
    learningVideos: "تعلیمی ویڈیوز",
    itSupport: "آئی ٹی سپورٹ",
    itSupportTutorial: "آئی ٹی سپورٹ کی بنیادی باتیں",
    networking: "نیٹ ورکنگ",
    networkingTutorial: "نیٹ ورکنگ کی بنیادی باتیں",
    cybersecurity: "سائبر سکیورٹی",
    cybersecurityTutorial: "سائبر سکیورٹی آگاہی",
    troubleshooting: "مسائل کا حل",
    troubleshootingTutorial: "کمپیوٹر ٹربل شوٹنگ",
    watchTutorial: "سبق دیکھیں ←",
    reportModule: "رپورٹنگ ماڈیول / 03",
    reportsDescription: "محفوظ شدہ تجزیوں کا جائزہ لیں اور ریکارڈ ایکسپورٹ کریں۔",
    savedRecords: "محفوظ ریکارڈز",
    analysisHistory: "تجزیوں کی تاریخ",
    exportCsv: "↓ CSV ایکسپورٹ",
    date: "تاریخ",
    workflow: "ورک فلو",
    risk: "خطرہ",
    priority: "ترجیح",
    noReports: "ابھی کوئی رپورٹ نہیں",
    noReportsDescription: "آپ کے تجزیوں کے ریکارڈ یہاں نظر آئیں گے۔",
    createFirstReport: "پہلی رپورٹ بنائیں",
    riskModule: "سیکیورٹی ماڈیول / 04",
    riskDescription: "ورک فلو کے تجزیوں میں سامنے آنے والے خطرات کی نگرانی کریں۔",
    highRisk: "زیادہ خطرہ",
    mediumRisk: "درمیانہ خطرہ",
    lowRisk: "کم خطرہ",
    monitoringLog: "نگرانی کا ریکارڈ",
    riskActivity: "خطرات کی سرگرمیاں",
    recordBased: "ریکارڈ کی بنیاد پر",
    noRiskRecords: "کوئی خطرے کا ریکارڈ نہیں",
    noRiskDescription: "خطرات کی نگرانی کے لیے پہلے ورک فلو کا تجزیہ کریں۔",
    prototypeNotice: "پورٹ فولیو پروٹوٹائپ"
  }
};


// 3. STORAGE
function loadRecords() {
  try {
    const data = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Storage error:", error);
    return [];
  }
}

function saveRecords() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(records)
    );
  } catch (error) {
    console.error("Unable to save records:", error);
    alert("Browser storage is unavailable or full.");
  }
}


// 4. PAGE NAVIGATION
function openPage(pageName) {
  const target = $(pageName);

  if (!target || !target.classList.contains("page")) {
    console.warn("Page not found:", pageName);
    return;
  }

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  target.classList.add("active");

  document.querySelectorAll(".nav").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );
  });

  if (pageName === "reports") renderReports();
  if (pageName === "risks") renderRisks();
  if (pageName === "dashboard") updateDashboard();

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// 5. LANGUAGE SYSTEM
function setLanguage(language) {
  currentLanguage = language === "ur" ? "ur" : "en";

  const isUrdu = currentLanguage === "ur";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = isUrdu ? "rtl" : "ltr";

  const dictionary = translations[currentLanguage];

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (dictionary[key] !== undefined) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;

    if (dictionary[key] !== undefined) {
      element.placeholder = dictionary[key];
    }
  });

  $("languageSelect").value = currentLanguage;

  if (currentVideo) {
    updateVideoInfo(currentVideo);
  }

  const aiText = $("aiResponseText");
  if (aiText) {
    aiText.dir = isUrdu ? "rtl" : "ltr";
    aiText.style.textAlign = isUrdu ? "right" : "left";
  }

  renderReports();
  renderRisks();
}


// 6. AI RESPONSE RENDERER
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

    if (/^\\?#{1,6}$/.test(line)) {
      list = null;
      return;
    }

    const heading = line.match(/^#{1,6}\s+(.+)/);

    if (heading) {
      list = null;
      addHeading(
        heading[1],
        heading[1].startsWith("NEUROCORE") ? 1 : 3
      );
      return;
    }

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

    list = null;

    const p = document.createElement("p");
    addInline(p, line);
    p.style.margin = "8px 0";

    container.appendChild(p);
  });
}


// 7. SAMPLE WORKFLOW
function loadSample() {
  $("workflowInput").value =
    "Our college student admissions process is currently manual. Students submit paper application forms and physical documents. Staff manually verify documents, check eligibility, enter student information into Excel sheets and prepare admission reports. Each application takes several days. There is no centralized digital tracking system, and staff must repeatedly check application status manually.";
}


// 8. WORKFLOW CLASSIFICATION
function classifyWorkflow(workflow, insight) {
  const text = (workflow + " " + insight).toLowerCase();

  const aiWords = [
    "artificial intelligence", "ai-assisted", "ai powered",
    "machine learning", "gemini", "chatbot", "ai "
  ];

  const automationWords = [
    "automation", "automated", "automatic",
    "workflow automation", "auto-generated", "digital form"
  ];

  const manualWords = [
    "manual", "paper-based", "paper form",
    "manually", "physical documents"
  ];

  const aiCount = aiWords.filter(word =>
    text.includes(word)
  ).length;

  const autoCount = automationWords.filter(word =>
    text.includes(word)
  ).length;

  const manualCount = manualWords.filter(word =>
    text.includes(word)
  ).length;

  let category = "HYBRID WORKFLOW";

  if (manualCount > 0 && aiCount === 0 && autoCount === 0) {
    category = "MANUAL WORKFLOW";
  } else if (aiCount > 0 && autoCount > 0) {
    category = "AI-POWERED AUTOMATION";
  } else if (aiCount > 0) {
    category = "AI-ASSISTED WORKFLOW";
  } else if (autoCount > 0) {
    category = "AUTOMATED WORKFLOW";
  }

  return {
    category,
    aiCount,
    autoCount
  };
}


// 9. RISK CLASSIFICATION
function classifyRisk(workflow, insight) {
  const text = (workflow + " " + insight).toLowerCase();

  const highWords = [
    "data breach", "security breach", "unauthorized access",
    "critical failure", "data loss", "financial fraud",
    "severe risk", "critical risk"
  ];

  const mediumWords = [
    "delay", "human error", "inaccurate",
    "missing records", "no backup", "data privacy",
    "repeated errors", "moderate risk"
  ];

  const high = highWords.filter(word =>
    text.includes(word)
  ).length;

  const medium = mediumWords.filter(word =>
    text.includes(word)
  ).length;

  if (high > 0) return "HIGH";
  if (medium > 0) return "MEDIUM";
  return "LOW";
}


// 10. MAIN GEMINI ANALYSIS
async function analyzeWorkflow() {
  const workflow = $("workflowInput").value.trim();

  if (workflow.length < 20) {
    alert(
      currentLanguage === "ur"
        ? "براہ کرم ورک فلو کی مکمل تفصیل درج کریں۔"
        : "Please enter a more detailed workflow (at least 20 characters)."
    );
    return;
  }

  const button = $("analyzeBtn");
  const processing = $("processingBox");
  const result = $("analysisResult");
  const progress = $("analysisProgress");

  button.disabled = true;
  processing.hidden = false;
  result.hidden = true;

  button.textContent =
    currentLanguage === "ur"
      ? "تجزیہ جاری ہے..."
      : "Analyzing...";

  progress.style.width = "35%";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        workflow: workflow,
        language: currentLanguage
      })
    });

    progress.style.width = "75%";

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.details || data.error ||
        "Gemini AI request failed."
      );
    }

    if (!data.insight) {
      throw new Error("AI returned an empty response.");
    }

    const insight = String(data.insight);

    const classification = classifyWorkflow(
      workflow,
      insight
    );

    const risk = classifyRisk(workflow, insight);

    const priority =
      risk === "HIGH" ? "URGENT" :
      risk === "MEDIUM" ? "HIGH" : "NORMAL";

    const record = {
      id: Date.now(),
      date: new Date().toISOString(),
      workflow: workflow,
      category: classification.category,
      risk: risk,
      priority: priority,
      aiMatches: classification.aiCount,
      autoMatches: classification.autoCount,
      recommendation:
        risk === "HIGH"
          ? "Immediate review and risk mitigation are recommended."
          : risk === "MEDIUM"
            ? "Review the identified issues and implement preventive controls."
            : "No major risk indicators detected by this prototype. Continue routine monitoring.",
      insight: insight,
      model: data.model || "Gemini",
      version: data.version || ""
    };

    records.unshift(record);
    saveRecords();

    displayAnalysis(record);

    progress.style.width = "100%";

    updateDashboard();
    renderReports();
    renderRisks();

    result.hidden = false;

    result.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } catch (error) {
    console.error("NEUROCORE analysis error:", error);

    alert(
      "Analysis failed:\n\n" +
      error.message +
      "\n\nPlease check your internet connection and Gemini Worker."
    );

  } finally {
    button.disabled = false;
    processing.hidden = true;

    button.textContent =
      translations[currentLanguage].analyzeWorkflowBtn;

    progress.style.width = "0%";
  }
}


// 11. DISPLAY ANALYSIS
function displayAnalysis(record) {
  $("categoryResult").textContent = record.category;
  $("riskResult").textContent = record.risk;
  $("aiMatches").textContent = record.aiMatches;
  $("autoMatches").textContent = record.autoMatches;
  $("priorityResult").textContent = record.priority;

  $("recommendationResult").textContent =
    record.recommendation;

  $("aiResponse").hidden = false;

  renderAIInsight(record.insight);
}


// 12. DASHBOARD METRICS
function updateDashboard() {
  $("totalStat").textContent = records.length;

  $("aiStat").textContent = records.reduce(
    (sum, record) => sum + (record.aiMatches || 0),
    0
  );

  $("autoStat").textContent = records.reduce(
    (sum, record) => sum + (record.autoMatches || 0),
    0
  );

  $("highStat").textContent = records.filter(
    record => record.risk === "HIGH"
  ).length;
}


// 13. REPORTS
function renderReports() {
  const body = $("reportsBody");
  const empty = $("emptyReports");

  if (!body || !empty) return;

  body.replaceChildren();

  empty.hidden = records.length !== 0;

  records.forEach(record => {
    const row = document.createElement("tr");

    const values = [
      new Date(record.date).toLocaleDateString(),
      record.workflow.length > 55
        ? record.workflow.slice(0, 55) + "..."
        : record.workflow,
      record.category,
      record.risk,
      record.priority
    ];

    values.forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    body.appendChild(row);
  });
}


// 14. CSV EXPORT
function exportCSV() {
  if (!records.length) {
    alert(
      currentLanguage === "ur"
        ? "ایکسپورٹ کرنے کے لیے کوئی ریکارڈ موجود نہیں۔"
        : "There are no records to export."
    );
    return;
  }

  const headers = [
    "Date",
    "Workflow",
    "Category",
    "Risk",
    "Priority",
    "AI Matches",
    "Automation Matches",
    "Recommendation",
    "AI Insight"
  ];

  const escapeCSV = value =>
    '"' + String(value ?? "").replace(/"/g, '""') + '"';

  const rows = records.map(record => [
    record.date,
    record.workflow,
    record.category,
    record.risk,
    record.priority,
    record.aiMatches,
    record.autoMatches,
    record.recommendation,
    record.insight
  ]);

  const csv = [
    headers,
    ...rows
  ].map(row => row.map(escapeCSV).join(",")).join("\r\n");

  const blob = new Blob(
    ["\uFEFF" + csv],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "NEUROCORE_Reports.csv";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}


// 15. RISK MONITORING
function renderRisks() {
  const list = $("riskList");
  const empty = $("emptyRisks");

  if (!list || !empty) return;

  list.replaceChildren();

  const high = records.filter(r => r.risk === "HIGH");
  const medium = records.filter(r => r.risk === "MEDIUM");
  const low = records.filter(r => r.risk === "LOW");

  $("riskHigh").textContent = high.length;
  $("riskMedium").textContent = medium.length;
  $("riskLow").textContent = low.length;

  empty.hidden = records.length !== 0;

  records.forEach(record => {
    const item = document.createElement("article");
    item.className = "risk-item";

    const title = document.createElement("h4");
    title.textContent =
      record.workflow.length > 100
        ? record.workflow.slice(0, 100) + "..."
        : record.workflow;

    const details = document.createElement("p");
    details.textContent =
      "Risk: " + record.risk +
      " | Category: " + record.category +
      " | Priority: " + record.priority;

    const date = document.createElement("small");
    date.textContent =
      new Date(record.date).toLocaleString();

    item.append(title, details, date);
    list.appendChild(item);
  });
}


// 16. VIDEO CENTER
function updateVideoInfo(video) {
  $("videoTitle").textContent =
    currentLanguage === "ur"
      ? video.dataset.titleUr || video.dataset.title
      : video.dataset.title;

  $("videoDescription").textContent =
    currentLanguage === "ur"
      ? video.dataset.descriptionUr || video.dataset.description
      : video.dataset.description;
}

function playVideo(video) {
  currentVideo = video;

  const videoId = video.dataset.video;

  const screen = $("videoScreen");
  screen.replaceChildren();

  const iframe = document.createElement("iframe");

  iframe.src =
    "https://www.youtube-nocookie.com/embed/" +
    encodeURIComponent(videoId) +
    "?autoplay=1&rel=0";

  iframe.title = video.dataset.title;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  iframe.allowFullscreen = true;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";

  screen.appendChild(iframe);

  updateVideoInfo(video);

  document.querySelectorAll(".video-card").forEach(card => {
    card.classList.toggle("active", card === video);
  });
}


// 17. EVENT LISTENERS
function initializeEvents() {

  // Sidebar navigation
  document.querySelectorAll(".nav[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      openPage(button.dataset.page);
    });
  });

  // Dashboard navigation buttons
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
      openPage(button.dataset.go);
    });
  });

  // Language selector
  $("languageSelect").addEventListener("change", event => {
    setLanguage(event.target.value);
  });

  // Workflow buttons
  $("analyzeBtn").addEventListener("click", analyzeWorkflow);

  $("sampleBtn").addEventListener("click", loadSample);

  $("clearBtn").addEventListener("click", () => {
    $("workflowInput").value = "";
    $("analysisResult").hidden = true;
    $("workflowInput").focus();
  });

  // Export
  $("exportBtn").addEventListener("click", exportCSV);

  // Video cards
  document.querySelectorAll(".video-card").forEach(video => {
    video.addEventListener("click", () => {
      playVideo(video);
    });
  });
}


// 18. INITIALIZE APPLICATION
function initializeApp() {
  initializeEvents();

  setLanguage("en");

  updateDashboard();
  renderReports();
  renderRisks();

  openPage("dashboard");

  console.log(
    "NEUROCORE V5.0 initialized successfully."
  );

  console.log("Gemini API endpoint:", API_URL);
}

document.addEventListener(
  "DOMContentLoaded",
  initializeApp,
  { once: true }
);
