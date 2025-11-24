import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Performance data over time
const performanceData = [
  { month: 'Jan', latency: 120, errorRate: 2.1, successRate: 97.9, hallucination: 1.2 },
  { month: 'Feb', latency: 115, errorRate: 1.8, successRate: 98.2, hallucination: 1.0 },
  { month: 'Mar', latency: 108, errorRate: 1.5, successRate: 98.5, hallucination: 0.9 },
  { month: 'Apr', latency: 95, errorRate: 1.2, successRate: 98.8, hallucination: 0.7 },
  { month: 'May', latency: 88, errorRate: 1.0, successRate: 99.0, hallucination: 0.5 },
  { month: 'Jun', latency: 82, errorRate: 0.8, successRate: 99.2, hallucination: 0.4 },
];

// Cost data over time
const costData = [
  { month: 'Jan', totalCost: 8400, tokens: 2.4, compute: 3200, storage: 1800 },
  { month: 'Feb', totalCost: 9100, tokens: 2.8, compute: 3400, storage: 1900 },
  { month: 'Mar', totalCost: 9800, tokens: 3.1, compute: 3600, storage: 2100 },
  { month: 'Apr', totalCost: 10200, tokens: 3.4, compute: 3800, storage: 2000 },
  { month: 'May', totalCost: 10800, tokens: 3.6, compute: 4000, storage: 2200 },
  { month: 'Jun', totalCost: 11400, tokens: 3.9, compute: 4200, storage: 2400 },
];

// Cost by model breakdown
const modelCosts = [
  { name: 'Claude Sonnet', cost: 4200, color: '#DC2626' },
  { name: 'GPT-4o', cost: 3100, color: '#3B82F6' },
  { name: 'Gemini 2.5 Pro', cost: 2400, color: '#22C55E' },
  { name: 'Embedding Models', cost: 1700, color: '#F59E0B' },
];

// Compliance metrics
const complianceMetrics = [
  { name: 'Privacy Compliance', value: 98.5, target: 99, status: 'good' },
  { name: 'Security Controls', value: 94.2, target: 95, status: 'warning' },
  { name: 'Bias Detection', value: 2.1, target: 5, status: 'good', inverse: true },
  { name: 'Explainability', value: 87.3, target: 90, status: 'warning' },
];

// Agent performance comparison
const agentMetrics = [
  { 
    id: 1, 
    name: 'Document Processor', 
    status: 'active',
    performance: { latency: '45ms', errorRate: '0.3%', successRate: '99.7%', accuracy: '98.2%', hallucination: '0.2%', escalation: '1.2%' },
    compliance: { privacy: 99.1, security: 96.2, bias: 1.1, explainability: 91.2 },
    cost: { daily: '$142', tokens: '1.2M', model: 'Claude Sonnet' }
  },
  { 
    id: 2, 
    name: 'Customer Support', 
    status: 'active',
    performance: { latency: '62ms', errorRate: '0.8%', successRate: '99.2%', accuracy: '96.8%', hallucination: '0.5%', escalation: '3.4%' },
    compliance: { privacy: 98.8, security: 94.1, bias: 2.3, explainability: 88.4 },
    cost: { daily: '$98', tokens: '0.8M', model: 'GPT-4o' }
  },
  { 
    id: 3, 
    name: 'Data Analyst', 
    status: 'warning',
    performance: { latency: '128ms', errorRate: '1.5%', successRate: '98.5%', accuracy: '94.1%', hallucination: '1.2%', escalation: '5.8%' },
    compliance: { privacy: 97.2, security: 92.8, bias: 3.1, explainability: 82.1 },
    cost: { daily: '$186', tokens: '1.8M', model: 'Gemini 2.5 Pro' }
  },
  { 
    id: 4, 
    name: 'Code Assistant', 
    status: 'active',
    performance: { latency: '78ms', errorRate: '0.5%', successRate: '99.5%', accuracy: '97.4%', hallucination: '0.3%', escalation: '2.1%' },
    compliance: { privacy: 99.4, security: 95.8, bias: 0.8, explainability: 93.6 },
    cost: { daily: '$124', tokens: '1.1M', model: 'Claude Sonnet' }
  },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: '◉' },
  { id: 'performance', label: 'Performance', icon: '⚡' },
  { id: 'compliance', label: 'Compliance', icon: '🛡' },
  { id: 'costs', label: 'Costs', icon: '◈' },
  { id: 'settings', label: 'Settings', icon: '◇' },
];

// Category colours
const categoryColors = {
  performance: '#3B82F6',
  compliance: '#22C55E',
  cost: '#F59E0B',
};

export default function AgentDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [hoveredAgent, setHoveredAgent] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'warning': return '#F59E0B';
      case 'inactive': return '#9ca3af';
      default: return '#9ca3af';
    }
  };

  const getComplianceStatus = (value, target, inverse = false) => {
    if (inverse) {
      return value <= target ? 'good' : 'warning';
    }
    return value >= target ? 'good' : 'warning';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
          backdropFilter: 'blur(20px)',
        }}>
          <p style={{ 
            margin: '0 0 12px 0', 
            fontWeight: '600', 
            color: '#1d1d1f',
            fontSize: '13px',
            letterSpacing: '-0.01em'
          }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '6px 0', 
              color: entry.color,
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.includes('Cost') ? `$${entry.value.toLocaleString()}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Metric Card Component
  const MetricCard = ({ label, value, change, trend, color, subtitle }) => (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        fontSize: '12px',
        color: '#86868b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: '500',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {color && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />}
        {label}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: '600',
        letterSpacing: '-0.03em',
        color: '#1d1d1f',
        marginBottom: '4px',
      }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '12px', color: '#86868b', marginBottom: '4px' }}>
          {subtitle}
        </div>
      )}
      {change && (
        <div style={{
          fontSize: '12px',
          fontWeight: '500',
          color: trend === 'up' ? '#22c55e' : trend === 'down' ? '#DC2626' : '#86868b',
        }}>
          {change}
        </div>
      )}
    </div>
  );

  // Category Summary Card
  const CategoryCard = ({ title, color, metrics, icon }) => (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`;
        e.currentTarget.style.borderColor = `${color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
      }}
      onClick={() => setActiveNav(title.toLowerCase())}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
        }}>
          {icon}
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1d1d1f',
          letterSpacing: '-0.02em',
        }}>
          {title}
        </div>
      </div>
      <div style={{ display: 'grid', gap: '16px' }}>
        {metrics.map((metric, idx) => (
          <div key={idx} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '13px', color: '#6e6e73' }}>{metric.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: metric.status === 'good' ? '#22c55e' : metric.status === 'warning' ? '#F59E0B' : '#1d1d1f' 
              }}>
                {metric.value}
              </span>
              {metric.trend && (
                <span style={{ 
                  fontSize: '11px', 
                  color: metric.trend.startsWith('+') ? '#22c55e' : metric.trend.startsWith('-') ? '#DC2626' : '#86868b' 
                }}>
                  {metric.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Gauge Component for compliance
  const GaugeChart = ({ value, target, label, color, inverse = false }) => {
    const percentage = Math.min(100, Math.max(0, value));
    const isGood = inverse ? value <= target : value >= target;
    const gaugeColor = isGood ? '#22c55e' : '#F59E0B';
    
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '120px', height: '60px', margin: '0 auto', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `conic-gradient(${gaugeColor} 0deg, ${gaugeColor} ${percentage * 1.8}deg, #f0f0f0 ${percentage * 1.8}deg, #f0f0f0 180deg, transparent 180deg)`,
            transform: 'rotate(-90deg)',
          }} />
          <div style={{
            position: 'absolute',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: '#fff',
            top: '15px',
            left: '15px',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20px',
            fontWeight: '600',
            color: '#1d1d1f',
          }}>
            {value}{inverse ? '%' : '%'}
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#86868b', marginTop: '8px' }}>{label}</div>
        <div style={{ fontSize: '11px', color: '#aeaeb2', marginTop: '2px' }}>Target: {target}%</div>
      </div>
    );
  };

  // Render Overview Section
  const renderOverview = () => (
    <>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          letterSpacing: '-0.03em',
          margin: 0,
          color: '#1d1d1f',
        }}>
          Factory Overview
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#86868b',
          margin: '8px 0 0 0',
          letterSpacing: '-0.01em',
        }}>
          Monitor performance, compliance, and costs across all agents
        </p>
      </header>

      {/* Category Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '32px',
      }}>
        <CategoryCard
          title="Performance"
          color={categoryColors.performance}
          icon="⚡"
          metrics={[
            { label: 'Avg Latency', value: '82ms', trend: '-12%', status: 'good' },
            { label: 'Error Rate', value: '0.8%', trend: '-0.4%', status: 'good' },
            { label: 'Tool Success', value: '99.2%', trend: '+0.3%', status: 'good' },
            { label: 'Hallucination', value: '0.4%', trend: '-0.2%', status: 'good' },
          ]}
        />
        <CategoryCard
          title="Compliance"
          color={categoryColors.compliance}
          icon="🛡"
          metrics={[
            { label: 'Privacy', value: '98.5%', status: 'good' },
            { label: 'Security', value: '94.2%', status: 'warning' },
            { label: 'Bias Detection', value: '2.1%', status: 'good' },
            { label: 'Explainability', value: '87.3%', status: 'warning' },
          ]}
        />
        <CategoryCard
          title="Costs"
          color={categoryColors.cost}
          icon="◈"
          metrics={[
            { label: 'Total Cost (MTD)', value: '$11,400', trend: '+12%' },
            { label: 'Token Usage', value: '3.9M', trend: '+8%' },
            { label: 'Compute', value: '$4,200' },
            { label: 'Storage', value: '$2,400' },
          ]}
        />
      </div>

      {/* Agent Status Section */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#1d1d1f',
          }}>
            Agent Status
          </h2>
          <p style={{
            fontSize: '13px',
            color: '#86868b',
            margin: '4px 0 0 0',
          }}>
            Real-time health across all metrics
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {/* Header Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(3, 1fr) 80px',
            padding: '12px 24px',
            fontSize: '11px',
            color: '#86868b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: '600',
          }}>
            <div>Agent</div>
            <div style={{ textAlign: 'center', color: categoryColors.performance }}>Performance</div>
            <div style={{ textAlign: 'center', color: categoryColors.compliance }}>Compliance</div>
            <div style={{ textAlign: 'center', color: categoryColors.cost }}>Cost</div>
            <div></div>
          </div>

          {agentMetrics.map((agent) => (
            <div
              key={agent.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr repeat(3, 1fr) 80px',
                alignItems: 'center',
                padding: '20px 24px',
                borderRadius: '14px',
                background: hoveredAgent === agent.id ? 'rgba(0, 0, 0, 0.02)' : '#fafafa',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: getStatusColor(agent.status),
                  boxShadow: agent.status === 'active' ? `0 0 12px ${getStatusColor(agent.status)}40` : 'none',
                }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
                    {agent.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#86868b', textTransform: 'capitalize', marginTop: '2px' }}>
                    {agent.status}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1d1d1f' }}>
                  {agent.performance.latency}
                </div>
                <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                  {agent.performance.successRate} success
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: agent.compliance.security < 95 ? '#F59E0B' : '#1d1d1f' 
                }}>
                  {agent.compliance.privacy}%
                </div>
                <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                  Privacy compliant
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1d1d1f' }}>
                  {agent.cost.daily}
                </div>
                <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                  {agent.cost.tokens} tokens
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <button style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: hoveredAgent === agent.id ? '#1d1d1f' : '#ffffff',
                  color: hoveredAgent === agent.id ? '#ffffff' : '#1d1d1f',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // Render Performance Section
  const renderPerformance = () => (
    <>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${categoryColors.performance}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#1d1d1f',
          }}>
            Performance Metrics
          </h1>
        </div>
        <p style={{
          fontSize: '15px',
          color: '#86868b',
          margin: '0',
          letterSpacing: '-0.01em',
        }}>
          Monitor latency, error rates, and output quality
        </p>
      </header>

      {/* Performance Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <MetricCard label="Avg Latency" value="82ms" change="-12% vs last month" trend="down" color={categoryColors.performance} />
        <MetricCard label="Error Rate" value="0.8%" change="-0.4%" trend="down" color={categoryColors.performance} />
        <MetricCard label="Tool Success" value="99.2%" change="+0.3%" trend="up" color={categoryColors.performance} />
        <MetricCard label="Escalation Rate" value="3.1%" change="-0.8%" trend="down" color={categoryColors.performance} />
        <MetricCard label="Output Accuracy" value="96.6%" change="+1.2%" trend="up" color={categoryColors.performance} />
        <MetricCard label="Hallucination" value="0.4%" change="-0.2%" trend="down" color={categoryColors.performance} />
      </div>

      {/* Latency Chart */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
              Latency Trend
            </h2>
            <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>
              Average response time over the past 6 months
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['1M', '3M', '6M', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: selectedTimeRange === range ? '#1d1d1f' : '#f5f5f7',
                  color: selectedTimeRange === range ? '#ffffff' : '#6e6e73',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={categoryColors.performance} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={categoryColors.performance} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} tickFormatter={(value) => `${value}ms`} dx={-10} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="latency" stroke={categoryColors.performance} strokeWidth={2.5} fill="url(#colorLatency)" dot={false} activeDot={{ r: 5, fill: categoryColors.performance, stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
            Agent Performance Breakdown
          </h2>
          <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>
            Detailed metrics by agent
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Agent</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Latency</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Error Rate</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Tool Success</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Accuracy</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Hallucination</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Escalation</th>
              </tr>
            </thead>
            <tbody>
              {agentMetrics.map((agent) => (
                <tr key={agent.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#1d1d1f' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(agent.status) }} />
                      {agent.name}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: parseInt(agent.performance.latency) > 100 ? '#F59E0B' : '#1d1d1f' }}>{agent.performance.latency}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: '#1d1d1f' }}>{agent.performance.errorRate}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: '#22c55e' }}>{agent.performance.successRate}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: '#1d1d1f' }}>{agent.performance.accuracy}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: parseFloat(agent.performance.hallucination) > 1 ? '#F59E0B' : '#22c55e' }}>{agent.performance.hallucination}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: parseFloat(agent.performance.escalation) > 4 ? '#F59E0B' : '#1d1d1f' }}>{agent.performance.escalation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Render Compliance Section
  const renderCompliance = () => (
    <>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${categoryColors.compliance}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>
            🛡
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#1d1d1f',
          }}>
            Compliance Metrics
          </h1>
        </div>
        <p style={{
          fontSize: '15px',
          color: '#86868b',
          margin: '0',
          letterSpacing: '-0.01em',
        }}>
          Monitor privacy, security, bias, and explainability
        </p>
      </header>

      {/* Compliance Gauges */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
            Compliance Overview
          </h2>
          <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>
            Current compliance status against targets
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          <GaugeChart value={98.5} target={99} label="Privacy Compliance" color={categoryColors.compliance} />
          <GaugeChart value={94.2} target={95} label="Security Controls" color={categoryColors.compliance} />
          <GaugeChart value={2.1} target={5} label="Bias Detection Rate" color={categoryColors.compliance} inverse />
          <GaugeChart value={87.3} target={90} label="Explainability" color={categoryColors.compliance} />
        </div>
      </div>

      {/* Compliance Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {/* Privacy Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', margin: '0 0 20px 0' }}>
            Privacy Compliance (GDPR)
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fdf8', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Data anonymisation</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>✓ Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fdf8', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Consent verification</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>✓ Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fdf8', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Right to erasure</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>✓ Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#fffdf5', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Data portability</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F59E0B' }}>⚠ Partial</span>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', margin: '0 0 20px 0' }}>
            Security Control Coverage
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fdf8', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Input validation</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>✓ 100%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fdf8', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Output filtering</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>✓ 98%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#fffdf5', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Prompt injection defence</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F59E0B' }}>⚠ 89%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#fffdf5', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73' }}>Rate limiting</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F59E0B' }}>⚠ 90%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Compliance Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
            Agent Compliance Breakdown
          </h2>
          <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>
            Compliance metrics by agent
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Agent</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Privacy</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Security</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Bias Rate</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Explainability</th>
              </tr>
            </thead>
            <tbody>
              {agentMetrics.map((agent) => (
                <tr key={agent.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#1d1d1f' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(agent.status) }} />
                      {agent.name}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.privacy >= 99 ? '#22c55e' : '#1d1d1f' }}>{agent.compliance.privacy}%</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.security >= 95 ? '#22c55e' : '#F59E0B' }}>{agent.compliance.security}%</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.bias <= 2 ? '#22c55e' : '#F59E0B' }}>{agent.compliance.bias}%</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.explainability >= 90 ? '#22c55e' : '#F59E0B' }}>{agent.compliance.explainability}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Render Costs Section
  const renderCosts = () => (
    <>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${categoryColors.cost}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>
            ◈
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#1d1d1f',
          }}>
            Cost Metrics
          </h1>
        </div>
        <p style={{
          fontSize: '15px',
          color: '#86868b',
          margin: '0',
          letterSpacing: '-0.01em',
        }}>
          Track spending, token usage, and cost breakdown by model
        </p>
      </header>

      {/* Cost Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <MetricCard label="Total Cost (MTD)" value="$11,400" change="+12% vs last month" trend="up" color={categoryColors.cost} />
        <MetricCard label="Token Usage" value="3.9M" change="+8.3%" trend="up" color={categoryColors.cost} subtitle="tokens this month" />
        <MetricCard label="Compute Cost" value="$4,200" change="+10%" trend="up" color={categoryColors.cost} />
        <MetricCard label="Daily Avg" value="$380" change="+5%" trend="up" color={categoryColors.cost} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Cost Trend Chart */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
                Cost Trend
              </h2>
              <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>
                Monthly spending over time
              </p>
            </div>
          </div>
          
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={categoryColors.cost} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={categoryColors.cost} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="totalCost" name="Total Cost" stroke={categoryColors.cost} strokeWidth={2.5} fill="url(#colorCost)" dot={false} activeDot={{ r: 5, fill: categoryColors.cost, stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost by Model */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
              Cost by Model
            </h2>
            <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>
              Breakdown by LLM provider
            </p>
          </div>

          <div style={{ height: '180px', marginBottom: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelCosts}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="cost"
                >
                  {modelCosts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            {modelCosts.map((model) => (
              <div key={model.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: model.color }} />
                  <span style={{ fontSize: '12px', color: '#6e6e73' }}>{model.name}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#1d1d1f' }}>${model.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Cost Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
            Agent Cost Breakdown
          </h2>
          <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>
            Daily costs and token usage by agent
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {agentMetrics.map((agent) => (
            <div
              key={agent.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
                alignItems: 'center',
                padding: '20px 24px',
                borderRadius: '14px',
                background: '#fafafa',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: getStatusColor(agent.status),
                }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#1d1d1f' }}>{agent.name}</div>
                  <div style={{ fontSize: '12px', color: '#86868b', marginTop: '2px' }}>{agent.cost.model}</div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f' }}>{agent.cost.daily}</div>
                <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>Daily cost</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f' }}>{agent.cost.tokens}</div>
                <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>Tokens/day</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: agent.status === 'active' ? '#f0fdf4' : '#fffdf5',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: agent.status === 'active' ? '#22c55e' : '#F59E0B',
                }}>
                  {agent.status === 'active' ? 'On budget' : 'Review'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // Render Settings Section
  const renderSettings = () => (
    <>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          letterSpacing: '-0.03em',
          margin: 0,
          color: '#1d1d1f',
        }}>
          Settings
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#86868b',
          margin: '8px 0 0 0',
          letterSpacing: '-0.01em',
        }}>
          Configure your Agentic Factory preferences
        </p>
      </header>

      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}>
        <p style={{ color: '#86868b', fontSize: '14px' }}>Settings panel coming soon...</p>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeNav) {
      case 'overview': return renderOverview();
      case 'performance': return renderPerformance();
      case 'compliance': return renderCompliance();
      case 'costs': return renderCosts();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#fbfbfd',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
      color: '#1d1d1f',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#ffffff',
        borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: '0 28px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
          }}>
            A
          </div>
          <div>
            <div style={{
              fontSize: '17px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: '#1d1d1f',
            }}>
              Agentic Factory
            </div>
            <div style={{
              fontSize: '11px',
              color: '#86868b',
              letterSpacing: '0.01em',
              marginTop: '1px',
            }}>
              Admin Console
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 16px' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '10px',
                background: activeNav === item.id ? 'rgba(220, 38, 38, 0.08)' : 'transparent',
                color: activeNav === item.id ? '#DC2626' : '#6e6e73',
                fontSize: '14px',
                fontWeight: activeNav === item.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '4px',
                textAlign: 'left',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ 
                fontSize: '16px',
                opacity: activeNav === item.id ? 1 : 0.7,
              }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#6e6e73',
          }}>
            S
          </div>
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#1d1d1f',
              letterSpacing: '-0.01em',
            }}>
              Srini
            </div>
            <div style={{
              fontSize: '11px',
              color: '#86868b',
            }}>
              Administrator
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '40px 48px',
      }}>
        {renderContent()}
      </main>
    </div>
  );
}
