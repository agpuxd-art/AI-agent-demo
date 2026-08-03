import React, { useState } from 'react';
import { Filter, CheckSquare, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { AssigneeAvatar } from './SharedUI';

const ProjectsListView = ({ projects, tasks, onSelectProject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const getProjectStats = (projectId) => {
    const pTasks = tasks.filter(t => t.ProjectId === projectId);
    if (pTasks.length === 0) return { progress: 0, phase: 'Pre-Kickoff', status: 'Proposed', tasksCount: 0, assignees: [] };

    const completed = pTasks.filter(t => t.Status === 'Completed').length;
    const progress = Math.round((completed / pTasks.length) * 100);
    
    // Status Logic
    let status = 'Proposed';
    if (progress === 100) status = 'Completed';
    else if (progress > 0) status = 'In progress';
    
    // Pick the first non-completed phase as current phase
    const activeTask = pTasks.find(t => t.Status !== 'Completed');
    const phase = activeTask && activeTask.PhaseName ? activeTask.PhaseName : (progress === 100 ? 'Closed' : 'Planning');

    // Extract unique assignees
    const assigneesSet = new Set();
    pTasks.forEach(t => {
      if (t.Assignee) {
        t.Assignee.split(',').forEach(a => assigneesSet.add(a.trim()));
      }
    });
    const assignees = Array.from(assigneesSet).filter(a => a);

    return { progress, phase, status, tasksCount: pTasks.length, assignees };
  };

  const getStatusIcon = (status) => {
    if (status === 'Completed') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 500 }}>
          <CheckSquare size={16} /> Completed
        </div>
      );
    } else if (status === 'In progress') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 500 }}>
          <div style={{ position: 'relative', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #10b981', borderTopColor: 'transparent', transform: 'rotate(-45deg)' }}>
            <div style={{ position: 'absolute', top: '2px', left: '2px', width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
          </div>
          In progress
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 500 }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #94a3b8' }}></div>
          Proposed
        </div>
      );
    }
  };

  // Pagination Logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const displayProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#ffffff', overflowY: 'auto' }}>
      
      <div style={{ padding: '32px 48px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '6px', borderRadius: '6px' }}>
            <CheckSquare size={20} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Projects</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', ':hover': { backgroundColor: '#f1f5f9' } }}>
            <Search size={16} color="#64748b" />
          </div>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#334155', fontSize: '0.9rem', transition: 'all 0.2s', ':hover': { backgroundColor: '#f1f5f9' } }}>
            <Filter size={16} /> Filter
          </div>
          <div style={{ fontWeight: 600, color: '#475569', fontSize: '0.9rem', cursor: 'pointer', padding: '10px 16px', borderRadius: '8px', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#f8fafc' } }}>
            Group by: None
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 48px 48px 48px' }}>
        <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '0.85rem', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Projects names ({projects.length})</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Current Phases</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Team</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, width: '200px' }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {displayProjects.map((proj, idx) => {
                const stats = getProjectStats(proj.ProjectId);
                
                // Colors for the avatar initials
                const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#f97316', '#10b981'];
                const avatarColor = colors[idx % colors.length];
                
                return (
                  <tr 
                    key={proj.ProjectId} 
                    onClick={() => onSelectProject(proj)}
                    style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#f8fafc' } }}
                    className="project-row"
                  >
                    <td style={{ padding: '20px 24px', fontWeight: 500, color: '#1e293b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: avatarColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          {proj.ProjectName.charAt(0)}
                        </div>
                        {proj.ProjectName}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      {getStatusIcon(stats.status)}
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ 
                        backgroundColor: stats.status === 'Completed' ? '#d1fae5' : '#e0e7ff', 
                        color: stats.status === 'Completed' ? '#047857' : '#4f46e5', 
                        padding: '6px 12px', 
                        borderRadius: '6px', 
                        fontSize: '0.8rem', 
                        fontWeight: 600 
                      }}>
                        {stats.phase}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {stats.assignees.length === 0 ? (
                          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>-</span>
                        ) : (
                          <>
                            {stats.assignees.slice(0, 3).map((assignee, i) => (
                              <AssigneeAvatar key={i} assignee={assignee} i={i} />
                            ))}
                            {stats.assignees.length > 3 && (
                              <div style={{ 
                                width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f1f5f9', 
                                border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                fontSize: '10px', color: '#64748b', fontWeight: 'bold', marginLeft: '-8px', zIndex: 10 
                              }}>
                                +{stats.assignees.length - 3}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${stats.progress}%`, height: '100%', backgroundColor: stats.progress === 100 ? '#10b981' : '#4ade80', transition: 'width 0.5s ease-out' }}></div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                Showing <span style={{ fontWeight: 600, color: '#1e293b' }}>{indexOfFirstProject + 1}</span> to <span style={{ fontWeight: 600, color: '#1e293b' }}>{Math.min(indexOfLastProject, projects.length)}</span> of <span style={{ fontWeight: 600, color: '#1e293b' }}>{projects.length}</span> projects
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: currentPage === 1 ? '#f8fafc' : '#ffffff', color: currentPage === 1 ? '#cbd5e1' : '#475569', cursor: currentPage === 1 ? 'default' : 'pointer', fontWeight: 500, fontSize: '0.85rem' }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: currentPage === i + 1 ? '1px solid #3b82f6' : '1px solid transparent', borderRadius: '6px', backgroundColor: currentPage === i + 1 ? '#eff6ff' : 'transparent', color: currentPage === i + 1 ? '#2563eb' : '#64748b', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: currentPage === totalPages ? '#f8fafc' : '#ffffff', color: currentPage === totalPages ? '#cbd5e1' : '#475569', cursor: currentPage === totalPages ? 'default' : 'pointer', fontWeight: 500, fontSize: '0.85rem' }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .project-row:hover {
          background-color: #f8fafc !important;
        }
      `}</style>
    </div>
  );
};

export default ProjectsListView;
