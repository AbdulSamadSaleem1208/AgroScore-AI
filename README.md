# AgroScoreAI

**Wheat-focused AI credit intelligence for Pakistan's smallholder farmers.**

AgroScoreAI is an agri-fintech mobile prototype that converts real farm activity — crop cycles, irrigation, climate exposure, and transaction behavior — into an explainable credit score. Farmers get better access to finance; banks and MFIs get a decision-ready risk view.

> **Financing New Ventures (FNV)** · FAST School of Management · Spring 2025

---

## The Problem

Millions of wheat farmers in Pakistan are productive but **financially invisible**. Traditional lenders require salary slips, tax records, and collateral — documents most smallholders do not have. AgroScoreAI builds a digital financial identity from agricultural and behavioral data instead.

---

## The Solution

| Module | Description |
|--------|-------------|
| **Data Collection** | Log wheat events via mobile app, SMS, and field officers |
| **AI Credit Scoring** | Weighted explainable model with risk band and decision class |
| **Farmer Advisory** | Localized tips on loans, inputs, weather, and repayment |
| **Bank Portal** | Institution queue with score, risk, and underwriting recommendation |

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/agroscoreai.git
cd agroscoreai
python -m http.server 5500
```

Open: **http://127.0.0.1:5500**

Or open `index.html` directly in any modern browser.

---

## Investor Demo (2 Minutes)

1. Open the app → tap **Investor Demo Mode**
2. **Home** — show credit score, eligible loan, quick actions
3. **Data** — add a farm event (score updates live)
4. **Score** — tap **Run AI Scoring** (explainable output)
5. **Loan** — generate repayment plan
6. **Tips** — switch language to Urdu / Pashto / Balochi
7. **More** — open Bank decision queue

---

## Features

- Mobile-first UI (phone-frame design for presentations)
- **4 Pakistan languages:** English · Urdu · Pashto · Balochi
- RTL layout for Urdu, Pashto, and Balochi
- Role-based login: Farmer · Bank/MFI · Field Officer
- Onboarding with profile setup and data consent
- Live AI credit scoring engine (client-side demo)
- Explainable factor breakdown and reason codes
- Loan repayment simulator
- Localized advisory feed
- Bank underwriting decision queue

---

## AI Scoring Model

| Factor | Weight |
|--------|--------|
| Yield stability | 30% |
| Repayment behavior | 25% |
| Irrigation consistency | 20% |
| Transaction regularity | 15% |
| Climate stability | 10% |

- **Score range:** 300 – 900
- **Risk bands:** Low · Medium · High
- **Decisions:** Fast-track · Monitoring · Manual review

Data events in the **Data** tab adjust model inputs and recalculate the score in real time.

---

## Project Structure

```
fnv/
├── index.html      # Mobile app screens
├── styles.css      # UI styling
├── script.js       # Navigation, scoring, i18n
├── i18n.js         # EN · UR · PS · BAL translations
├── README.md       # Project documentation
└── DESCRIPTION.txt # GitHub repo description (copy-paste)
```

---

## Target Market

| Segment | Focus |
|---------|-------|
| **Primary** | Smallholder wheat farmers (1–5 acres) |
| **Secondary** | Banks, MFIs, rural lenders |
| **Tertiary** | NGOs, government agri-finance programs |

**Entry wedge:** Wheat — predictable cycle, large farmer base, high financing demand.

---

## Team

| Member | ID | Role |
|--------|-----|------|
| Abdul Samad Saleem | 22I-2253 | Founder / CEO |
| Izza Asif | 22I-2256 | CTO / AI Lead |
| Zainab Tahir | 22I-9848 | Finance & Business Analyst |
| Urooj Taufiq | 22I-9836 | Operations & Field Lead |
| Sumaya Saeed | 22I-4956 | Marketing & Growth Lead |

**Instructor:** Sir Fawad Kader  
**Institution:** FAST School of Management

---

## Business Model

- Per-farmer scoring fees (B2B)
- Institution dashboard subscriptions (SaaS)
- API/integration contracts
- Portfolio analytics for agri-lenders

**Seed funding target:** PKR 56 million

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Prototype | HTML5 · CSS3 · Vanilla JavaScript |
| i18n | Custom module (`i18n.js`) |
| AI (demo) | Client-side weighted scoring model |
| Production (planned) | Android app · Cloud APIs · ML pipeline |

---

## Roadmap

- [x] Mobile UI prototype
- [x] 4-language support
- [x] Explainable AI scoring demo
- [ ] Backend API + database
- [ ] SMS / voice integration
- [ ] Pilot in Punjab wheat districts
- [ ] Bank / MFI partner onboarding
- [ ] Production ML with seasonal retraining

---

## References

- [State Bank of Pakistan](https://www.sbp.org.pk)
- [Pakistan Bureau of Statistics](https://www.pbs.gov.pk)
- [MNFSR Pakistan](https://www.mnfsr.gov.pk)
- [SECP Pakistan](https://www.secp.gov.pk)
- [World Bank — Pakistan](https://www.worldbank.org/en/country/pakistan)
- [FAO](https://www.fao.org) · [IFC](https://www.ifc.org) · [ADB](https://www.adb.org)

---

## License

Academic project — FAST School of Management, Spring 2025.  
For demo and evaluation. Contact the team for commercial use.

---

*Aap ki zameen. Aap ka data. Aap ka mustaqbil.*
