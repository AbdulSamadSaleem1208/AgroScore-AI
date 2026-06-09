const viewAuth = document.getElementById("view-auth");
const viewOnboarding = document.getElementById("view-onboarding");
const viewApp = document.getElementById("view-app");
const phoneFrame = document.getElementById("phoneFrame");

let currentLang = "en";
let selectedRole = "farmer";
let currentStep = 1;
let activeTab = "home";

const scoringWeights = {
  yield: 0.3,
  repayment: 0.25,
  irrigation: 0.2,
  transaction: 0.15,
  climate: 0.1,
};

const chipButtons = document.querySelectorAll(".chip");
const loginForm = document.getElementById("loginForm");
const openFullDemo = document.getElementById("openFullDemo");
const skipOnboarding = document.getElementById("skipOnboarding");
const authLangPicker = document.getElementById("authLangPicker");
const appLangSelect = document.getElementById("appLangSelect");
const onboardLang = document.getElementById("onboardLang");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const stepNumber = document.getElementById("stepNumber");
const stepDot2 = document.getElementById("stepDot2");
const nextStepBtn = document.getElementById("nextStep");
const backStepBtn = document.getElementById("backStep");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabScreens = document.querySelectorAll(".tab-screen");
const appTitle = document.getElementById("appTitle");
const appSubtitle = document.getElementById("appSubtitle");
const resetDemo = document.getElementById("resetDemo");
const jumpButtons = document.querySelectorAll(".jump-btn");
const runScoringBtn = document.getElementById("runScoring");

const yieldFactor = document.getElementById("yieldFactor");
const repaymentFactor = document.getElementById("repaymentFactor");
const irrigationFactor = document.getElementById("irrigationFactor");
const transactionFactor = document.getElementById("transactionFactor");
const climateFactor = document.getElementById("climateFactor");

const yieldFactorLabel = document.getElementById("yieldFactorLabel");
const repaymentFactorLabel = document.getElementById("repaymentFactorLabel");
const irrigationFactorLabel = document.getElementById("irrigationFactorLabel");
const transactionFactorLabel = document.getElementById("transactionFactorLabel");
const climateFactorLabel = document.getElementById("climateFactorLabel");

const aiScoreValue = document.getElementById("aiScoreValue");
const scoreRing = document.getElementById("scoreRing");
const riskBand = document.getElementById("riskBand");
const defaultProbability = document.getElementById("defaultProbability");
const decisionClass = document.getElementById("decisionClass");
const modelConfidence = document.getElementById("modelConfidence");
const scoreReasons = document.getElementById("scoreReasons");

const heroScoreValue = document.getElementById("heroScoreValue");
const heroRiskBadge = document.getElementById("heroRiskBadge");
const heroLoanEligible = document.getElementById("heroLoanEligible");
const heroConfidence = document.getElementById("heroConfidence");
const heroModelVersion = document.getElementById("heroModelVersion");
const heroDefaultProb = document.getElementById("heroDefaultProb");
const heroDecision = document.getElementById("heroDecision");

const loanForm = document.getElementById("loanForm");
const amountInput = document.getElementById("amount");
const tenureInput = document.getElementById("tenure");
const tenureValue = document.getElementById("tenureValue");
const repaymentOutput = document.getElementById("repaymentOutput");

const dataCaptureForm = document.getElementById("dataCaptureForm");
const eventType = document.getElementById("eventType");
const eventNote = document.getElementById("eventNote");
const eventSource = document.getElementById("eventSource");
const eventLog = document.getElementById("eventLog");
const farmerNameInput = document.getElementById("farmerName");
const welcomeName = document.getElementById("welcomeName");

const LANG_KEY = "agroscoreai_lang";
const ROLE_KEY = "agroscoreai_role";

function t(key) {
  return AgroI18n.get(currentLang, key);
}

function detectBrowserLanguage() {
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("ur")) return "ur";
  if (nav.startsWith("ps")) return "ps";
  if (nav.includes("bal")) return "bal";
  return "en";
}

function loadSavedLanguage() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && AgroI18n.langs.includes(saved)) return saved;
  return detectBrowserLanguage();
}

function saveLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

function updateWelcomeName() {
  if (welcomeName && farmerNameInput) {
    welcomeName.textContent = farmerNameInput.value.trim() || "Ahmed Raza";
  }
}

function setLanguage(lang, silent) {
  if (!AgroI18n.langs.includes(lang)) lang = "en";
  currentLang = lang;
  saveLanguage(lang);
  document.documentElement.lang = lang;
  document.body.classList.toggle("rtl", lang !== "en");

  authLangPicker?.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  if (appLangSelect) appLangSelect.value = lang;
  if (onboardLang) onboardLang.value = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (el.id === "welcomeText") return;
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  document.querySelectorAll("select option[data-i18n]").forEach((opt) => {
    opt.textContent = t(opt.dataset.i18n);
  });

  const tabKey = `subtitles.${activeTab}`;
  if (appSubtitle && AgroI18n.get(currentLang, tabKey) !== tabKey) {
    appSubtitle.textContent = AgroI18n.get(currentLang, tabKey);
  }

  updateWelcomeName();
  renderStep();
  runAIScoring(false);
  seedEventLog();

  if (!silent) showToast(t("langSaved"));
}

authLangPicker?.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

appLangSelect?.addEventListener("change", () => {
  setLanguage(appLangSelect.value);
});

onboardLang?.addEventListener("change", () => {
  setLanguage(onboardLang.value, true);
});

farmerNameInput?.addEventListener("input", updateWelcomeName);

chipButtons.forEach((chip) => {
  chip.addEventListener("click", () => {
    chipButtons.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    selectedRole = chip.dataset.role;
    localStorage.setItem(ROLE_KEY, selectedRole);
    showToast(t("toastRole"));
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  viewAuth.classList.remove("active");
  viewOnboarding.classList.add("active");
});

openFullDemo.addEventListener("click", () => {
  viewAuth.classList.remove("active");
  viewOnboarding.classList.remove("active");
  viewApp.classList.add("active");
  setTab("showcase");
  showToast(t("toastDemo"));
});

skipOnboarding.addEventListener("click", launchApp);

backStepBtn.addEventListener("click", () => {
  if (currentStep === 1) return;
  currentStep = 1;
  renderStep();
});

nextStepBtn.addEventListener("click", () => {
  if (currentStep === 1) {
    currentStep = 2;
    renderStep();
    return;
  }
  launchApp();
});

function renderStep() {
  const step1Active = currentStep === 1;
  step1.classList.toggle("active", step1Active);
  step2.classList.toggle("active", !step1Active);
  stepNumber.textContent = String(currentStep);
  stepDot2.classList.toggle("active", !step1Active);
  backStepBtn.disabled = step1Active;
  nextStepBtn.textContent = step1Active ? t("next") : t("finish");
}

function launchApp() {
  updateWelcomeName();
  if (onboardLang) setLanguage(onboardLang.value, true);
  viewOnboarding.classList.remove("active");
  viewApp.classList.add("active");
  if (selectedRole === "bank") setTab("bank");
  else if (selectedRole === "field") setTab("data");
  else setTab("home");
}

function setTab(tab) {
  activeTab = tab;
  tabButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === tab));
  tabScreens.forEach((screen) => screen.classList.toggle("active", screen.id === `tab-${tab}`));

  const titleKeys = {
    home: "tabHome",
    data: "tabData",
    score: "tabScore",
    loan: "tabLoan",
    advisory: "tabAdvisory",
    more: "tabMore",
    bank: "bankQueue",
    showcase: "fullDemo",
  };
  appTitle.textContent = t(titleKeys[tab] || "tabHome");
  appSubtitle.textContent = AgroI18n.get(currentLang, `subtitles.${tab}`) || "";

  const activeScreen = document.getElementById(`tab-${tab}`);
  if (activeScreen) {
    activeScreen.classList.remove("active-animate");
    requestAnimationFrame(() => activeScreen.classList.add("active-animate"));
  }
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});

tenureInput.addEventListener("input", () => {
  tenureValue.textContent = tenureInput.value;
});

loanForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(amountInput.value || 0);
  const tenure = Number(tenureInput.value || 1);
  const annualRate = 0.16;
  const monthlyRate = annualRate / 12;
  const monthlyInstallment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -tenure));
  const totalRepayment = monthlyInstallment * tenure;
  const markup = totalRepayment - amount;

  repaymentOutput.innerHTML = `
    <p class="metric"><strong>PKR ${Math.round(monthlyInstallment).toLocaleString()}</strong> / ${t("tenureMonths")}</p>
    <p class="metric muted">${t("repaymentPreview")}</p>
    <p class="metric">Total: PKR ${Math.round(totalRepayment).toLocaleString()}</p>
    <p class="metric good">${t("approveFast")}</p>
  `;
  showToast(t("toastPlan"));
});

dataCaptureForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const typeKey = eventType.selectedOptions[0]?.dataset.i18n || "eventSowing";
  const srcKey = eventSource.selectedOptions[0]?.dataset.i18n || "srcFarmer";
  const note = eventNote.value.trim() || "—";
  const li = document.createElement("li");
  li.innerHTML = `<strong>${t(srcKey)}:</strong> ${t(typeKey)} — ${note}`;
  eventLog.prepend(li);
  eventNote.value = "";

  const val = eventType.value;
  if (val === "irrigation") irrigationFactor.value = clamp(Number(irrigationFactor.value) + 2, 20, 100);
  else if (val === "fertilizer") yieldFactor.value = clamp(Number(yieldFactor.value) + 1, 30, 100);
  else if (val === "harvest") {
    transactionFactor.value = clamp(Number(transactionFactor.value) + 1, 20, 100);
    climateFactor.value = clamp(Number(climateFactor.value) - 1, 10, 100);
  }
  refreshFactorLabels();
  runAIScoring(false);
  showToast(t("toastEvent"));
});

jumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.jump;
    if (target) {
      viewApp.classList.add("active");
      viewAuth.classList.remove("active");
      viewOnboarding.classList.remove("active");
      setTab(target);
    }
  });
});

resetDemo.addEventListener("click", () => {
  viewApp.classList.remove("active");
  viewOnboarding.classList.remove("active");
  viewAuth.classList.add("active");
  currentStep = 1;
  renderStep();
  setTab("home");
  showToast(t("toastReset"));
});

const factorInputs = [
  [yieldFactor, yieldFactorLabel],
  [repaymentFactor, repaymentFactorLabel],
  [irrigationFactor, irrigationFactorLabel],
  [transactionFactor, transactionFactorLabel],
  [climateFactor, climateFactorLabel],
];

factorInputs.forEach(([input, label]) => {
  input.addEventListener("input", () => {
    label.textContent = input.value;
    runAIScoring(false);
  });
});

runScoringBtn.addEventListener("click", () => runAIScoring(true));

function refreshFactorLabels() {
  factorInputs.forEach(([input, label]) => {
    label.textContent = input.value;
  });
}

function runAIScoring(showFeedback) {
  const features = {
    yield: Number(yieldFactor.value),
    repayment: Number(repaymentFactor.value),
    irrigation: Number(irrigationFactor.value),
    transaction: Number(transactionFactor.value),
    climate: Number(climateFactor.value),
  };

  const weighted =
    features.yield * scoringWeights.yield +
    features.repayment * scoringWeights.repayment +
    features.irrigation * scoringWeights.irrigation +
    features.transaction * scoringWeights.transaction +
    features.climate * scoringWeights.climate;

  const score = Math.round(300 + weighted * 6);
  const pd = Math.max(2.8, Math.min(34.5, (900 - score) / 12.5));
  const eventCountBoost = Math.min(0.06, eventLog.children.length * 0.006);
  const confidenceRaw = Math.min(0.95, 0.78 + eventCountBoost + (features.transaction - 60) / 400);

  let riskKey = "lowRisk";
  let decisionKey = "approveFast";
  let eligibleLoan = 350000;
  let badgeClass = "low";

  if (score < 640) {
    riskKey = "highRisk";
    decisionKey = "manualReview";
    eligibleLoan = 180000;
    badgeClass = "high";
  } else if (score < 720) {
    riskKey = "medRisk";
    decisionKey = "approveMonitor";
    eligibleLoan = 260000;
    badgeClass = "medium";
  }

  const riskText = t(riskKey);
  const decisionText = t(decisionKey);
  const confLabel = confidenceRaw > 0.86 ? t("high") : t("medium");

  aiScoreValue.textContent = String(score);
  const bandLabel = badgeClass === "high" ? t("highRisk") : badgeClass === "medium" ? t("medRisk") : t("lowRisk");
  riskBand.textContent = bandLabel.replace(" risk", "").replace(" خطرہ", "").replace(" خطر", "");
  riskBand.className = `badge ${badgeClass}`;
  defaultProbability.textContent = `${pd.toFixed(1)}%`;
  decisionClass.textContent = decisionText;
  modelConfidence.textContent = `${confLabel} (${confidenceRaw.toFixed(2)})`;

  const ringDegrees = Math.round((score / 900) * 360);
  scoreRing.style.background = `conic-gradient(var(--primary) 0deg, var(--primary) ${ringDegrees}deg, var(--ring-track) ${ringDegrees}deg 360deg)`;

  heroScoreValue.textContent = String(score);
  heroRiskBadge.textContent = riskText.replace(" risk", "").replace(" خطرہ", "").replace(" خطر", "");
  heroRiskBadge.className = `badge ${badgeClass}`;
  heroLoanEligible.textContent = eligibleLoan.toLocaleString();
  heroConfidence.textContent = confLabel;
  heroDefaultProb.textContent = `${pd.toFixed(1)}%`;
  heroDecision.textContent = decisionText.split(" ")[0];
  heroModelVersion.textContent = "2.4.1";

  scoreReasons.innerHTML = buildReasonCodes(features);

  if (showFeedback) showToast(t("toastScoring"));
}

function buildReasonCodes(features) {
  const entries = [
    { value: features.yield, good: "RC-11 (+)", bad: "RC-31 (-)" },
    { value: features.repayment, good: "RC-05 (+)", bad: "RC-22 (-)" },
    { value: features.irrigation, good: "RC-07 (+)", bad: "RC-27 (-)" },
    { value: features.transaction, good: "RC-14 (+)", bad: "RC-18 (-)" },
    { value: features.climate, good: "RC-03 (+)", bad: "RC-19 (-)" },
  ];
  const strongest = [...entries].sort((a, b) => b.value - a.value).slice(0, 2).map((i) => i.good);
  const weakest = [...entries].sort((a, b) => a.value - b.value)[0].bad;
  return [...strongest, weakest].map((line) => `<li>${line}</li>`).join("");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

let toastTimer;
function showToast(message) {
  document.querySelectorAll(".toast").forEach((x) => x.remove());
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  phoneFrame.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.remove(), 1900);
}

function seedEventLog() {
  eventLog.innerHTML = `
    <li><strong>${t("srcField")}:</strong> ${t("eventSowing")}</li>
    <li><strong>${t("srcSms")}:</strong> ${t("eventIrrigation")}</li>
    <li><strong>${t("srcFarmer")}:</strong> ${t("eventFertilizer")}</li>
  `;
}

function initApp() {
  const savedRole = localStorage.getItem(ROLE_KEY);
  if (savedRole) {
    selectedRole = savedRole;
    chipButtons.forEach((c) => c.classList.toggle("active", c.dataset.role === savedRole));
  }
  setLanguage(loadSavedLanguage(), true);
  seedEventLog();
  refreshFactorLabels();
  runAIScoring(false);
}

initApp();
