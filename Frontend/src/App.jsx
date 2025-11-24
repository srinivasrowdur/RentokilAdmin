/**
 * App Component
 * 
 * Root application component that renders the main dashboard.
 * This is kept minimal - all logic lives in AgentDashboard and below.
 * 
 * In a larger application, this would be where you'd add:
 * - React Router for multiple pages
 * - Global providers (Auth, Theme, etc.)
 * - Error boundaries
 * 
 * @module App
 */

import AgentDashboard from './AgentDashboard'

/**
 * Root component that renders the Agentic Factory dashboard
 * @returns {JSX.Element} The main dashboard component
 */
function App() {
  return <AgentDashboard />
}

export default App
