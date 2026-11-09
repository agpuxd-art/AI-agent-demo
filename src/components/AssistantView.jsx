import React, { useState } from 'react';
import { ArrowRight, Sparkles, AlertCircle, X } from 'lucide-react';

const AssistantView = ({ setActiveTab, setGovernanceQuery, hasActiveChat }) => {
  const [inputValue, setInputValue] = useState('');
  const [showAgentsMenu, setShowAgentsMenu] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const assistants = [
    { title: 'Project Governance Agent', desc: 'Ensures compliance and handles policy conflict resolutions.', color: '#8b5cf6', active: true, id: 'governance', isNew: true },
    { title: 'Resource Planner', desc: 'Optimizes team allocation and forecasts capacity bottlenecks.', color: '#3b82f6', active: false, id: 'resource' },
    { title: 'Financial Analyst', desc: 'Tracks budget burn down, margins, and revenue realization.', color: '#10b981', active: false, id: 'financial' },
    { title: 'Risk Predictor', desc: 'Early warning system for project delays and customer churn.', color: '#f59e0b', active: false, id: 'risk' },
    { title: 'Status Reporter', desc: 'Auto-generates weekly summaries for stakeholders.', color: '#ec4899', active: false, id: 'status' },
    { title: 'Quality Assurance', desc: 'Checks deliverables against baseline acceptance criteria.', color: '#6366f1', active: false, id: 'qa' }
  ];

  const handleLaunchGovernance = (query = '') => {
    setGovernanceQuery(query);
    setActiveTab('governance_chat');
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim() && !selectedAgent) return;

    if (selectedAgent === 'governance' || (!selectedAgent && inputValue.toLowerCase().includes('complete'))) {
      handleLaunchGovernance(inputValue);
    } else if (selectedAgent) {
      setShowWarningModal(true);
    } else {
      // Execute command as usual if no agent delegated
      handleLaunchGovernance(inputValue);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    
    if (val === '/') {
      setShowAgentsMenu(true);
    } else if (!val.includes('/')) {
      setShowAgentsMenu(false);
    }
  };

  const selectAgentFromMenu = (agentId) => {
    if (agentId === 'governance') {
      setSelectedAgent(agentId);
      setShowAgentsMenu(false);
      setInputValue('');
    } else {
      setShowWarningModal(true);
      setShowAgentsMenu(false);
      setInputValue('');
    }
  };

  const getSelectedAgentDetails = () => {
    return assistants.find(a => a.id === selectedAgent);
  };

  return (
    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      
      {/* Warning Modal */}
      {showWarningModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => setShowWarningModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
              <X size={20} />
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={24} color="#f59e0b" />
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', textAlign: 'center', marginBottom: '12px' }}>Feature Not Available</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', textAlign: 'center', lineHeight: '1.5', marginBottom: '24px' }}>
              This demo is intended to showcase the actions of the <strong>Project Governance Agent</strong>. Please select that agent to continue the interactive demo flow.
            </p>
            <button 
              onClick={() => setShowWarningModal(false)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ padding: '48px 48px 32px 48px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>Orbito Assistant</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '32px' }}>
          Hi Alex, What can I help with?
        </p>

        {/* Ask Orbito Input - Fixed above cards */}
        <div style={{
          width: '100%',
          maxWidth: '600px',
          marginBottom: '32px',
          position: 'relative',
          flexShrink: 0
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '24px', 
            border: '1px solid #e2e8f0', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            padding: '8px 12px',
            position: 'relative'
          }}>
            {selectedAgent && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f3e8ff', color: '#7e22ce', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 600, marginRight: '8px' }}>
                <Sparkles size={14} />
                {getSelectedAgentDetails().title}
                <X size={14} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setSelectedAgent(null)} />
              </div>
            )}
            <input 
              type="text" 
              placeholder={selectedAgent ? "What would you like me to do?" : "Ask Orbito or type / to invoke an agent to delegate a task"} 
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
              style={{ 
                flex: 1,
                padding: '8px', 
                fontSize: '1rem',
                outline: 'none',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#334155'
              }} 
            />
            <div 
              onClick={handleInputSubmit}
              style={{ 
                backgroundColor: (inputValue.trim() || selectedAgent) ? '#3b82f6' : '#f1f5f9', 
                borderRadius: '50%', 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: (inputValue.trim() || selectedAgent) ? 'pointer' : 'default',
                transition: 'background-color 0.2s'
              }}>
              <ArrowRight size={16} color={(inputValue.trim() || selectedAgent) ? "white" : "#64748b"} />
            </div>
          </div>

          {/* Slash Command Dropdown */}
          {showAgentsMenu && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 50, padding: '8px', maxHeight: '300px', overflowY: 'auto' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', padding: '8px', textTransform: 'uppercase' }}>Select an Agent</div>
              {assistants.map(a => (
                <div 
                  key={a.id} 
                  onClick={() => selectAgentFromMenu(a.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={14} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1e293b' }}>{a.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => {handleLaunchGovernance("Mark all the projects completed");}} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Try: Mark all the projects completed
            </button>
            <button onClick={() => {handleLaunchGovernance("Wrap lisa's work with in end of the week");}} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Try: Wrap lisa's work with in end of the week
            </button>
            <button onClick={() => {handleLaunchGovernance("Check portfolio compliance");}} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Try: Check portfolio compliance
            </button>
          </div>
        </div>

        {/* Separating Line */}
        <div style={{ width: '100%', maxWidth: '600px', height: '1px', backgroundColor: '#e2e8f0', margin: '0 0 24px 0' }}></div>

        {/* Cards Grid - Scrollable (Only for Global Assistant) */}
        <div className="assistant-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '24px', 
          width: '100%', 
          maxWidth: '1100px',
          overflowY: 'auto',
          padding: '8px'
        }}>
          {assistants.map((assistant, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                if (assistant.id === 'governance') {
                  handleLaunchGovernance();
                } else {
                  setShowWarningModal(true);
                }
              }}
              style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '16px', 
                padding: '24px', 
                boxShadow: assistant.active 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                border: '1px solid #f1f5f9',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                transform: assistant.active ? 'translateY(-4px)' : 'none',
                position: 'relative'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px', 
                  backgroundColor: assistant.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Sparkles size={16} color="white" />
                </div>
                {assistant.isNew && (
                  <div style={{ 
                    backgroundColor: '#e0e7ff', color: '#4f46e5', fontSize: '0.7rem', 
                    fontWeight: 700, padding: '2px 8px', borderRadius: '12px' 
                  }}>
                    NEW
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>
                {assistant.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5', marginBottom: (hasActiveChat && assistant.id === 'governance') ? '16px' : '0' }}>
                {assistant.desc}
              </p>
              
              {hasActiveChat && assistant.id === 'governance' && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f3e8ff',
                  color: '#7e22ce',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}>
                  Resume Chat <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssistantView;
