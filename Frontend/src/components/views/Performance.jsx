import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { theme, getStatusColor } from '../../utils/theme';
import { MetricCard } from '../common/MetricCard';
import { ChartTooltip } from '../common/ChartTooltip';

export const Performance = ({ data }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M');
  const { performanceHistory, agents } = data;
  const color = theme.colors.categories.performance;

  return (
    <>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${color}15`,
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
            color: theme.colors.text.primary,
          }}>
            Performance Metrics
          </h1>
        </div>
        <p style={{
          fontSize: '15px',
          color: theme.colors.text.secondary,
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
        <MetricCard label="Avg Latency" value="82ms" change="-12% vs last month" trend="down" color={color} />
        <MetricCard label="Error Rate" value="0.8%" change="-0.4%" trend="down" color={color} />
        <MetricCard label="Tool Success" value="99.2%" change="+0.3%" trend="up" color={color} />
        <MetricCard label="Escalation Rate" value="3.1%" change="-0.8%" trend="down" color={color} />
        <MetricCard label="Output Accuracy" value="96.6%" change="+1.2%" trend="up" color={color} />
        <MetricCard label="Hallucination" value="0.4%" change="-0.2%" trend="down" color={color} />
      </div>

      {/* Latency Chart */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: theme.colors.text.primary }}>
              Latency Trend
            </h2>
            <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: '4px 0 0 0' }}>
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
                  background: selectedTimeRange === range ? theme.colors.text.primary : '#f5f5f7',
                  color: selectedTimeRange === range ? theme.colors.text.inverse : '#6e6e73',
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
            <AreaChart data={performanceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} tickFormatter={(value) => `${value}ms`} dx={-10} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="latency" stroke={color} strokeWidth={2.5} fill="url(#colorLatency)" dot={false} activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '20px',
        padding: '32px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: theme.colors.text.primary }}>
            Agent Performance Breakdown
          </h2>
          <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: '4px 0 0 0' }}>
            Detailed metrics by agent
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {['Agent', 'Latency', 'Error Rate', 'Tool Success', 'Accuracy', 'Hallucination', 'Escalation'].map(header => (
                  <th key={header} style={{ textAlign: header === 'Agent' ? 'left' : 'center', padding: '12px 16px', fontSize: '11px', color: theme.colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: theme.colors.text.primary }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(agent.status) }} />
                      {agent.name}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: parseInt(agent.performance.latency) > 100 ? theme.colors.status.warning : theme.colors.text.primary }}>{agent.performance.latency}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: theme.colors.text.primary }}>{agent.performance.errorRate}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: theme.colors.status.active }}>{agent.performance.successRate}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: theme.colors.text.primary }}>{agent.performance.accuracy}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: parseFloat(agent.performance.hallucination) > 1 ? theme.colors.status.warning : theme.colors.status.active }}>{agent.performance.hallucination}</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: parseFloat(agent.performance.escalation) > 4 ? theme.colors.status.warning : theme.colors.text.primary }}>{agent.performance.escalation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

