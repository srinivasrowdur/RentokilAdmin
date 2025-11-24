/**
 * Simulated backend data for the Agentic Factory dashboard.
 * In production, this would come from a REST API or WebSocket.
 * 
 * Structure:
 * - Summary data: Pre-computed aggregates for dashboard cards
 * - Time series: Historical data for charts
 * - Agent metrics: Per-agent breakdown data
 */

// =============================================================================
// SUMMARY DATA (Pre-computed by backend/webservice)
// =============================================================================

export const performanceSummary = {
  avgLatency: { value: '82ms', change: '-12%', trend: 'down' },
  errorRate: { value: '0.8%', change: '-0.4%', trend: 'down' },
  toolSuccess: { value: '99.2%', change: '+0.3%', trend: 'up' },
  escalationRate: { value: '3.1%', change: '-0.8%', trend: 'down' },
  outputAccuracy: { value: '96.6%', change: '+1.2%', trend: 'up' },
  hallucination: { value: '0.4%', change: '-0.2%', trend: 'down' },
};

export const complianceSummary = {
  privacy: { value: 98.5, target: 99, status: 'good' },
  security: { value: 94.2, target: 95, status: 'warning' },
  biasDetection: { value: 2.1, target: 5, status: 'good', inverse: true },
  explainability: { value: 87.3, target: 90, status: 'warning' },
  // GDPR checklist items
  gdprChecklist: [
    { label: 'Data anonymisation', status: 'Active', isActive: true },
    { label: 'Consent verification', status: 'Active', isActive: true },
    { label: 'Right to erasure', status: 'Active', isActive: true },
    { label: 'Data portability', status: 'Partial', isActive: false },
  ],
  // Security controls
  securityControls: [
    { label: 'Input validation', status: '100%', isActive: true },
    { label: 'Output filtering', status: '98%', isActive: true },
    { label: 'Prompt injection defence', status: '89%', isActive: false },
    { label: 'Rate limiting', status: '90%', isActive: false },
  ],
};

export const costSummary = {
  totalCost: { value: '$11,400', change: '+12%', trend: 'up' },
  tokenUsage: { value: '3.9M', change: '+8.3%', trend: 'up', subtitle: 'tokens this month' },
  computeCost: { value: '$4,200', change: '+10%', trend: 'up' },
  dailyAvg: { value: '$380', change: '+5%', trend: 'up' },
};

// =============================================================================
// TIME SERIES DATA (For charts)
// =============================================================================

export const performanceData = [
  { month: 'Jan', latency: 120, errorRate: 2.1, successRate: 97.9, hallucination: 1.2 },
  { month: 'Feb', latency: 115, errorRate: 1.8, successRate: 98.2, hallucination: 1.0 },
  { month: 'Mar', latency: 108, errorRate: 1.5, successRate: 98.5, hallucination: 0.9 },
  { month: 'Apr', latency: 95, errorRate: 1.2, successRate: 98.8, hallucination: 0.7 },
  { month: 'May', latency: 88, errorRate: 1.0, successRate: 99.0, hallucination: 0.5 },
  { month: 'Jun', latency: 82, errorRate: 0.8, successRate: 99.2, hallucination: 0.4 },
];

export const costData = [
  { month: 'Jan', totalCost: 8400, tokens: 2.4, compute: 3200, storage: 1800 },
  { month: 'Feb', totalCost: 9100, tokens: 2.8, compute: 3400, storage: 1900 },
  { month: 'Mar', totalCost: 9800, tokens: 3.1, compute: 3600, storage: 2100 },
  { month: 'Apr', totalCost: 10200, tokens: 3.4, compute: 3800, storage: 2000 },
  { month: 'May', totalCost: 10800, tokens: 3.6, compute: 4000, storage: 2200 },
  { month: 'Jun', totalCost: 11400, tokens: 3.9, compute: 4200, storage: 2400 },
];

// =============================================================================
// MODEL COST BREAKDOWN (For pie chart)
// =============================================================================

export const modelCosts = [
  { name: 'Claude Sonnet', cost: 4200, color: '#DC2626' },
  { name: 'GPT-4o', cost: 3100, color: '#3B82F6' },
  { name: 'Gemini 2.5 Pro', cost: 2400, color: '#22C55E' },
  { name: 'Embedding Models', cost: 1700, color: '#F59E0B' },
];

// =============================================================================
// AGENT METRICS (Per-agent breakdown)
// =============================================================================

export const agentMetrics = [
  { 
    id: 1, 
    name: 'Document Processor', 
    status: 'active',
    performance: { 
      latency: '45ms', 
      errorRate: '0.3%', 
      successRate: '99.7%', 
      accuracy: '98.2%', 
      hallucination: '0.2%', 
      escalation: '1.2%' 
    },
    compliance: { 
      privacy: 99.1, 
      security: 96.2, 
      bias: 1.1, 
      explainability: 91.2 
    },
    cost: { 
      daily: '$142', 
      tokens: '1.2M', 
      model: 'Claude Sonnet' 
    }
  },
  { 
    id: 2, 
    name: 'Customer Support', 
    status: 'active',
    performance: { 
      latency: '62ms', 
      errorRate: '0.8%', 
      successRate: '99.2%', 
      accuracy: '96.8%', 
      hallucination: '0.5%', 
      escalation: '3.4%' 
    },
    compliance: { 
      privacy: 98.8, 
      security: 94.1, 
      bias: 2.3, 
      explainability: 88.4 
    },
    cost: { 
      daily: '$98', 
      tokens: '0.8M', 
      model: 'GPT-4o' 
    }
  },
  { 
    id: 3, 
    name: 'Data Analyst', 
    status: 'warning',
    performance: { 
      latency: '128ms', 
      errorRate: '1.5%', 
      successRate: '98.5%', 
      accuracy: '94.1%', 
      hallucination: '1.2%', 
      escalation: '5.8%' 
    },
    compliance: { 
      privacy: 97.2, 
      security: 92.8, 
      bias: 3.1, 
      explainability: 82.1 
    },
    cost: { 
      daily: '$186', 
      tokens: '1.8M', 
      model: 'Gemini 2.5 Pro' 
    }
  },
  { 
    id: 4, 
    name: 'Code Assistant', 
    status: 'active',
    performance: { 
      latency: '78ms', 
      errorRate: '0.5%', 
      successRate: '99.5%', 
      accuracy: '97.4%', 
      hallucination: '0.3%', 
      escalation: '2.1%' 
    },
    compliance: { 
      privacy: 99.4, 
      security: 95.8, 
      bias: 0.8, 
      explainability: 93.6 
    },
    cost: { 
      daily: '$124', 
      tokens: '1.1M', 
      model: 'Claude Sonnet' 
    }
  },
];
