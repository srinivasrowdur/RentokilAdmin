/**
 * CategoryCard Component
 * 
 * A summary card for displaying multiple metrics within a category.
 * Used on the Overview page to show Performance, Compliance, and Cost summaries.
 * Clicking the card navigates to the detailed view for that category.
 * 
 * @module components/common/CategoryCard
 */

import React from 'react';
import { theme } from '../../utils/theme';

/**
 * Displays a category summary with multiple metrics and navigation
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Category name (e.g., "Performance")
 * @param {string} props.color - Category theme colour (hex)
 * @param {string} props.icon - Emoji or icon character
 * @param {Function} props.onClick - Navigation handler when card is clicked
 * @param {Array<Object>} props.metrics - Array of metric objects to display
 * @param {string} props.metrics[].label - Metric label
 * @param {string} props.metrics[].value - Metric value
 * @param {string} [props.metrics[].trend] - Trend value (e.g., "+12%")
 * @param {string} [props.metrics[].status] - Status for colour coding ('good', 'warning')
 * 
 * @example
 * <CategoryCard
 *   title="Performance"
 *   color="#3B82F6"
 *   icon="⚡"
 *   onClick={() => navigate('performance')}
 *   metrics={[
 *     { label: 'Avg Latency', value: '82ms', trend: '-12%', status: 'good' },
 *     { label: 'Error Rate', value: '0.8%', trend: '-0.4%', status: 'good' },
 *   ]}
 * />
 */
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
    // Hover animation: lift card, add coloured glow, tint border
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
    {/* Card Header: Icon + Title */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    }}>
      {/* Icon container with tinted background */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: `${color}15`, // 15% opacity of category colour
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
    
    {/* Metrics List */}
    <div style={{ display: 'grid', gap: '16px' }}>
      {metrics.map((metric, idx) => (
        <div key={idx} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Metric label */}
          <span style={{ fontSize: '13px', color: '#6e6e73' }}>{metric.label}</span>
          
          {/* Value + Trend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Value with status-based colouring */}
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: metric.status === 'good' 
                ? theme.colors.status.active 
                : metric.status === 'warning' 
                  ? theme.colors.status.warning 
                  : theme.colors.text.primary 
            }}>
              {metric.value}
            </span>
            
            {/* Optional trend indicator */}
            {metric.trend && (
              <span style={{ 
                fontSize: '11px', 
                color: metric.trend.startsWith('+') 
                  ? theme.colors.status.active 
                  : metric.trend.startsWith('-') 
                    ? theme.colors.status.error 
                    : theme.colors.text.secondary 
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
