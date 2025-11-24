/**
 * MetricCard Component
 * 
 * A reusable card component for displaying a single metric value
 * with optional trend indicator and colour coding.
 * 
 * Used in: Performance, Costs, and Overview views for summary statistics.
 * 
 * @module components/common/MetricCard
 */

import React from 'react';
import { theme } from '../../utils/theme';

/**
 * Displays a single metric with value, label, and optional trend
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - The metric label (e.g., "Avg Latency")
 * @param {string} props.value - The metric value (e.g., "82ms")
 * @param {string} [props.change] - Change description (e.g., "-12% vs last month")
 * @param {string} [props.trend] - Trend direction: 'up', 'down', or undefined
 * @param {string} [props.color] - Category colour for the indicator dot
 * @param {string} [props.subtitle] - Additional context below the value
 * 
 * @example
 * <MetricCard 
 *   label="Avg Latency" 
 *   value="82ms" 
 *   change="-12% vs last month"
 *   trend="down"
 *   color="#3B82F6"
 * />
 */
export const MetricCard = ({ label, value, change, trend, color, subtitle }) => (
  <div
    style={{
      background: theme.colors.surface,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${theme.colors.border}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    // Hover animation: lift card and add shadow
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = theme.shadows.hover;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {/* Label with optional category colour indicator */}
    <div style={{
      fontSize: '12px',
      color: theme.colors.text.secondary,
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
    
    {/* Primary metric value */}
    <div style={{
      fontSize: '28px',
      fontWeight: '600',
      letterSpacing: '-0.03em',
      color: theme.colors.text.primary,
      marginBottom: '4px',
    }}>
      {value}
    </div>
    
    {/* Optional subtitle for additional context */}
    {subtitle && (
      <div style={{ fontSize: '12px', color: theme.colors.text.secondary, marginBottom: '4px' }}>
        {subtitle}
      </div>
    )}
    
    {/* Trend indicator with colour coding */}
    {change && (
      <div style={{
        fontSize: '12px',
        fontWeight: '500',
        // Green for improvements (down latency/errors), red for increases
        color: trend === 'up' ? theme.colors.status.active : trend === 'down' ? theme.colors.status.error : theme.colors.text.secondary,
      }}>
        {change}
      </div>
    )}
  </div>
);
