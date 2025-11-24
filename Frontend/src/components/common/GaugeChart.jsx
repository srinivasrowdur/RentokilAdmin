import React from 'react';
import { theme } from '../../utils/theme';

export const GaugeChart = ({ value, target, label, color, inverse = false }) => {
  const percentage = Math.min(100, Math.max(0, value));
  const isGood = inverse ? value <= target : value >= target;
  const gaugeColor = isGood ? theme.colors.status.active : theme.colors.status.warning;
  
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '120px', height: '60px', margin: '0 auto', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `conic-gradient(${gaugeColor} 0deg, ${gaugeColor} ${percentage * 1.8}deg, #f0f0f0 ${percentage * 1.8}deg, #f0f0f0 180deg, transparent 180deg)`,
          transform: 'rotate(-90deg)',
        }} />
        <div style={{
          position: 'absolute',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: theme.colors.surface,
          top: '15px',
          left: '15px',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '20px',
          fontWeight: '600',
          color: theme.colors.text.primary,
        }}>
          {value}{inverse ? '%' : '%'}
        </div>
      </div>
      <div style={{ fontSize: '12px', color: theme.colors.text.secondary, marginTop: '8px' }}>{label}</div>
      <div style={{ fontSize: '11px', color: theme.colors.text.tertiary, marginTop: '2px' }}>Target: {target}%</div>
    </div>
  );
};

