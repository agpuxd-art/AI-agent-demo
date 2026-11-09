import React, { useEffect } from 'react';
import { X, Sparkles, ShieldCheck, Zap, ArrowRight, Layers } from 'lucide-react';

const CaseStudyModal = ({ isOpen, onClose, onLaunchScenario }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 0.2s ease-in-out'
    }}>
      <div style={{
        width: '680px',
        maxWidth: '92vw',
        height: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Inter", sans-serif',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f3e8ff', color: '#7c3aed', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '8px' }}>
              <Sparkles size={13} /> UX Case Study & System Architecture
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
              Orbito — Project Governance AI Agent
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
              Autonomous multi-level policy conflict resolution in enterprise client onboarding
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Executive Summary */}
          <section>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#8b5cf6" /> Executive Overview
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              In professional services delivery, closing complex projects or rebalancing team workloads forces Delivery Leads to tab-jump across dozens of boards, timesheets, and milestone sign-offs. Standard bulk editors blindly flip status checkboxes, causing premature billing recognition and broken timesheet compliance.
            </p>
            <div style={{ marginTop: '12px', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
              <strong>Orbito</strong> bridges high-level natural language intent (<em>"Mark all my projects completed"</em>) with deterministic policy validation, reducing click overhead from <strong>85+ clicks down to 3 clicks</strong> within a conversational co-pilot.
            </div>
          </section>

          {/* Key Impact Metrics */}
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '14px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>96%</div>
                <div style={{ fontSize: '0.78rem', color: '#065f46', fontWeight: 500 }}>Click Reduction (85 → 3)</div>
              </div>
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563eb' }}>4 Levels</div>
                <div style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: 500 }}>Cascading Conflict Trace</div>
              </div>
              <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', padding: '14px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7c3aed' }}>5 Seconds</div>
                <div style={{ fontSize: '0.78rem', color: '#5b21b6', fontWeight: 500 }}>Deferred Undo Window</div>
              </div>
            </div>
          </section>

          {/* Core Policies & Hierarchy */}
          <section>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="#3b82f6" /> 4 Core Governance Policies
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>Policy 1 (Project Level):</span> A project cannot close unless all milestone deliverables are signed off.
              </div>
              <div style={{ padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>Policy 2 (Milestone Level):</span> A milestone cannot close if child subtasks remain pending.
              </div>
              <div style={{ padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>Policy 3 (Subtask Level):</span> A subtask cannot complete if its predecessor dependency is incomplete.
              </div>
              <div style={{ padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>Policy 4 (Root Cause Level):</span> A task cannot be marked completed without active timesheet hours logged (&gt;0.00h).
              </div>
            </div>

            {/* Visual Tree */}
            <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#0f172a', borderRadius: '8px', color: '#f8fafc', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6 }}>
              <div style={{ color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>CASCADING RESOLUTION ARCHITECTURE:</div>
              <div style={{ color: '#38bdf8' }}>L1: PRJ-005 (Bowen-Chapman Closeout) [Locked]</div>
              <div style={{ paddingLeft: '16px', color: '#a78bfa' }}>└── L2: MST-021 (Implementation Milestone) [Blocked]</div>
              <div style={{ paddingLeft: '32px', color: '#fbbf24' }}>    └── L3: TSK-0003 (Hypercare Subtask) [Blocked]</div>
              <div style={{ paddingLeft: '48px', color: '#f87171' }}>        └── L4: TSK-0004 (Starter Kit: 0.00h logged) [Root Cause]</div>
              <div style={{ color: '#34d399', marginTop: '8px', borderTop: '1px solid #334155', paddingTop: '6px' }}>
                ✓ Resolving L4 auto-cascades completion through L3 → L2 → L1 in sequence.
              </div>
            </div>
          </section>

          {/* UX Design Inventions */}
          <section>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="#f59e0b" /> Key UX Inventions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>1</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.88rem' }}>Triage vs. Error Avalanche</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                    Instead of overwhelming users with 210 unlogged tasks, Orbito isolates the gating blocker (PRJ-005) that actively halts the macro command.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>2</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.88rem' }}>Dual-Path Resolution (Auto-Resolve vs. Inspect)</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                    Empowers power users with 1-click autonomous resolution using historical pace averages (02:30), while giving control-oriented PMs granular inline overrides.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>3</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.88rem' }}>5-Second Deferred Execution Safety Net</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                    Eliminates modal confirmation fatigue by holding destructive batch database writes in a deferred queue with live undo capability.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Test Scenarios Quick Launch */}
          <section style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', margin: '0 0 8px 0' }}>
              Launch Interactive Demo Scenarios
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 14px 0' }}>
              Click any scenario to execute live inside the agent workspace:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => { onClose(); onLaunchScenario('Mark all the projects completed'); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0',
                  borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem',
                  fontWeight: 500, color: '#1e293b', transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <span>▶ <strong>Scenario 1:</strong> Project Closeout Audit & 4-Level Cascade</span>
                <ArrowRight size={14} color="#64748b" />
              </button>

              <button
                onClick={() => { onClose(); onLaunchScenario("Wrap lisa's work with in end of the week"); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0',
                  borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem',
                  fontWeight: 500, color: '#1e293b', transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <span>▶ <strong>Scenario 2:</strong> Capacity-Aware Workload Rebalancing</span>
                <ArrowRight size={14} color="#64748b" />
              </button>

              <button
                onClick={() => { onClose(); onLaunchScenario('Check portfolio compliance'); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0',
                  borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem',
                  fontWeight: 500, color: '#1e293b', transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <span>▶ <strong>Scenario 3:</strong> Portfolio Compliance Health Dashboard</span>
                <ArrowRight size={14} color="#64748b" />
              </button>

              <button
                onClick={() => { onClose(); onLaunchScenario('Notify Lisa via Slack'); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0',
                  borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem',
                  fontWeight: 500, color: '#1e293b', transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <span>▶ <strong>Scenario 4:</strong> Integration Fallback (Non-blocking Slack check)</span>
                <ArrowRight size={14} color="#64748b" />
              </button>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>Portfolio Edition: Orbito v3.0</div>
          <button
            onClick={onClose}
            style={{
              padding: '6px 16px',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
