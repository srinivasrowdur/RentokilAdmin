import { useState, useEffect } from 'react';
import { 
  performanceData, 
  costData, 
  modelCosts, 
  agentMetrics,
  performanceSummary,
  complianceSummary,
  costSummary 
} from '../utils/mockData';

/**
 * Custom hook to manage agent data fetching and subscriptions.
 * 
 * In production, this would:
 * - Use React Query or SWR for caching/revalidation
 * - Connect to a WebSocket for real-time updates
 * - Handle loading and error states
 * 
 * Data structure mirrors what the backend API would return:
 * - summaries: Pre-computed aggregates for dashboard cards
 * - history: Time series data for charts
 * - agents: Per-agent breakdown metrics
 */
export const useAgentData = () => {
  const [data, setData] = useState({
    // Summary data (pre-computed by backend)
    summaries: {
      performance: performanceSummary,
      compliance: complianceSummary,
      cost: costSummary,
    },
    // Time series for charts
    performanceHistory: performanceData,
    costHistory: costData,
    // Model breakdown for pie chart
    modelCostBreakdown: modelCosts,
    // Per-agent metrics
    agents: agentMetrics,
    // Request state
    loading: false,
    error: null
  });

  // Simulate real-time updates or polling
  useEffect(() => {
    // In production, this would be:
    // 
    // Option 1: WebSocket connection
    // const socket = new WebSocket('wss://api.agentfactory.ai/stream');
    // socket.onmessage = (event) => {
    //   const newData = JSON.parse(event.data);
    //   setData(prev => ({ ...prev, ...newData, loading: false }));
    // };
    // return () => socket.close();
    //
    // Option 2: Polling with React Query
    // const { data } = useQuery('agentData', fetchAgentData, { 
    //   refetchInterval: 5000 
    // });
    
    return () => {
      // Cleanup subscriptions
    };
  }, []);

  return data;
};
