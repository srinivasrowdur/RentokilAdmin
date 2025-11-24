import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const costData = [
  { month: 'Jan', 'Agent Alpha': 2400, 'Agent Beta': 1800, 'Agent Gamma': 3200 },
  { month: 'Feb', 'Agent Alpha': 2800, 'Agent Beta': 2100, 'Agent Gamma': 2900 },
  { month: 'Mar', 'Agent Alpha': 3200, 'Agent Beta': 2400, 'Agent Gamma': 3100 },
  { month: 'Apr', 'Agent Alpha': 2900, 'Agent Beta': 2800, 'Agent Gamma': 3400 },
  { month: 'May', 'Agent Alpha': 3400, 'Agent Beta': 3100, 'Agent Gamma': 3800 },
  { month: 'Jun', 'Agent Alpha': 3800, 'Agent Beta': 3400, 'Agent Gamma': 4200 },
];

const agents = [
  { id: 1, name: 'Agent Alpha', status: 'active', requests: '12.4K', latency: '45ms', uptime: '99.9%' },
  { id: 2, name: 'Agent Beta', status: 'active', requests: '8.2K', latency: '62ms', uptime: '99.7%' },
  { id: 3, name: 'Agent Gamma', status: 'warning', requests: '15.1K', latency: '128ms', uptime: '98.2%' },
  { id: 4, name: 'Agent Delta', status: 'inactive', requests: '0', latency: '—', uptime: '—' },
];

const navItems = [
  { id: 'home', label: 'Overview', icon: '◉' },
  { id: 'agents', label: 'Agents', icon: '◎' },
  { id: 'analytics', label: 'Analytics', icon: '◈' },
  { id: 'settings', label: 'Settings', icon: '◇' },
];

export default function AgentDashboard() {
  const [activeNav, setActiveNav] = useState('home');
  const [hoveredAgent, setHoveredAgent] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'warning': return '#DC2626';
      case 'inactive': return '#9ca3af';
      default: return '#9ca3af';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
          backdropFilter: 'blur(20px)',
        }}>
          <p style={{ 
            margin: '0 0 12px 0', 
            fontWeight: '600', 
            color: '#1d1d1f',
            fontSize: '13px',
            letterSpacing: '-0.01em'
          }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '6px 0', 
              color: entry.color,
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#fbfbfd',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
      color: '#1d1d1f',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#ffffff',
        borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: '0 28px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
          }}>
            A
          </div>
          <div>
            <div style={{
              fontSize: '17px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: '#1d1d1f',
            }}>
              Agent Hub
            </div>
            <div style={{
              fontSize: '11px',
              color: '#86868b',
              letterSpacing: '0.01em',
              marginTop: '1px',
            }}>
              Admin Console
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 16px' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '10px',
                background: activeNav === item.id ? 'rgba(220, 38, 38, 0.08)' : 'transparent',
                color: activeNav === item.id ? '#DC2626' : '#6e6e73',
                fontSize: '14px',
                fontWeight: activeNav === item.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '4px',
                textAlign: 'left',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ 
                fontSize: '16px',
                opacity: activeNav === item.id ? 1 : 0.7,
              }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#6e6e73',
          }}>
            S
          </div>
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#1d1d1f',
              letterSpacing: '-0.01em',
            }}>
              Srini
            </div>
            <div style={{
              fontSize: '11px',
              color: '#86868b',
            }}>
              Administrator
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '40px 48px',
      }}>
        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#1d1d1f',
          }}>
            Overview
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#86868b',
            margin: '8px 0 0 0',
            letterSpacing: '-0.01em',
          }}>
            Monitor your AI agents' performance and costs
          </p>
        </header>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '32px',
        }}>
          {[
            { label: 'Total Cost', value: '$11,400', change: '+12%', trend: 'up' },
            { label: 'Active Agents', value: '3', change: '75%', trend: 'neutral' },
            { label: 'Total Requests', value: '35.7K', change: '+24%', trend: 'up' },
            { label: 'Avg Latency', value: '78ms', change: '-8%', trend: 'down' },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '12px',
                color: '#86868b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '500',
                marginBottom: '8px',
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '600',
                letterSpacing: '-0.03em',
                color: '#1d1d1f',
                marginBottom: '8px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: stat.trend === 'up' ? '#22c55e' : stat.trend === 'down' ? '#DC2626' : '#86868b',
              }}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
          }}>
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                letterSpacing: '-0.02em',
                margin: 0,
                color: '#1d1d1f',
              }}>
                Cost Overview
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#86868b',
                margin: '4px 0 0 0',
              }}>
                Monthly spending by agent
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '20px',
            }}>
              {[
                { name: 'Agent Alpha', color: '#DC2626' },
                { name: 'Agent Beta', color: '#86868b' },
                { name: 'Agent Gamma', color: '#1d1d1f' },
              ].map((agent) => (
                <div key={agent.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#6e6e73',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: agent.color,
                  }} />
                  {agent.name}
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBeta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#86868b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#86868b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGamma" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d1d1f" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1d1d1f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="0" 
                  stroke="rgba(0,0,0,0.04)" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#86868b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#86868b', fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="Agent Alpha" 
                  stroke="#DC2626" 
                  strokeWidth={2.5}
                  fill="url(#colorAlpha)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#DC2626', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Agent Beta" 
                  stroke="#86868b" 
                  strokeWidth={2}
                  fill="url(#colorBeta)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#86868b', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Agent Gamma" 
                  stroke="#1d1d1f" 
                  strokeWidth={2}
                  fill="url(#colorGamma)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#1d1d1f', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Status Section */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#1d1d1f',
            }}>
              Agent Status
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#86868b',
              margin: '4px 0 0 0',
            }}>
              Real-time health monitoring
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '12px',
          }}>
            {agents.map((agent) => (
              <div
                key={agent.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 100px 100px 100px',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderRadius: '14px',
                  background: hoveredAgent === agent.id ? 'rgba(0, 0, 0, 0.02)' : '#fafafa',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: getStatusColor(agent.status),
                    boxShadow: agent.status === 'active' ? `0 0 12px ${getStatusColor(agent.status)}40` : 'none',
                  }} />
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#1d1d1f',
                      letterSpacing: '-0.01em',
                    }}>
                      {agent.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#86868b',
                      textTransform: 'capitalize',
                      marginTop: '2px',
                    }}>
                      {agent.status}
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                  }}>
                    {agent.requests}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#86868b',
                    marginTop: '2px',
                  }}>
                    Requests
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: agent.latency !== '—' && parseInt(agent.latency) > 100 ? '#DC2626' : '#1d1d1f',
                  }}>
                    {agent.latency}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#86868b',
                    marginTop: '2px',
                  }}>
                    Latency
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                  }}>
                    {agent.uptime}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#86868b',
                    marginTop: '2px',
                  }}>
                    Uptime
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <button style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    background: hoveredAgent === agent.id ? '#1d1d1f' : '#ffffff',
                    color: hoveredAgent === agent.id ? '#ffffff' : '#1d1d1f',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

