import React, { useState } from 'react';
import { theme, getStatusColor } from '../../utils/theme';
import { CategoryCard } from '../common/CategoryCard';

/**
 * Overview View
 * 
 * Displays a high-level summary of all three metric categories
 * with clickable cards that navigate to detailed views.
 */
export const Overview = ({ data, onNavigate }) => {
  const [hoveredAgent, setHoveredAgent] = useState(null);
  const { agents, summaries } = data;
  const { performance, compliance, cost } = summaries;

  return (
    <>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          letterSpacing: '-0.03em',
          margin: 0,
          color: theme.colors.text.primary,
        }}>
          Factory Overview
        </h1>
        <p style={{
          fontSize: '15px',
          color: theme.colors.text.secondary,
          margin: '8px 0 0 0',
          letterSpacing: '-0.01em',
        }}>
          Monitor performance, compliance, and costs across all agents
        </p>
      </header>

      {/* Category Summary Cards - Data from summaries */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '32px',
      }}>
        <CategoryCard
          title="Performance"
          color={theme.colors.categories.performance}
          icon="⚡"
          onClick={() => onNavigate('performance')}
          metrics={[
            { label: 'Avg Latency', value: performance.avgLatency.value, trend: performance.avgLatency.change, status: 'good' },
            { label: 'Error Rate', value: performance.errorRate.value, trend: performance.errorRate.change, status: 'good' },
            { label: 'Tool Success', value: performance.toolSuccess.value, trend: performance.toolSuccess.change, status: 'good' },
            { label: 'Hallucination', value: performance.hallucination.value, trend: performance.hallucination.change, status: 'good' },
          ]}
        />
        <CategoryCard
          title="Compliance"
          color={theme.colors.categories.compliance}
          icon="🛡"
          onClick={() => onNavigate('compliance')}
          metrics={[
            { label: 'Privacy', value: `${compliance.privacy.value}%`, status: compliance.privacy.status },
            { label: 'Security', value: `${compliance.security.value}%`, status: compliance.security.status },
            { label: 'Bias Detection', value: `${compliance.biasDetection.value}%`, status: compliance.biasDetection.status },
            { label: 'Explainability', value: `${compliance.explainability.value}%`, status: compliance.explainability.status },
          ]}
        />
        <CategoryCard
          title="Costs"
          color={theme.colors.categories.cost}
          icon="◈"
          onClick={() => onNavigate('costs')}
          metrics={[
            { label: 'Total Cost (MTD)', value: cost.totalCost.value, trend: cost.totalCost.change },
            { label: 'Token Usage', value: cost.tokenUsage.value, trend: cost.tokenUsage.change },
            { label: 'Compute', value: cost.computeCost.value },
            { label: 'Daily Avg', value: cost.dailyAvg.value },
          ]}
        />
      </div>

      {/* Agent Status Section */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '20px',
        padding: '32px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            margin: 0,
            color: theme.colors.text.primary,
          }}>
            Agent Status
          </h2>
          <p style={{
            fontSize: '13px',
            color: theme.colors.text.secondary,
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
            color: theme.colors.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: '600',
          }}>
            <div>Agent</div>
            <div style={{ textAlign: 'center', color: theme.colors.categories.performance }}>Performance</div>
            <div style={{ textAlign: 'center', color: theme.colors.categories.compliance }}>Compliance</div>
            <div style={{ textAlign: 'center', color: theme.colors.categories.cost }}>Cost</div>
            <div></div>
          </div>

          {agents.map((agent) => (
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
                  boxShadow: agent.status === 'active' ? theme.shadows.glow(getStatusColor(agent.status)) : 'none',
                }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: theme.colors.text.primary, letterSpacing: '-0.01em' }}>
                    {agent.name}
                  </div>
                  <div style={{ fontSize: '12px', color: theme.colors.text.secondary, textTransform: 'capitalize', marginTop: '2px' }}>
                    {agent.status}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: theme.colors.text.primary }}>
                  {agent.performance.latency}
                </div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary, marginTop: '2px' }}>
                  {agent.performance.successRate} success
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: agent.compliance.security < 95 ? theme.colors.status.warning : theme.colors.text.primary 
                }}>
                  {agent.compliance.privacy}%
                </div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary, marginTop: '2px' }}>
                  Privacy compliant
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: theme.colors.text.primary }}>
                  {agent.cost.daily}
                </div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary, marginTop: '2px' }}>
                  {agent.cost.tokens} tokens
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <button style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.borderHover}`,
                  background: hoveredAgent === agent.id ? theme.colors.text.primary : theme.colors.surface,
                  color: hoveredAgent === agent.id ? theme.colors.text.inverse : theme.colors.text.primary,
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
};
