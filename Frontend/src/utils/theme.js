/**
 * Design System / Theme Configuration
 * 
 * This file contains all design tokens for the Agentic Factory dashboard.
 * Centralising these values ensures visual consistency and makes it easy
 * to update the look and feel across the entire application.
 * 
 * @module utils/theme
 */

/**
 * Main theme object containing all design tokens
 * @type {Object}
 */
export const theme = {
  /**
   * Colour palette
   * Uses a neutral base with accent colours for categories and status indicators
   */
  colors: {
    // Base colours
    background: '#fbfbfd',  // Page background (off-white)
    surface: '#ffffff',     // Card/panel background (white)
    
    // Text hierarchy
    text: {
      primary: '#1d1d1f',   // Headings, primary content
      secondary: '#86868b', // Subtext, labels
      tertiary: '#aeaeb2',  // Hints, disabled text
      inverse: '#ffffff',   // Text on dark backgrounds
    },
    
    // Status indicators (for agent health, alerts)
    status: {
      active: '#22c55e',    // Green - healthy/good
      warning: '#F59E0B',   // Amber - needs attention
      error: '#DC2626',     // Red - critical/error
      inactive: '#9ca3af',  // Grey - disabled/offline
    },
    
    // Category colours (for metric groupings)
    categories: {
      performance: '#3B82F6', // Blue - speed/efficiency metrics
      compliance: '#22C55E',  // Green - safety/governance metrics
      cost: '#F59E0B',        // Amber - financial metrics
    },
    
    // Border colours
    border: 'rgba(0, 0, 0, 0.04)',      // Default border
    borderHover: 'rgba(0, 0, 0, 0.1)',  // Hover state border
  },
  
  /**
   * Shadow definitions for elevation
   */
  shadows: {
    card: '0 4px 24px rgba(0, 0, 0, 0.04)',   // Default card shadow
    hover: '0 8px 32px rgba(0, 0, 0, 0.08)',  // Elevated hover state
    /**
     * Generates a coloured glow effect
     * @param {string} color - Hex colour for the glow
     * @returns {string} CSS box-shadow value
     */
    glow: (color) => `0 0 12px ${color}40`,
  },
  
  /**
   * Typography settings
   */
  typography: {
    // System font stack optimised for Apple devices
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
  }
};

/**
 * Returns the appropriate colour for a given status
 * 
 * @param {string} status - The status value ('active', 'warning', 'inactive', 'error')
 * @returns {string} Hex colour code
 * 
 * @example
 * getStatusColor('active')  // Returns '#22c55e'
 * getStatusColor('warning') // Returns '#F59E0B'
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'active': return theme.colors.status.active;
    case 'warning': return theme.colors.status.warning;
    case 'inactive': return theme.colors.status.inactive;
    case 'error': return theme.colors.status.error;
    default: return theme.colors.status.inactive;
  }
};
