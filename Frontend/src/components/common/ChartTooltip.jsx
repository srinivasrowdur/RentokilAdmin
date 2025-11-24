/**
 * ChartTooltip Component
 * 
 * A custom tooltip component for Recharts visualisations.
 * Provides a consistent, styled tooltip across all charts in the dashboard.
 * 
 * Used by: AreaChart (Performance latency, Cost trend), PieChart (Cost by Model)
 * 
 * @module components/common/ChartTooltip
 */

import React from 'react';
import { theme } from '../../utils/theme';

/**
 * Custom tooltip renderer for Recharts
 * 
 * This component is passed to Recharts' <Tooltip content={} /> prop.
 * Recharts automatically provides the props when hovering over data points.
 * 
 * @param {Object} props - Props provided by Recharts
 * @param {boolean} props.active - Whether tooltip should be visible
 * @param {Array<Object>} props.payload - Data for the hovered point
 * @param {string} props.payload[].name - Series name
 * @param {number} props.payload[].value - Data value
 * @param {string} props.payload[].color - Series colour
 * @param {string} props.label - X-axis label (e.g., month name)
 * 
 * @example
 * // Usage in a Recharts AreaChart
 * <AreaChart data={data}>
 *   <Tooltip content={<ChartTooltip />} />
 *   <Area dataKey="latency" />
 * </AreaChart>
 */
export const ChartTooltip = ({ active, payload, label }) => {
  // Only render when actively hovering and data exists
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.98)',
        border: 'none',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: theme.shadows.card,
        backdropFilter: 'blur(20px)', // Frosted glass effect
      }}>
        {/* X-axis label (e.g., "January") */}
        <p style={{ 
          margin: '0 0 12px 0', 
          fontWeight: '600', 
          color: theme.colors.text.primary,
          fontSize: '13px',
          letterSpacing: '-0.01em'
        }}>
          {label}
        </p>
        
        {/* Data series values */}
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            margin: '6px 0', 
            color: entry.color,
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {/* Format cost values with $ prefix */}
            {entry.name}: {typeof entry.value === 'number' && entry.name.includes('Cost') 
              ? `$${entry.value.toLocaleString()}` 
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  
  // Return null when not hovering (hides tooltip)
  return null;
};
