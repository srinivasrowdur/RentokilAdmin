import React, { useState } from 'react';
import { theme, getStatusColor } from '../../utils/theme';
import { CategoryCard } from '../common/CategoryCard';

export const Overview = ({ data, onNavigate }) => {
  const [hoveredAgent, setHoveredAgent] = useState(null);
  const { agents } = data;

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

      {/* Category Summary Cards */}
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
            { label: 'Avg Latency', value: '82ms', trend: '-12%', status: 'good' },
            { label: 'Error Rate', value: '0.8%', trend: '-0.4%', status: 'good' },
            { label: 'Tool Success', value: '99.2%', trend: '+0.3%', status: 'good' },
            { label: 'Hallucination', value: '0.4%', trend: '-0.2%', status: 'good' },
          ]}
        />
        <CategoryCard
          title="Compliance"
          color={theme.colors.categories.compliance}
          icon="🛡"
          onClick={() => onNavigate('compliance')}
          metrics={[
            { label: 'Privacy', value: '98.5%', status: 'good' },
            { label: 'Security', value: '94.2%', status: 'warning' },
            { label: 'Bias Detection', value: '2.1%', status: 'good' },
            { label: 'Explainability', value: '87.3%', status: 'warning' },
          ]}
        />
        <CategoryCard
          title="Costs"
          color={theme.colors.categories.cost}
          icon="◈"
          onClick={() => onNavigate('costs')}
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

