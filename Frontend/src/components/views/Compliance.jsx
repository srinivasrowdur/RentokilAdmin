import React from 'react';
import { theme, getStatusColor } from '../../utils/theme';
import { GaugeChart } from '../common/GaugeChart';

/**
 * Compliance View
 * 
 * Displays compliance metrics including:
 * - Summary gauges for key compliance areas
 * - GDPR checklist status
 * - Security control coverage
 * - Per-agent compliance breakdown table
 */
export const Compliance = ({ data }) => {
  const { agents, summaries } = data;
  const summary = summaries.compliance;
  const color = theme.colors.categories.compliance;

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
            🛡
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            margin: 0,
            color: theme.colors.text.primary,
          }}>
            Compliance Metrics
          </h1>
        </div>
        <p style={{
          fontSize: '15px',
          color: theme.colors.text.secondary,
          margin: '0',
          letterSpacing: '-0.01em',
        }}>
          Monitor privacy, security, bias, and explainability
        </p>
      </header>

      {/* Compliance Gauges - Data from summaries */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: theme.colors.text.primary }}>
            Compliance Overview
          </h2>
          <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: '4px 0 0 0' }}>
            Current compliance status against targets
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          <GaugeChart value={summary.privacy.value} target={summary.privacy.target} label="Privacy Compliance" color={color} />
          <GaugeChart value={summary.security.value} target={summary.security.target} label="Security Controls" color={color} />
          <GaugeChart value={summary.biasDetection.value} target={summary.biasDetection.target} label="Bias Detection Rate" color={color} inverse={summary.biasDetection.inverse} />
          <GaugeChart value={summary.explainability.value} target={summary.explainability.target} label="Explainability" color={color} />
        </div>
      </div>

      {/* Compliance Details - Data from summaries */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {/* Privacy Card */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '20px',
          padding: '28px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.text.primary, margin: '0 0 20px 0' }}>
            Privacy Compliance (GDPR)
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {summary.gdprChecklist.map((item, i) => {
              const itemColor = item.isActive ? theme.colors.status.active : theme.colors.status.warning;
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: `${itemColor}10`, borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#6e6e73' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: itemColor }}>
                    {item.isActive ? '✓' : '⚠'} {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Card */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '20px',
          padding: '28px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.text.primary, margin: '0 0 20px 0' }}>
            Security Control Coverage
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {summary.securityControls.map((item, i) => {
              const itemColor = item.isActive ? theme.colors.status.active : theme.colors.status.warning;
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: `${itemColor}10`, borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#6e6e73' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: itemColor }}>
                    {item.isActive ? '✓' : '⚠'} {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Agent Compliance Table */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '20px',
        padding: '32px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: theme.colors.text.primary }}>
            Agent Compliance Breakdown
          </h2>
          <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: '4px 0 0 0' }}>
            Compliance metrics by agent
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {['Agent', 'Privacy', 'Security', 'Bias Rate', 'Explainability'].map(header => (
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
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.privacy >= 99 ? theme.colors.status.active : theme.colors.text.primary }}>{agent.compliance.privacy}%</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.security >= 95 ? theme.colors.status.active : theme.colors.status.warning }}>{agent.compliance.security}%</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.bias <= 2 ? theme.colors.status.active : theme.colors.status.warning }}>{agent.compliance.bias}%</td>
                  <td style={{ textAlign: 'center', padding: '16px', fontSize: '14px', color: agent.compliance.explainability >= 90 ? theme.colors.status.active : theme.colors.status.warning }}>{agent.compliance.explainability}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
