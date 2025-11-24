import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { theme, getStatusColor } from '../../utils/theme';
import { MetricCard } from '../common/MetricCard';
import { ChartTooltip } from '../common/ChartTooltip';

export const Costs = ({ data }) => {
  const { costHistory, modelCostBreakdown, agents } = data;
  const color = theme.colors.categories.cost;

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
            ◈
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            margin: 0,
            color: theme.colors.text.primary,
          }}>
            Cost Metrics
          </h1>
        </div>
        <p style={{
          fontSize: '15px',
          color: theme.colors.text.secondary,
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
        <MetricCard label="Total Cost (MTD)" value="$11,400" change="+12% vs last month" trend="up" color={color} />
        <MetricCard label="Token Usage" value="3.9M" change="+8.3%" trend="up" color={color} subtitle="tokens this month" />
        <MetricCard label="Compute Cost" value="$4,200" change="+10%" trend="up" color={color} />
        <MetricCard label="Daily Avg" value="$380" change="+5%" trend="up" color={color} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Cost Trend Chart */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '20px',
          padding: '32px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: theme.colors.text.primary }}>
                Cost Trend
              </h2>
              <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: '4px 0 0 0' }}>
                Monthly spending over time
              </p>
            </div>
          </div>
          
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="totalCost" name="Total Cost" stroke={color} strokeWidth={2.5} fill="url(#colorCost)" dot={false} activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost by Model */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '20px',
          padding: '32px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: theme.colors.text.primary }}>
              Cost by Model
            </h2>
            <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: '4px 0 0 0' }}>
              Breakdown by LLM provider
            </p>
          </div>

          <div style={{ height: '180px', marginBottom: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelCostBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="cost"
                >
                  {modelCostBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            {modelCostBreakdown.map((model) => (
              <div key={model.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: model.color }} />
                  <span style={{ fontSize: '12px', color: '#6e6e73' }}>{model.name}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: theme.colors.text.primary }}>${model.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Cost Table */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '20px',
        padding: '32px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: theme.colors.text.primary }}>
            Agent Cost Breakdown
          </h2>
          <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: '4px 0 0 0' }}>
            Daily costs and token usage by agent
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {agents.map((agent) => (
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
                  <div style={{ fontSize: '15px', fontWeight: '600', color: theme.colors.text.primary }}>{agent.name}</div>
                  <div style={{ fontSize: '12px', color: theme.colors.text.secondary, marginTop: '2px' }}>{agent.cost.model}</div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.text.primary }}>{agent.cost.daily}</div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary, marginTop: '2px' }}>Daily cost</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.text.primary }}>{agent.cost.tokens}</div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary, marginTop: '2px' }}>Tokens/day</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: agent.status === 'active' ? '#f0fdf4' : '#fffdf5',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: agent.status === 'active' ? theme.colors.status.active : theme.colors.status.warning,
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
};

