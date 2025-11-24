# Agent Hub - Admin Console

A modern React dashboard for monitoring AI agents' performance, costs, and health status.

![Agent Hub Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![Recharts](https://img.shields.io/badge/Recharts-2.10-green)

## Features

- **Overview Dashboard** - Monitor key metrics at a glance
- **Cost Tracking** - Visualise monthly spending by agent with interactive charts
- **Agent Status** - Real-time health monitoring with requests, latency, and uptime metrics
- **Modern UI** - Clean, Apple-inspired design with smooth animations

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Charting library for data visualisation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd RentokilAdmin
   ```

2. Install dependencies:
   ```bash
   cd Frontend
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
RentokilAdmin/
├── README.md
├── .gitignore
├── agent-dashboard.jsx      # Original dashboard component
└── Frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx         # React entry point
        ├── App.jsx          # Root component
        ├── index.css        # Global styles
        └── AgentDashboard.jsx
```

## Available Scripts

From the `Frontend` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Dashboard Sections

### Stats Cards
- **Total Cost** - Aggregate spending across all agents
- **Active Agents** - Number of currently active agents
- **Total Requests** - Combined request count
- **Avg Latency** - Average response time

### Cost Overview Chart
Interactive area chart showing monthly spending trends for each agent with tooltips displaying detailed cost breakdowns.

### Agent Status Table
Real-time monitoring grid displaying:
- Agent name and status indicator
- Request count
- Latency (highlighted in red if >100ms)
- Uptime percentage

## Licence

MIT

