// Design tokens and shared styles for the Agentic Factory

export const theme = {
  colors: {
    background: '#fbfbfd',
    surface: '#ffffff',
    text: {
      primary: '#1d1d1f',
      secondary: '#86868b',
      tertiary: '#aeaeb2',
      inverse: '#ffffff',
    },
    status: {
      active: '#22c55e',   // Green
      warning: '#F59E0B',  // Amber
      error: '#DC2626',    // Red
      inactive: '#9ca3af', // Grey
    },
    categories: {
      performance: '#3B82F6', // Blue
      compliance: '#22C55E',  // Green
      cost: '#F59E0B',        // Amber
    },
    border: 'rgba(0, 0, 0, 0.04)',
    borderHover: 'rgba(0, 0, 0, 0.1)',
  },
  shadows: {
    card: '0 4px 24px rgba(0, 0, 0, 0.04)',
    hover: '0 8px 32px rgba(0, 0, 0, 0.08)',
    glow: (color) => `0 0 12px ${color}40`,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
  }
};

// Helper for consistent status colors
export const getStatusColor = (status) => {
  switch (status) {
    case 'active': return theme.colors.status.active;
    case 'warning': return theme.colors.status.warning;
    case 'inactive': return theme.colors.status.inactive;
    case 'error': return theme.colors.status.error;
    default: return theme.colors.status.inactive;
  }
};

