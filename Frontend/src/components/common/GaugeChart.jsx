/**
 * GaugeChart Component
 * 
 * A semi-circular gauge visualisation for displaying percentage values
 * against a target. Used in the Compliance view to show metrics like
 * Privacy Compliance, Security Coverage, etc.
 * 
 * The gauge colour changes based on whether the value meets the target:
 * - Green: Target met
 * - Amber: Below target (needs attention)
 * 
 * @module components/common/GaugeChart
 */

import React from 'react';
import { theme } from '../../utils/theme';

/**
 * Renders a semi-circular gauge with value, target, and label
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current value (0-100)
 * @param {number} props.target - Target threshold value
 * @param {string} props.label - Descriptive label below the gauge
 * @param {string} props.color - Category colour (used for reference, not displayed)
 * @param {boolean} [props.inverse=false] - If true, lower values are better (e.g., Bias Rate)
 * 
 * @example
 * // Standard gauge (higher is better)
 * <GaugeChart value={98.5} target={99} label="Privacy Compliance" />
 * 
 * // Inverse gauge (lower is better)
 * <GaugeChart value={2.1} target={5} label="Bias Detection Rate" inverse />
 */
export const GaugeChart = ({ value, target, label, color, inverse = false }) => {
  // Clamp percentage to 0-100 range for display
  const percentage = Math.min(100, Math.max(0, value));
  
  // Determine if target is met (inverse logic for metrics where lower is better)
  const isGood = inverse ? value <= target : value >= target;
  
  // Select colour based on target status
  const gaugeColor = isGood ? theme.colors.status.active : theme.colors.status.warning;
  
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Gauge Container - crops circle to semi-circle */}
      <div style={{ 
        position: 'relative', 
        width: '120px', 
        height: '60px', 
        margin: '0 auto', 
        overflow: 'hidden' 
      }}>
        {/* Gauge Arc - uses conic-gradient for the fill */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          // Creates arc: filled portion -> unfilled portion -> transparent bottom half
          background: `conic-gradient(${gaugeColor} 0deg, ${gaugeColor} ${percentage * 1.8}deg, #f0f0f0 ${percentage * 1.8}deg, #f0f0f0 180deg, transparent 180deg)`,
          transform: 'rotate(-90deg)', // Rotate so 0% starts at left
        }} />
        
        {/* Inner circle (creates donut effect) */}
        <div style={{
          position: 'absolute',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: theme.colors.surface,
          top: '15px',
          left: '15px',
        }} />
        
        {/* Value display in center */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '20px',
          fontWeight: '600',
          color: theme.colors.text.primary,
        }}>
          {value}%
        </div>
      </div>
      
      {/* Label */}
      <div style={{ 
        fontSize: '12px', 
        color: theme.colors.text.secondary, 
        marginTop: '8px' 
      }}>
        {label}
      </div>
      
      {/* Target reference */}
      <div style={{ 
        fontSize: '11px', 
        color: theme.colors.text.tertiary, 
        marginTop: '2px' 
      }}>
        Target: {target}%
      </div>
    </div>
  );
};
