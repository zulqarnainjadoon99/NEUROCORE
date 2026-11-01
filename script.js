/* NEUROCORE Intelligence Engine
   Front-end controller for index.html.
   Gemini API credentials must remain on the Cloudflare Worker, never in this file.
*/
(() => {
  "use strict";

  const STORAGE_KEY = "neurocore_v5_records";
  const WORKER_URL = "https://odd-cake-4256neurocore-ai-engine.zkj789.workers.dev";

  const $ = (id) => document.getElementById(id);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];

  const translations = {
    en: {
      subtitle:"INTELLIGENCE ENGINE", systemOnline:"SYSTEM ONLINE", mainMenu:"MAIN MENU",
      dashboard:"Dashboard", workflowAnalysis:"Workflow Analysis", videoCenter:"IT Video Center",
      reports:"Reports", riskMonitoring:"Risk Monitoring", engineActive:"ENGINE ACTIVE",
      workspace:"INTELLIGENCE WORKSPACE", overview:"Overview", liveSystem:"LIVE SYSTEM",
      intelligencePlatform:"WORKFLOW INTELLIGENCE PLATFORM", heroTitle:"Understand. Analyze. Optimize.",
      heroDescription:"Analyze operational workflows, identify risks and discover opportunities for smarter work.",
      startAnalysis:"Start Workflow Analysis →", systemOverview:"SYSTEM OVERVIEW",
      performanceMetrics:"Performance Metrics", updatedLive:"● UPDATED LIVE",
      totalAnalyses:"Total Analyses", allRecords:"All saved records", aiAssistedTasks:"AI-Assisted Tasks",
      aiRelatedMatches:"AI-related matches", automationTasks:"Automation Tasks",
      automationMatches:"Automation-related matches", highRiskTasks:"High Risk Tasks", riskDetected:"High-risk records",
      quickAction:"QUICK ACTION", analyzeWorkflow:"Analyze a Workflow",
      quickActionDescription:"Submit a work process to evaluate its category, risk level and improvement opportunities.",
      openAnalyzer:"Open Analyzer →", learningHub:"LEARNING HUB", itLearningCenter:"IT Learning Center",
      learningDescription:"Explore IT support, networking, cybersecurity and technology tutorials.",
      exploreVideos:"Explore Videos →", analysisModule:"INTELLIGENCE MODULE / 01",
      analysisDescription:"Describe a workflow to analyze its operations, risks and improvement opportunities.",
      workflowDescription:"Describe Your Workflow",
      workflowPlaceholder:"Example: Our IT department receives support requests through email...",
      analyzeWorkflowBtn:"◈ Analyze Workflow", loadSample:"Load Sample", clear:"Clear",
      processing:"Analyzing workflow...", analysisOutput:"ANALYSIS OUTPUT", intelligenceReport:"Intelligence Report",
      completed:"COMPLETED", category:"CATEGORY", riskLevel:"RISK LEVEL", aiMatches:"AI MATCHES",
      executionPriority:"EXECUTION PRIORITY", recommendations:"Recommendations", aiInsights:"AI Insights",
      learningModule:"LEARNING MODULE / 02", videoDescription:"Learn practical IT skills through selected video tutorials.",
      selectTutorial:"Select a Tutorial", videoPlaceholder:"Choose a learning video from the gallery below.",
      videoPlayer:"Video Player", chooseVideo:"Choose a tutorial to start learning.",
      tutorialLibrary:"Tutorial Library", learningVideos:"LEARNING VIDEOS", itSupport:"IT SUPPORT",
      itSupportTutorial:"IT Support Fundamentals", watchTutorial:"Watch Tutorial →",
      networking:"NETWORKING", networkingTutorial:"Networking Basics", cybersecurity:"CYBERSECURITY",
      cybersecurityTutorial:"Cybersecurity Awareness", troubleshooting:"TROUBLESHOOTING",
      troubleshootingTutorial:"Computer Troubleshooting", reportModule:"REPORTING MODULE / 03",
      reportsDescription:"Review saved workflow analyses and export your records.", savedRecords:"SAVED RECORDS",
      analysisHistory:"Analysis History", exportCsv:"↓ Export CSV", date:"DATE", workflow:"WORKFLOW",
      risk:"RISK", priority:"PRIORITY", noReports:"No Reports Yet",
      noReportsDescription:"Your workflow analysis records will appear here.",
      createFirstReport:"Create Your First Report", riskModule:"SECURITY MODULE / 04",
      riskDescription:"Monitor risk levels identified in your workflow analysis records.",
      highRisk:"HIGH RISK", mediumRisk:"MEDIUM RISK", lowRisk:"LOW RISK",
      monitoringLog:"MONITORING LOG", riskActivity:"Risk Activity", recordBased:"RECORD BASED",
      noRiskRecords:"No Risk Records", noRiskDescription:"Analyze a workflow to populate risk monitoring.",
      prototypeNotice:"PORTFOLIO PROTOTYPE", networkError:"AI service could not be reached. Please try again.",
      enterWorkflow:"Please describe a workflow first.", sampleText:"Our IT support team receives employee requests by email. Requests are manually assigned, urgent issues are sometimes delayed, and there is no central tracking system. Staff update request status in separate spreadsheets.",
      aiUnavailable:"AI service unavailable; showing local rule-based assessment.",
      noRecommendation:"Review the workflow, document each step, assign clear ownership and introduce a simple tracking process.",
      high:"HIGH", medium:"MEDIUM", low:"LOW", urgent:"URGENT", normal:"NORMAL", categoryLabel:"AI WORKFLOW"
    },
    ur: {
      subtitle:"انٹیلیجنس انجن", systemOnline:"سسٹم آن لائن", mainMenu:"مین مینو",
      dashboard:"ڈیش بورڈ", workflowAnalysis:"ورک فلو تجزیہ", videoCenter:"آئی ٹی ویڈیو سینٹر",
      reports:"رپورٹس", riskMonitoring:"رسک مانیٹرنگ", engineActive:"انجن فعال",
      workspace:"انٹیلیجنس ورک اسپیس", overview:"جائزہ", liveSystem:"لائیو سسٹم",
      intelligencePlatform:"ورک فلو انٹیلیجنس پلیٹ فارم", heroTitle:"سمجھیں۔ تجزیہ کریں۔ بہتر بنائیں۔",
      heroDescription:"کام کے طریقۂ کار کا تجزیہ کریں، خطرات کی نشاندہی کریں اور بہتری کے مواقع تلاش کریں۔",
      startAnalysis:"ورک فلو تجزیہ شروع کریں ←", systemOverview:"سسٹم کا جائزہ",
      performanceMetrics:"کارکردگی کے اعداد و شمار", updatedLive:"● تازہ ترین",
      totalAnalyses:"کل تجزیے", allRecords:"تمام محفوظ ریکارڈ", aiAssistedTasks:"AI معاون کام",
      aiRelatedMatches:"AI سے متعلق نتائج", automationTasks:"آٹومیشن کے کام",
      automationMatches:"آٹومیشن سے متعلق نتائج", highRiskTasks:"زیادہ خطرے والے کام", riskDetected:"زیادہ خطرے کے ریکارڈ",
      quickAction:"فوری اقدام", analyzeWorkflow:"ورک فلو کا تجزیہ",
      quickActionDescription:"کام کا طریقہ درج کریں تاکہ اس کی قسم، خطرے اور بہتری کے مواقع کا جائزہ لیا جا سکے۔",
      openAnalyzer:"تجزیہ کھولیں ←", learningHub:"تعلیمی مرکز", itLearningCenter:"آئی ٹی لرننگ سینٹر",
      learningDescription:"آئی ٹی سپورٹ، نیٹ ورکنگ، سائبر سکیورٹی اور ٹیکنالوجی کے اسباق دیکھیں۔",
      exploreVideos:"ویڈیوز دیکھیں ←", analysisModule:"انٹیلیجنس ماڈیول / 01",
      analysisDescription:"ورک فلو کی وضاحت کریں تاکہ اس کے کام، خطرات اور بہتری کے مواقع کا تجزیہ ہو سکے۔",
      workflowDescription:"اپنے ورک فلو کی وضاحت کریں",
      workflowPlaceholder:"مثال: ہمارا آئی ٹی شعبہ ای میل کے ذریعے سپورٹ کی درخواستیں وصول کرتا ہے...",
      analyzeWorkflowBtn:"◈ ورک فلو کا تجزیہ", loadSample:"مثال لوڈ کریں", clear:"صاف کریں",
      processing:"ورک فلو کا تجزیہ جاری ہے...", analysisOutput:"تجزیے کا نتیجہ", intelligenceReport:"انٹیلیجنس رپورٹ",
      completed:"مکمل", category:"قسم", riskLevel:"خطرے کی سطح", aiMatches:"AI نتائج",
      executionPriority:"ترجیح", recommendations:"تجاویز", aiInsights:"AI کی بصیرت",
      learningModule:"تعلیمی ماڈیول / 02", videoDescription:"منتخب ویڈیو اسباق کے ذریعے عملی آئی ٹی مہارتیں سیکھیں۔",
      selectTutorial:"سبق منتخب کریں", videoPlaceholder:"نیچے دی گئی فہرست سے ویڈیو منتخب کریں۔",
      videoPlayer:"ویڈیو پلیئر", chooseVideo:"سیکھنے کے لیے کوئی سبق منتخب کریں۔",
      tutorialLibrary:"اسباق کی لائبریری", learningVideos:"تعلیمی ویڈیوز", itSupport:"آئی ٹی سپورٹ",
      itSupportTutorial:"آئی ٹی سپورٹ کی بنیادی باتیں", watchTutorial:"سبق دیکھیں ←",
      networking:"نیٹ ورکنگ", networkingTutorial:"نیٹ ورکنگ کی بنیادی باتیں", cybersecurity:"سائبر سکیورٹی",
      cybersecurityTutorial:"سائبر سکیورٹی آگاہی", troubleshooting:"خرابیوں کا حل",
      troubleshootingTutorial:"کمپیوٹر ٹربل شوٹنگ", reportModule:"رپورٹنگ ماڈیول / 03",
      reportsDescription:"محفوظ شدہ ورک فلو تجزیے دیکھیں اور ریکارڈ برآمد کریں۔", savedRecords:"محفوظ ریکارڈ",
      analysisHistory:"تجزیوں کی تاریخ", exportCsv:"↓ CSV برآمد کریں", date:"تاریخ", workflow:"ورک فلو",
      risk:"خطرہ", priority:"ترجیح", noReports:"ابھی کوئی رپورٹ نہیں",
      noReportsDescription:"آپ کے ورک فلو تجزیوں کے ریکارڈ یہاں نظر آئیں گے۔",
      createFirstReport:"پہلی رپورٹ بنائیں", riskModule:"سکیورٹی ماڈیول / 04",
      riskDescription:"ورک فلو کے تجزیوں میں شناخت شدہ خطرات کی نگرانی کریں۔",
      highRisk:"زیادہ خطرہ", mediumRisk:"درمیانہ خطرہ", lowRisk:"کم خطرہ",
      monitoringLog:"مانیٹرنگ لاگ", riskActivity:"خطرے کی سرگرمی", recordBased:"ریکارڈ کی بنیاد پر",
      noRiskRecords:"خطرے کا کوئی ریکارڈ نہیں", noRiskDescription:"رسک مانیٹرنگ کے لیے کسی ورک فلو کا تجزیہ کریں۔",
      prototypeNotice:"پورٹ فولیو پروٹوٹائپ", networkError:"AI سروس سے رابطہ نہیں ہو سکا۔ دوبارہ کوشش کریں۔",
      enterWorkflow:"پہلے ورک فلو کی وضاحت درج کریں۔", sampleText:"ہماری آئی ٹی سپورٹ ٹیم ای میل کے ذریعے ملازمین کی درخواستیں وصول کرتی ہے۔ درخواستیں دستی طور پر تقسیم ہوتی ہیں، فوری مسائل میں تاخیر ہو جاتی ہے اور مرکزی ٹریکنگ سسٹم موجود نہیں۔",
      aiUnavailable:"AI سروس دستیاب نہیں؛ مقامی اصولوں کی بنیاد پر جائزہ دکھایا جا رہا ہے۔",
      noRecommendation:"ہر مرحلے کو دستاویزی شکل دیں، ذمہ داریاں واضح کریں اور درخواستوں کی نگرانی کے لیے سادہ نظام متعارف کروائیں۔",
      high:"زیادہ", medium:"درمیانہ", low:"کم", urgent:"فوری", normal:"معمول", categoryLabel:"AI ورک فلو"
    }
  };

  let language = "en";
  let records = loadRecords();

  function loadRecords() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveRecords() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
    catch (error) { console.warn("Could not save NEUROCORE records:", error); }
  }

  function t(key) {
    return (translations[language] && translations[language][key]) ||
      translations.en[key] || key;
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage === "ur" ? "ur" : "en";
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    all("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (translations[language][key]) node.textContent = t(key);
    });
    all("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    all(".video-card").forEach((card) => {
      const title = card.querySelector("h4");
      const description = card.querySelector("p");
      if (title) title.textContent = language === "ur" ? (card.dataset.titleUr || card.dataset.title) : card.dataset.title;
      if (description) description.textContent = language === "ur" ? (card.dataset.descriptionUr || card.dataset.description) : "Watch Tutorial →";
    });
    const select = $("languageSelect");
    if (select) select.value = language;
    renderAll();
  }

  function showPage(pageId) {
    const target = $(pageId);
    if (!target || !target.classList.contains("page")) return;
    all(".page").forEach((page) => page.classList.toggle("active", page === target));
    all(".nav").forEach((button) => button.classList.toggle("active", button.dataset.page === pageId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function classifyLocally(text) {
    const value = text.toLowerCase();
    const aiCount = (value.match(/\b(ai|artificial intelligence|machine learning|gemini|automation)\b/g) || []).length;
    const autoCount = (value.match(/\b(automat|workflow|manual|repeat|process|spreadsheet|tracking)\w*/g) || []).length;
    const riskWords = ["delay", "urgent", "security", "password", "breach", "failure", "error", "ไม่มี", "missing", "no central", "data loss"];
    const riskHits = riskWords.filter((word) => value.includes(word)).length;
    const risk = riskHits >= 3 ? "HIGH" : riskHits >= 1 ? "MEDIUM" : "LOW";
    const priority = risk === "HIGH" ? "URGENT" : risk === "MEDIUM" ? "NORMAL" : "NORMAL";
    return {
      category: aiCount || autoCount ? "AI WORKFLOW" : "OPERATIONAL WORKFLOW",
      risk,
      aiMatches: aiCount,
      autoMatches: autoCount,
      priority,
      recommendations: t("noRecommendation"),
      insights: ""
    };
  }

  function extractResult(payload) {
    let data = payload;
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch { return { insights: data }; }
    }
    if (!data || typeof data !== "object") return {};
    if (data.result && typeof data.result === "object") data = data.result;
    if (data.analysis && typeof data.analysis === "object") data = data.analysis;
    const pick = (...keys) => {
      for (const key of keys) if (data[key] !== undefined && data[key] !== null) return data[key];
      return undefined;
    };
    return {
      category: pick("category", "workflowCategory", "type"),
      risk: pick("risk", "riskLevel", "risk_level"),
      aiMatches: pick("aiMatches", "ai_matches", "aiCount"),
      autoMatches: pick("autoMatches", "automationMatches", "automation_matches"),
      priority: pick("priority", "executionPriority", "execution_priority"),
      recommendations: pick("recommendations", "recommendation", "improvements"),
      insights: pick("insights", "aiInsights", "analysisText", "text", "response", "output")
    };
  }

  async function requestAI(workflow) {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workflow, text: workflow, prompt: workflow })
    });
    const raw = await response.text();
    let payload;
    try { payload = JSON.parse(raw); } catch { payload = raw; }
    if (!response.ok) {
      const message = payload && typeof payload === "object" ? (payload.error || payload.message) : payload;
      throw new Error(message || `AI service returned ${response.status}`);
    }
    if (payload && typeof payload === "object" && payload.error) throw new Error(payload.error);
    return extractResult(payload);
  }

  function normalizeRisk(value) {
    const v = String(value || "LOW").toUpperCase();
    if (v.includes("HIGH") || v.includes("زیادہ")) return "HIGH";
    if (v.includes("MED")) return "MEDIUM";
    return "LOW";
  }

  function normalizeRecord(workflow, result, usedAI) {
    const local = classifyLocally(workflow);
    const merged = { ...local, ...result };
    merged.risk = normalizeRisk(merged.risk);
    merged.category = String(merged.category || local.category);
    merged.aiMatches = Number(merged.aiMatches ?? local.aiMatches) || 0;
    merged.autoMatches = Number(merged.autoMatches ?? local.autoMatches) || 0;
    merged.priority = String(merged.priority || local.priority).toUpperCase();
    merged.recommendations = Array.isArray(merged.recommendations)
      ? merged.recommendations.join("; ")
      : String(merged.recommendations || local.recommendations);
    merged.insights = Array.isArray(merged.insights)
      ? merged.insights.join("\n")
      : String(merged.insights || "");
    return {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: new Date().toISOString(),
      workflow,
      ...merged,
      usedAI: Boolean(usedAI)
    };
  }

  function setBusy(busy) {
    const button = $("analyzeBtn");
    const box = $("processingBox");
    if (button) {
      button.disabled = busy;
      button.textContent = busy ? (language === "ur" ? "تجزیہ جاری ہے..." : "Analyzing...") : t("analyzeWorkflowBtn");
    }
    if (box) box.hidden = !busy;
    const bar = $("analysisProgress");
    if (bar) bar.style.width = busy ? "75%" : "0%";
  }

  async function analyzeWorkflow() {
    const input = $("workflowInput");
    const workflow = input ? input.value.trim() : "";
    if (!workflow) {
      alert(t("enterWorkflow"));
      if (input) input.focus();
      return;
    }
    setBusy(true);
    let result;
    let usedAI = false;
    try {
      result = await requestAI(workflow);
      usedAI = true;
    } catch (error) {
      console.warn("NEUROCORE AI request failed:", error);
      result = classifyLocally(workflow);
      const aiBox = $("aiResponse");
      const aiText = $("aiResponseText");
      if (aiBox && aiText) {
        aiBox.hidden = false;
        aiText.textContent = `${t("aiUnavailable")} ${error.message || ""}`;
      }
    } finally {
      setBusy(false);
    }

    const record = normalizeRecord(workflow, result || {}, usedAI);
    records.unshift(record);
    saveRecords();
    displayResult(record);
    renderAll();
    const resultPanel = $("analysisResult");
    if (resultPanel) resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function displayResult(record) {
    $("categoryResult").textContent = record.category;
    $("riskResult").textContent = t(record.risk.toLowerCase()) || record.risk;
    $("aiMatches").textContent = record.aiMatches;
    $("autoMatches").textContent = record.autoMatches;
    $("priorityResult").textContent = record.priority;
    $("recommendationResult").textContent = record.recommendations;
    const aiBox = $("aiResponse");
    const aiText = $("aiResponseText");
    if (aiBox && aiText) {
      aiBox.hidden = !record.insights;
      aiText.textContent = record.insights || "";
    }
    $("analysisResult").hidden = false;
  }

  function renderDashboard() {
    const total = records.length;
    const ai = records.filter((r) => r.usedAI || Number(r.aiMatches) > 0).length;
    const automation = records.filter((r) => Number(r.autoMatches) > 0).length;
    const high = records.filter((r) => normalizeRisk(r.risk) === "HIGH").length;
    if ($("totalStat")) $("totalStat").textContent = total;
    if ($("aiStat")) $("aiStat").textContent = ai;
    if ($("autoStat")) $("autoStat").textContent = automation;
    if ($("highStat")) $("highStat").textContent = high;
  }

  function renderReports() {
    const body = $("reportsBody");
    const empty = $("emptyReports");
    if (!body) return;
    body.replaceChildren();
    if (empty) empty.hidden = records.length > 0;
    records.forEach((record) => {
      const row = document.createElement("tr");
      const values = [
        new Date(record.date).toLocaleDateString(language === "ur" ? "ur-PK" : "en-GB"),
        record.workflow.length > 90 ? `${record.workflow.slice(0, 90)}…` : record.workflow,
        record.category,
        t(normalizeRisk(record.risk).toLowerCase()),
        record.priority
      ];
      values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
  }

  function renderRisks() {
    const high = records.filter((r) => normalizeRisk(r.risk) === "HIGH");
    const medium = records.filter((r) => normalizeRisk(r.risk) === "MEDIUM");
    const low = records.filter((r) => normalizeRisk(r.risk) === "LOW");
    if ($("riskHigh")) $("riskHigh").textContent = high.length;
    if ($("riskMedium")) $("riskMedium").textContent = medium.length;
    if ($("riskLow")) $("riskLow").textContent = low.length;
    const list = $("riskList");
    const empty = $("emptyRisks");
    if (!list) return;
    list.replaceChildren();
    if (empty) empty.hidden = records.length > 0;
    records.forEach((record) => {
      const item = document.createElement("div");
      item.className = "risk-entry";
      const heading = document.createElement("strong");
      heading.textContent = `${t(normalizeRisk(record.risk).toLowerCase())} · ${record.category}`;
      const description = document.createElement("p");
      description.textContent = record.workflow.length > 160 ? `${record.workflow.slice(0, 160)}…` : record.workflow;
      const date = document.createElement("small");
      date.textContent = new Date(record.date).toLocaleString(language === "ur" ? "ur-PK" : "en-GB");
      item.append(heading, description, date);
      list.appendChild(item);
    });
  }

  function renderAll() {
    renderDashboard();
    renderReports();
    renderRisks();
  }

  function exportCSV() {
    if (!records.length) {
      alert(language === "ur" ? "برآمد کرنے کے لیے کوئی ریکارڈ موجود نہیں۔" : "There are no records to export.");
      return;
    }
    const columns = ["Date", "Workflow", "Category", "Risk", "Priority", "AI Matches", "Automation Matches", "AI Assisted"];
    const rows = records.map((r) => [
      new Date(r.date).toISOString(), r.workflow, r.category, r.risk, r.priority,
      r.aiMatches, r.autoMatches, r.usedAI ? "Yes" : "No"
    ]);
    const csv = [columns, ...rows].map((row) =>
      row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")
    ).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "neurocore-analysis-reports.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function playVideo(card) {
    const videoId = card.dataset.video;
    if (!videoId || !$("videoScreen")) return;
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=0&rel=0`;
    frame.title = card.dataset.title || "NEUROCORE IT tutorial";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    const screen = $("videoScreen");
    screen.replaceChildren(frame);
    $("videoTitle").textContent = language === "ur" ? (card.dataset.titleUr || card.dataset.title) : card.dataset.title;
    $("videoDescription").textContent = language === "ur" ? (card.dataset.descriptionUr || "") : card.dataset.description;
  }

  function init() {
    all(".nav").forEach((button) => button.addEventListener("click", () => showPage(button.dataset.page)));
    all("[data-go]").forEach((button) => button.addEventListener("click", () => showPage(button.dataset.go)));
    if ($("languageSelect")) $("languageSelect").addEventListener("change", (event) => applyLanguage(event.target.value));
    if ($("analyzeBtn")) $("analyzeBtn").addEventListener("click", analyzeWorkflow);
    if ($("sampleBtn")) $("sampleBtn").addEventListener("click", () => { $("workflowInput").value = t("sampleText"); });
    if ($("clearBtn")) $("clearBtn").addEventListener("click", () => {
      $("workflowInput").value = "";
      $("analysisResult").hidden = true;
      $("aiResponse").hidden = true;
    });
    if ($("exportBtn")) $("exportBtn").addEventListener("click", exportCSV);
    all(".video-card").forEach((card) => card.addEventListener("click", () => playVideo(card)));
    renderAll();
    applyLanguage("en");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
