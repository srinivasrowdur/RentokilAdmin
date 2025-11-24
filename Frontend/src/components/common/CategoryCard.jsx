import React from 'react';
import { theme } from '../../utils/theme';

export const CategoryCard = ({ title, color, metrics, icon, onClick }) => (
  <div
    style={{
      background: theme.colors.surface,
      borderRadius: '20px',
      padding: '28px',
      border: `1px solid ${theme.colors.border}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = theme.shadows.glow(color);
      e.currentTarget.style.borderColor = `${color}30`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = theme.colors.border;
    }}
    onClick={onClick}
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
        color: theme.colors.text.primary,
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
              color: metric.status === 'good' ? theme.colors.status.active : metric.status === 'warning' ? theme.colors.status.warning : theme.colors.text.primary 
            }}>
              {metric.value}
            </span>
            {metric.trend && (
              <span style={{ 
                fontSize: '11px', 
                color: metric.trend.startsWith('+') ? theme.colors.status.active : metric.trend.startsWith('-') ? theme.colors.status.error : theme.colors.text.secondary 
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

