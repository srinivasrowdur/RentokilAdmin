# Agentic Factory - Admin Console

A production-ready React dashboard for monitoring AI agents across **Performance**, **Compliance**, and **Cost** metrics. Built with a scalable, modular architecture designed for real-time data integration.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite) ![Recharts](https://img.shields.io/badge/Recharts-2.10-22C55E)

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

---

## Architecture

The codebase follows a **clean architecture** pattern optimised for scalability and maintainability.

```
Frontend/src/
├── AgentDashboard.jsx          # Main container (controller)
├── App.jsx                     # React app entry
├── main.jsx                    # Vite entry point
├── index.css                   # Global styles
│
├── components/
│   ├── common/                 # Reusable UI components
│   │   ├── MetricCard.jsx      # Stat display card
│   │   ├── CategoryCard.jsx    # Category summary card
│   │   ├── GaugeChart.jsx      # Semi-circular gauge
│   │   └── ChartTooltip.jsx    # Custom Recharts tooltip
│   │
│   ├── layout/
│   │   └── Sidebar.jsx         # Navigation sidebar
│   │
│   └── views/                  # Feature views (pages)
│       ├── Overview.jsx        # Factory overview dashboard
│       ├── Performance.jsx     # Performance metrics view
│       ├── Compliance.jsx      # Compliance metrics view
│       └── Costs.jsx           # Cost metrics view
│
├── hooks/
│   └── useAgentData.js         # Data fetching hook (WebSocket-ready)
│
└── utils/
    ├── theme.js                # Design tokens & colour system
    └── mockData.js             # Simulated backend data
```

### Design Principles

1. **Separation of Concerns**
   - Logic in hooks (`useAgentData`)
   - Presentation in components (`views/`, `common/`)
   - Styling via centralised theme (`theme.js`)

2. **Single Source of Truth**
   - Data fetched once in container, passed down via props
   - No prop drilling beyond one level

3. **Scalability**
   - Add new views by creating a file in `views/` and one switch case
   - Add new agents by updating `mockData.js` (or API response)
   - Real-time: swap `mockData` imports for WebSocket in `useAgentData.js`

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **Vite 5** | Fast build tool & dev server |
| **Recharts** | Data visualisation (charts) |

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

| Metric | Definition |
|--------|------------|
| **Latency** | Time from request received to final response sent |
| **Error Rate** | Share of requests that fail (exceptions, timeouts, invalid outputs) |
| **Tool Call Success Rate** | Percentage of successful tool/API calls made by the agent |
| **Escalation Rate** | Frequency with which the agent defers to a human |
| **Output Accuracy** | Correctness of the agent's output vs. ground truth |
| **Hallucination Rate** | Portion of outputs containing unverifiable or false claims |

### Compliance Metrics

| Metric | Definition |
|--------|------------|
| **Privacy Compliance Rate** | Percentage of interactions where personal data is handled according to policy (e.g., GDPR) |
| **Security Control Coverage** | Proportion of required security controls implemented and active |
| **Bias Detection Rate** | Percentage of outputs flagged for bias or fairness issues |
| **Explainability Coverage** | Share of outputs accompanied by interpretable reasoning or traceability |

### Cost Metrics

| Metric | Definition |
|--------|------------|
| **Token Usage** | Total tokens consumed per interaction (prompt + completion) |
| **Cost per Model** | Cost incurred per model used (e.g., Claude, GPT-4o, Gemini) |
| **Total Cost** | Aggregate cost across all components (LLM, compute, storage, API calls) |

---

## Extending the Dashboard

### Adding a New View

1. Create `Frontend/src/components/views/NewView.jsx`
2. Import in `AgentDashboard.jsx`
3. Add navigation item in `Sidebar.jsx`
4. Add case in `renderContent()` switch

### Connecting Real-time Data

Replace the mock data in `useAgentData.js`:

```javascript
// hooks/useAgentData.js
import { useState, useEffect } from 'react';

export const useAgentData = () => {
  const [data, setData] = useState({ loading: true, error: null });

  useEffect(() => {
    // Option 1: WebSocket
    const socket = new WebSocket('wss://api.agentfactory.ai/stream');
    socket.onmessage = (event) => {
      setData({ ...JSON.parse(event.data), loading: false });
    };
    return () => socket.close();

    // Option 2: React Query / SWR for polling
    // const { data } = useQuery('agents', fetchAgents, { refetchInterval: 5000 });
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

## Licence

MIT
