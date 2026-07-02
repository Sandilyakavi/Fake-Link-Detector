# Fake Link Detector 🛡️

Detect phishing and malicious URLs instantly using cybersecurity heuristics checks. This tool analyzes link anatomy, protocol configurations, hostname patterns, TLD registration, and suspicious keywords to compute a real-time risk index score.

---

## 🚀 Tech Stack

### Frontend
- **React.js (Vite)**: Component-driven high-speed rendering.
- **Tailwind CSS v4**: Futuristic responsive dark cybersecurity theme styling.
- **Axios**: Promised-based client API service fetching.
- **Framer Motion**: Smooth entrance transitions and micro-interactions.
- **jsPDF**: Client-side compiled professional security audit PDF exports.
- **Canvas Confetti**: Celebratory indicators for fully safe URLs.

### Backend
- **Node.js + Express.js**: REST API server layer.
- **validator.js**: Robust input and IPv4/v6 validation.
- **dotenv**: Environment-specific configurations.
- **cors**: Cross-Origin Resource Sharing enablement.

---

## 🛠️ Folder Structure

```text
Fake-Link-Detector/
├── backend/
│   ├── controllers/
│   │   └── analyzeController.js    # Logic for compiling risk scores and explanations
│   ├── middleware/
│   │   └── validation.js           # validator.js checks for URL anatomy
│   ├── routes/
│   │   └── analyzeRoutes.js        # POST /api/analyze router
│   ├── utils/
│   │   └── heuristics.js           # Implementation of the 9 threat rules
│   ├── .env                        # Port and environment variables
│   ├── server.js                   # Node Express setup
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Features.jsx        # Grid explaining the 9 rules
│   │   │   ├── Footer.jsx          # Dashboard footer
│   │   │   ├── Hero.jsx            # Modern intro header
│   │   │   ├── Loader.jsx          # Simulated hacker scanning terminal
│   │   │   ├── Navbar.jsx          # Header with logo and history pointers
│   │   │   ├── ResultCard.jsx      # Detailed reports, copy, and PDF download keys
│   │   │   ├── RiskMeter.jsx       # Framer Motion animated SVG progress circle
│   │   │   └── UrlInput.jsx        # Form with validations and quick preset links
│   │   ├── pages/
│   │   │   └── Home.jsx            # State Orchestrator, Toast container, and History logs
│   │   ├── services/
│   │   │   └── api.js              # Axios configuration
│   │   ├── utils/
│   │   │   └── helpers.js          # Clipboard utility & jsPDF report layouts
│   │   ├── App.jsx                 # Core routing
│   │   ├── index.css               # Tailwind directives and cyber glows
│   │   └── main.jsx                # DOM rendering entrypoint
│   ├── vite.config.js              # Tailwind v4 Vite builder config
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Running Locally

Ensure you have [Node.js](https://nodejs.org/) installed.

### 1. Run the Backend Server
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server (runs nodemon on port 5002)
npm run dev
```

### 2. Run the Frontend Dashboard
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start the Vite development server
npm run dev
```

The frontend dashboard will be available at [http://localhost:5173](http://localhost:5173) (or whichever port Vite allocates) and will talk to the backend running on [http://localhost:5002](http://localhost:5002).

---

## 📡 API Endpoints

### `POST /api/analyze`
Analyzes a URL using the 9 cyber heuristic rules.

#### Request Body
```json
{
  "url": "login.verify.bank.account-alert.xyz"
}
```

#### Response (200 OK)
```json
{
  "url": "login.verify.bank.account-alert.xyz",
  "normalizedUrl": "https://login.verify.bank.account-alert.xyz",
  "safe": false,
  "score": 60,
  "status": "Dangerous",
  "reasons": [
    "Too many subdomains (3 subdomains detected)",
    "Contains suspicious keyword(s): login, verify",
    "Uses a suspicious top-level domain (.xyz)"
  ],
  "explanation": "This URL appears dangerous because it has too many subdomains, it contains keywords typically found in phishing scams, and it uses a high-risk suspicious top-level domain (TLD)."
}
```

---

## 🔍 Heuristics Rules Engine

The backend runs the URL through the following 9 checks:

| Rule # | Threat Indicator Checked | Criteria | Risk Weight |
|---|---|---|---|
| **01** | HTTPS Encryption | Missing `https://` protocol (uses `http://`) | **+20** |
| **02** | URL Length | Overall URL characters exceeds 75 | **+10** |
| **03** | IP Address Hostname | URL uses numeric IPv4/IPv6 address instead of a domain | **+25** |
| **04** | Contains `@` | Obscured hostnames utilizing `@` symbol | **+30** |
| **05** | Excessive Subdomains | Subdomain nesting exceeds 3 segments | **+15** |
| **06** | Suspicious Keywords | Contains keywords like `login`, `bank`, `wallet`, `paypal` etc | **+5 each** |
| **07** | Shortener Redirects | Domain belongs to services like `bit.ly`, `tinyurl.com`, `t.co` | **+20** |
| **08** | Too Many Hyphens | Domain contains 2 or more hyphens | **+10** |
| **09** | Suspicious TLDs | Matches high-risk TLDs: `.xyz`, `.top`, `.club`, `.live`, `.gq`, `.click` | **+15** |

#### Threat Scale
- **0 - 20**: `Safe` 🟢
- **21 - 50**: `Suspicious` 🟡
- **51 - 100**: `Dangerous` 🔴

---

## 📦 Deployment Steps

### Frontend (Vercel)
1. Install the Vercel CLI or connect your GitHub repository directly to Vercel.
2. In the project settings, set the **Framework Preset** to `Vite`.
3. Set the **Root Directory** to `frontend`.
4. Add the following **Environment Variables**:
   - `VITE_API_URL`: Your hosted backend URL (e.g., `https://your-backend.render.com/api`).
5. Trigger build.

### Backend (Render)
1. Create a new **Web Service** on Render and link your repo.
2. Set the **Root Directory** to `backend`.
3. Select **Runtime** as `Node`.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npm start`.
6. Add the following **Environment Variables**:
   - `PORT`: `10000` (Render allocates this automatically, fallback uses default).
   - `NODE_ENV`: `production`

---

## 🔮 Future Scope

1. **Third-Party API Integrations**:
   - **VirusTotal API** for multi-engine reputation checks.
   - **Google Safe Browsing API** to flag malicious site listings.
2. **Domain Registration Analysis**:
   - Real-time **WHOIS lookup** and **Domain Age** verification to check newly registered phishing sites.
3. **Advanced Detection**:
   - **AI-based phishing detection** analyzing landing page content/visuals.
   - **Machine Learning classification model** trained on active cyber intelligence feeds.
4. **Client Channels**:
   - Cross-browser **Extension** to scan page links automatically before user clicks.
   - **QR Code Scanner** integration to detect malicious QR codes (Qishing).
5. **Messaging Security**:
   - **Email and SMS phishing detectors** allowing direct attachment and messaging audits.
