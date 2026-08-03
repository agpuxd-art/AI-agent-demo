import React from 'react';
import { Columns, AlignLeft, SlidersHorizontal, Presentation, Upload } from 'lucide-react';

const FilterBar = () => {
  return (
    <div className="filter-bar" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '12px 24px', 
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      fontSize: '0.875rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', padding: '4px', borderRadius: '8px', gap: '8px' }}>
          <div style={{ padding: '6px', backgroundColor: '#ffffff', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Columns size={16} color="#3b82f6" />
          </div>
          <div style={{ padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <AlignLeft size={16} color="#94a3b8" />
          </div>
        </div>
        
        <div style={{ fontWeight: 600, color: '#334155' }}>View: All tasks</div>
        <div style={{ fontWeight: 600, color: '#334155' }}>Budget: All</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#475569' }}>
          Responsible <SlidersHorizontal size={16} color="#64748b" style={{ cursor: 'pointer' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', padding: '4px 10px 4px 4px', borderRadius: '16px', color: '#3b82f6', fontWeight: 500, fontSize: '0.8rem' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
            All
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px 10px 4px 4px', borderRadius: '16px', color: '#475569', fontWeight: 500, fontSize: '0.8rem' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#000000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>A</span>
            </div>
            Alice Smith
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px 10px 4px 4px', borderRadius: '16px', color: '#475569', fontWeight: 500, fontSize: '0.8rem' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#d946ef', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>J</div>
            John Doe
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b' }}>
          <Presentation size={18} style={{ cursor: 'pointer' }} />
          <Upload size={18} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
