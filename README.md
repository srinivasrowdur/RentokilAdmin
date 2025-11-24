# Agentic Factory - Admin Console

A production-ready React dashboard for monitoring AI agents across **Performance**, **Compliance**, and **Cost** metrics. Built with a scalable, modular architecture designed for real-time data integration with **Google Vertex AI Agent Engine**.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite) ![Recharts](https://img.shields.io/badge/Recharts-2.10-22C55E) ![Google Cloud](https://img.shields.io/badge/Google_Cloud-Ready-4285F4?logo=googlecloud)

---

## Features

### 📊 Three Metric Categories

| Category | Metrics Tracked |
|----------|-----------------|
| **Performance** | Latency, Error Rate, Tool Call Success, Escalation Rate, Output Accuracy, Hallucination Rate |
| **Compliance** | Privacy Compliance (GDPR), Security Control Coverage, Bias Detection Rate, Explainability Coverage |
| **Costs** | Total Cost, Token Usage, Cost per Model Breakdown |

### 🎯 Key Capabilities

- **Factory Overview** - Unified view of all metrics with drill-down navigation
- **Real-time Ready** - Architecture supports WebSocket/polling integration
- **Agent-level Breakdown** - Per-agent metrics across all categories
- **Visual Indicators** - Colour-coded status (green/amber/red) with target thresholds
- **Interactive Charts** - Area charts, gauges, and pie charts via Recharts
- **Google Cloud Integration** - Designed to connect with Vertex AI Agent Engine

---

## Project Structure

```
RentokilAdmin/
├── README.md
├── .gitignore
│
├── backend/                        # Backend integration planning
│   └── plan.md                     # Google Agent Engine integration plan
│
└── Frontend/                       # React dashboard application
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── AgentDashboard.jsx      # Main container (controller)
        ├── App.jsx                 # React app entry
        ├── main.jsx                # Vite entry point
        ├── index.css               # Global styles
        │
        ├── components/
        │   ├── common/             # Reusable UI components
        │   │   ├── MetricCard.jsx
        │   │   ├── CategoryCard.jsx
        │   │   ├── GaugeChart.jsx
        │   │   └── ChartTooltip.jsx
        │   │
        │   ├── layout/
        │   │   └── Sidebar.jsx
        │   │
        │   └── views/              # Feature views (pages)
        │       ├── Overview.jsx
        │       ├── Performance.jsx
        │       ├── Compliance.jsx
        │       └── Costs.jsx
        │
        ├── hooks/
        │   └── useAgentData.js     # Data fetching hook (API-ready)
        │
        └── utils/
            ├── theme.js            # Design tokens & colour system
            └── mockData.js         # Simulated backend data
```

---

## Google Cloud Integration

The dashboard is designed to integrate with **Google Vertex AI Agent Engine** for monitoring production AI agents.

### Metrics Availability from Google Cloud

| Metric Type | Google Cloud Source | Status |
|-------------|---------------------|--------|
| **Latency** | Cloud Monitoring API | ✅ Native |
| **Error Rate** | Cloud Monitoring API | ✅ Native |
| **Token Usage** | Vertex AI API Response | ✅ Native |
| **Cost** | Cloud Billing API | ✅ Native |
| **Tool Success** | Custom Logging | ⚠️ Custom |
| **Escalation Rate** | Custom Logging | ⚠️ Custom |
| **Compliance Metrics** | Custom + Responsible AI | ⚠️ Custom |

### Required Google Cloud APIs

```
- Cloud Monitoring API (aiplatform.googleapis.com metrics)
- Vertex AI API (token usage, model responses)
- Cloud Billing API (cost tracking)
- Cloud Logging API (custom events)
- Agent Engine Sessions API (traces)
```

### Integration Plan

See [`backend/plan.md`](./backend/plan.md) for the complete integration plan including:
- Detailed metrics mapping
- Python code examples
- Architecture diagrams
- Implementation roadmap
- Required GCP permissions

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **Vite 5** | Fast build tool & dev server |
| **Recharts** | Data visualisation (charts) |
| **Google Cloud** | Backend data source (planned) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd RentokilAdmin

# Install dependencies
cd Frontend
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Metrics Reference

### Performance Metrics

| Metric | Definition | Google Cloud Source |
|--------|------------|---------------------|
| **Latency** | Time from request received to final response sent | `aiplatform.googleapis.com/prediction/latencies` |
| **Error Rate** | Share of requests that fail (exceptions, timeouts, invalid outputs) | `aiplatform.googleapis.com/prediction/error_count` |
| **Tool Call Success Rate** | Percentage of successful tool/API calls made by the agent | Custom logging required |
| **Escalation Rate** | Frequency with which the agent defers to a human | Custom logging required |
| **Output Accuracy** | Correctness of the agent's output vs. ground truth | Vertex AI Evaluation |
| **Hallucination Rate** | Portion of outputs containing unverifiable or false claims | Vertex AI Grounding |

### Compliance Metrics

| Metric | Definition | Google Cloud Source |
|--------|------------|---------------------|
| **Privacy Compliance Rate** | Percentage of interactions where personal data is handled according to policy (e.g., GDPR) | Custom guardrails tracking |
| **Security Control Coverage** | Proportion of required security controls implemented and active | Security Command Center |
| **Bias Detection Rate** | Percentage of outputs flagged for bias or fairness issues | Vertex AI Responsible AI |
| **Explainability Coverage** | Share of outputs accompanied by interpretable reasoning or traceability | Agent Engine Sessions |

### Cost Metrics

| Metric | Definition | Google Cloud Source |
|--------|------------|---------------------|
| **Token Usage** | Total tokens consumed per interaction (prompt + completion) | `response.usage_metadata` |
| **Cost per Model** | Cost incurred per model used (e.g., Claude, GPT-4o, Gemini) | BigQuery Billing Export |
| **Total Cost** | Aggregate cost across all components (LLM, compute, storage, API calls) | Cloud Billing API |

---

## Architecture

### Design Principles

1. **Separation of Concerns**
   - Logic in hooks (`useAgentData`)
   - Presentation in components (`views/`, `common/`)
   - Styling via centralised theme (`theme.js`)

2. **Single Source of Truth**
   - Data fetched once in container, passed down via props
   - All mock data centralised in `mockData.js`
   - Ready to swap for API calls

3. **Scalability**
   - Add new views by creating a file in `views/` and one switch case
   - Add new agents by updating data source
   - Real-time: swap mock imports for WebSocket in `useAgentData.js`

### Data Flow

```
┌─────────────────────┐
│   Google Cloud      │
│  (Agent Engine)     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   Backend Service   │  ← Future: Python/Node.js
│   (Aggregation)     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   useAgentData()    │  ← Currently: mockData.js
│   (React Hook)      │     Future: API calls
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   Dashboard Views   │
│   (React Components)│
└─────────────────────┘
```

---

## Extending the Dashboard

### Adding a New View

1. Create `Frontend/src/components/views/NewView.jsx`
2. Import in `AgentDashboard.jsx`
3. Add navigation item in `Sidebar.jsx`
4. Add case in `renderContent()` switch

### Connecting to Google Cloud

Replace the mock data in `useAgentData.js`:

```javascript
// hooks/useAgentData.js
import { useState, useEffect } from 'react';

export const useAgentData = () => {
  const [data, setData] = useState({ loading: true, error: null });

  useEffect(() => {
    // Fetch from backend API (which connects to Google Cloud)
    const fetchData = async () => {
      try {
        const response = await fetch('/api/agent-metrics');
        const json = await response.json();
        setData({ ...json, loading: false, error: null });
      } catch (error) {
        setData(prev => ({ ...prev, loading: false, error }));
      }
    };
    
    fetchData();
    
    // Optional: Set up polling for near-real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
};
```

### Customising the Theme

Edit `Frontend/src/utils/theme.js`:

```javascript
export const theme = {
  colors: {
    categories: {
      performance: '#3B82F6', // Change to your brand blue
      compliance: '#22C55E',  // Change to your brand green
      cost: '#F59E0B',        // Change to your brand amber
    },
    // ... other tokens
  }
};
```

---

## Colour System

| Category | Colour | Hex | Usage |
|----------|--------|-----|-------|
| Performance | Blue | `#3B82F6` | Speed, efficiency metrics |
| Compliance | Green | `#22C55E` | Safety, trust metrics |
| Cost | Amber | `#F59E0B` | Financial metrics |
| Active | Green | `#22c55e` | Healthy status |
| Warning | Amber | `#F59E0B` | Below target |
| Error | Red | `#DC2626` | Critical issues |

---

## Roadmap

- [x] Frontend dashboard with mock data
- [x] Modular component architecture
- [x] Three metric categories (Performance, Compliance, Costs)
- [x] Google Cloud integration plan
- [ ] Backend service implementation
- [ ] Cloud Monitoring API integration
- [ ] Cloud Billing API integration
- [ ] Real-time WebSocket updates
- [ ] Authentication & authorisation

---

## Documentation

| Document | Description |
|----------|-------------|
| [README.md](./README.md) | This file - project overview |
| [backend/plan.md](./backend/plan.md) | Google Agent Engine integration plan |

---

## Licence

MIT
