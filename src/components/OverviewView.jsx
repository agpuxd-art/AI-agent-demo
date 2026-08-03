import React, { useMemo } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Ban, Calendar, ChevronRight, FileText, Circle } from 'lucide-react';
import { AssigneeAvatar } from './SharedUI';

const OverviewView = ({ project, tasks }) => {
  const phases = useMemo(() => {
    if (!tasks) return [];
    const phaseMap = {};
    tasks.forEach(t => {
      const p = t.Phase || 'Uncategorized';
      if (!phaseMap[p]) phaseMap[p] = { total: 0, completed: 0, start: t.StartDate, end: t.DueDate };
      phaseMap[p].total++;
      if ((t.Status || '').toLowerCase().includes('complete')) phaseMap[p].completed++;
      if (t.StartDate && (!phaseMap[p].start || new Date(t.StartDate) < new Date(phaseMap[p].start))) phaseMap[p].start = t.StartDate;
      if (t.DueDate && (!phaseMap[p].end || new Date(t.DueDate) > new Date(phaseMap[p].end))) phaseMap[p].end = t.DueDate;
    });
    return Object.keys(phaseMap).map(name => ({
      name,
      ...phaseMap[name],
      progress: Math.round((phaseMap[name].completed / phaseMap[name].total) * 100)
    }));
  }, [tasks]);

  if (!project) return <div style={{ padding: '24px' }}>Loading overview...</div>;

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('progress')) return '#10b981'; // emerald
    if (s.includes('risk')) return '#f59e0b'; // amber
    if (s.includes('block')) return '#ef4444'; // red
    if (s.includes('complete')) return '#3b82f6'; // blue
    return '#64748b'; // slate
  };

  const getStatusBg = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('progress')) return '#d1fae5';
    if (s.includes('risk')) return '#fef3c7';
    if (s.includes('block')) return '#fee2e2';
    if (s.includes('complete')) return '#dbeafe';
    return '#f1f5f9';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const calculateCompletion = () => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => (t.Status || '').toLowerCase().includes('complete')).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const teamMembers = project.TeamMembers ? project.TeamMembers.split(',').map(tm => tm.split('|')[0].trim()) : ['Joshua Perry', 'Susan Serrano', 'Anthony Harmon'];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', flex: 1, overflowY: 'auto' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Row: Status, Dates, Completion */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Status</div>
              <div style={{ color: getStatusColor(project.ProjectStatus), fontSize: '1.25rem', fontWeight: 600 }}>
                {project.ProjectStatus}
              </div>
            </div>
            
            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Project dates</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                {new Date(project.StartDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - {new Date(project.DueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </div>
            </div>

            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Completion</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{tasks.filter(t => (t.Status||'').toLowerCase().includes('complete')).length}/{tasks.length} tasks</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>{calculateCompletion()}%</div>
                <div style={{ flex: 1, height: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${calculateCompletion()}%`, backgroundColor: '#10b981' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Counters Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { label: 'Overdue tasks', value: project.OverdueTasks, color: '#ef4444' },
              { label: 'At risk tasks', value: project.AtRiskTasks, color: '#f59e0b' },
              { label: 'Completed Tasks', value: project.CompletedTasks, color: '#10b981' },
              { label: 'Blocked tasks', value: project.BlockedTasks, color: '#ef4444' }
            ].map((stat, i) => (
              <div key={i} className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginBottom: '16px' }}>{stat.label}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>{stat.value || 0}</div>
                  {stat.value > 0 && (
                    <div style={{ display: 'flex' }}>
                      <AssigneeAvatar assignee={teamMembers[i % teamMembers.length]} i={0} />
                      <div style={{ marginLeft: '-8px', zIndex: 1 }}><AssigneeAvatar assignee={teamMembers[(i+1) % teamMembers.length]} i={1} /></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Phases & Business Goals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>All phases</div>
                <a href="#" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>View project plan</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {phases.slice(0, 4).map((phase, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem' }}>
                      <span style={{ fontWeight: 500, color: '#334155' }}>{phase.name}</span>
                    </div>
                    <div style={{ height: '20px', backgroundColor: '#f1f5f9', borderRadius: '4px', display: 'flex', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${phase.progress}%`, backgroundColor: '#10b981' }}></div>
                      <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 8px', alignItems: 'center', fontSize: '0.7rem', color: phase.progress > 50 ? 'white' : '#64748b' }}>
                        <span>{phase.start ? new Date(phase.start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''}</span>
                        <span>{phase.end ? new Date(phase.end).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Business goals</div>
                <a href="#" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>Add new goal</a>
              </div>
              <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Circle size={16} color="#94a3b8" />
                  <span style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>Edit</span>
                </div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#1e293b' }}>Project Dashboard</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>On-demand visibility for leaders, management</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px', fontSize: '0.8rem', color: '#94a3b8', gap: '8px' }}>
                  1 of 2 <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* List Widgets Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Tasks overdue</div>
                <a href="#" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>View all</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tasks.slice(0, 7).map((t, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{t.TaskName}</span>
                    <span style={{ color: '#ef4444', fontWeight: 500 }}>{Math.floor(Math.random() * 120) + 1}d</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Tasks at risk</div>
                <a href="#" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>View all</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#94a3b8', textAlign: 'center' }}>
                <Calendar size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
                <p style={{ fontSize: '0.85rem', margin: 0, maxWidth: '200px' }}>Catch tasks "at risk" here and help your teams quickly resolve them.</p>
              </div>
            </div>

            <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Blocked tasks</div>
                <a href="#" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>View all</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tasks.filter(t => (t.Status||'').toLowerCase().includes('block')).slice(0, 5).map((t, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#334155' }}>{t.TaskName}</span>
                    <span style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>New</span>
                  </div>
                ))}
                {tasks.filter(t => (t.Status||'').toLowerCase().includes('block')).length === 0 && (
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>No blocked tasks!</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>Project Info</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '20px' }}>Only visible to Onboard</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Status</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: getStatusColor(project.ProjectStatus), fontWeight: 500 }}>
                  <CheckCircle2 size={14} /> {project.ProjectStatus}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Start Date</span>
                <span style={{ color: '#1e293b' }}>{formatDate(project.StartDate)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Due Date</span>
                <span style={{ color: '#1e293b' }}>{formatDate(project.DueDate)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Annualized Recurring Revenue</span>
                <span style={{ color: '#1e293b' }}>{project.ProjectRevenue || '25000'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Project fee</span>
                <span style={{ color: '#1e293b' }}>{project.ProjectBudget || '5000'}</span>
              </div>
              
              <div style={{ color: '#3b82f6', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <FileText size={14} /> See more fields...
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>Project hours</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '20px' }}>Only visible to Onboard</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tracked hours</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>{project.ProjectTrackedHours || '1h 30m'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Remaining hours</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>-</div>
              </div>
            </div>
            
            <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 500, marginBottom: '24px', cursor: 'pointer' }}>Set budgeted hours</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* chart mock */}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div> 100% • Billable</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '50%' }}></div> 0% • Non-billable</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.85rem' }}>Categories</span>
              <span style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer' }}>View Details</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Meeting</span>
              <span style={{ color: '#1e293b', fontWeight: 500 }}>66.7% <span style={{ color: '#94a3b8', fontWeight: 400 }}>(1h 00m)</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: '#64748b' }}>Documentation</span>
              <span style={{ color: '#1e293b', fontWeight: 500 }}>33.3% <span style={{ color: '#94a3b8', fontWeight: 400 }}>(30m)</span></span>
            </div>
          </div>

          <div className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Team members</div>
              <a href="#" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>Invite</a>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#1e293b', borderRadius: '4px' }}></div> Onboard
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.85rem', color: '#64748b' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '4px' }}></div> Modert
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {teamMembers.map((member, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AssigneeAvatar assignee={member} i={0} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>{member}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{i === 0 ? 'Customer success' : (i === 1 ? 'CEO' : 'Product Manager')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OverviewView;
