import React, { useState } from 'react';

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('sravanth.sekar@company.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#f8fafc', // Light background for right side
      fontFamily: '"Inter", sans-serif',
    }}>
      <div style={{
        flex: '0 0 460px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px',
        boxSizing: 'border-box'
      }}>
        {/* Logo Removed */}

        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          Welcome
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '32px' }}>
          Enter the interactive demo workspace
        </p>

        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          fontSize: '0.95rem',
          fontWeight: '600',
          color: '#334155',
          cursor: 'pointer',
          marginBottom: '24px',
          transition: 'background-color 0.2s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '24px 0',
          color: '#94a3b8',
          fontSize: '0.85rem',
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
          <span style={{ padding: '0 16px' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
              Demo Username
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
              <input 
                type="text"
                placeholder="Enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '1rem',
                  color: '#1e293b',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
              Access Code
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input 
                type="text"
                placeholder="Enter access code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '1rem',
                  color: '#1e293b',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  WebkitTextSecurity: showPassword ? 'none' : 'disc',
                }}
              />
              <div 
                style={{ position: 'absolute', top: '50%', right: '14px', transform: 'translateY(-50%)', color: '#94a3b8', cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500 }}>Remember me</span>
            </label>
            <a href="#" style={{ fontSize: '0.9rem', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
              Forgot password?
            </a>
          </div>

          <button 
            type="submit"
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '14px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'default' : 'pointer',
              transition: 'background-color 0.2s',
              opacity: isLoading ? 0.8 : 1
            }}
          >
            {isLoading ? 'Loading Demo...' : 'Enter Demo'}
          </button>
        </form>

        <div style={{
          marginTop: '40px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ color: '#6366f1', padding: '10px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>New here?</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Create your account in less than a minute.</div>
          </div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6366f1', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
            Sign up
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>

      {/* Right Column - Illustration & Text */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', zIndex: 10 }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#0f172a', margin: '0 0 8px 0' }}>
            Nitro Assistant comes with
          </h2>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>
            <span style={{ color: '#6366f1' }}>purpose-built agents</span> that work together to drive outcomes.
          </h2>
        </div>

        {/* Diagram Container */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '850px', height: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Connecting Lines (SVG) */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <path d="M250 150 C 350 150, 350 275, 425 275" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M250 400 C 350 400, 350 275, 425 275" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M600 150 C 500 150, 500 275, 425 275" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M600 400 C 500 400, 500 275, 425 275" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
            
            <circle cx="270" cy="175" r="3" fill="#6366f1" />
            <circle cx="270" cy="375" r="3" fill="#6366f1" />
            <circle cx="580" cy="175" r="3" fill="#6366f1" />
            <circle cx="580" cy="375" r="3" fill="#6366f1" />
          </svg>

          {/* Central Card */}
          <div style={{
            position: 'absolute',
            zIndex: 2,
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.15)',
            border: '2px solid rgba(99, 102, 241, 0.3)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#eef2ff', color: '#6366f1', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>✨</span> NEW
            </div>
            
            <div style={{ width: '64px', height: '64px', backgroundColor: '#6366f1', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'white' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>Policy Governance Agent</h3>
            <div style={{ backgroundColor: '#eef2ff', color: '#6366f1', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '16px' }}>Core Agent</div>
            
            <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 24px 0', lineHeight: 1.5 }}>
              Enforces your policies across projects, resources and decisions—so nothing falls through the cracks.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                <svg style={{ flexShrink: 0, marginTop: '2px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Enforces policy compliance
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                <svg style={{ flexShrink: 0, marginTop: '2px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Detects violations proactively
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                <svg style={{ flexShrink: 0, marginTop: '2px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Automates approvals & exceptions
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                <svg style={{ flexShrink: 0, marginTop: '2px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Maintains audit-ready records
              </div>
            </div>
          </div>

          {/* Top Left Card */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1,
            width: '220px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
            padding: '24px',
          }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#3b82f6' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5-1.49 5-1.49"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 1.49-5 1.49-5"></path></svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>Launch Readiness Agent</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4 }}>Prepares every project for a successful launch.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Readiness checklist
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Risk detection
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Go-to-market insights
              </div>
            </div>
          </div>

          {/* Bottom Left Card */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 1,
            width: '220px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
            padding: '24px',
          }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#fff7ed', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#f97316' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>Customer Success Agent</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4 }}>Proactively identifies risks and drives customer outcomes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Health scoring
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> At-risk alerts
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> CS playbook automation
              </div>
            </div>
          </div>

          {/* Top Right Card */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1,
            width: '220px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
            padding: '24px',
          }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#f0fdf4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#22c55e' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>Financial Insights Agent</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4 }}>Turns financial data into real-time business insights.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Revenue recognition
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Margin analysis
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Invoice & billing insights
              </div>
            </div>
          </div>

          {/* Bottom Right Card */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 1,
            width: '220px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
            padding: '24px',
          }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#faf5ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#a855f7' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>Product Intelligence Agent</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4 }}>Understands product usage and surfaces key insights.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Usage analytics
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Feature adoption
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Feedback analysis
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginView;

