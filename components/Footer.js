import React from 'react';
import { Flame, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: '#07080c',
      padding: '3rem 0 2rem',
      color: 'var(--text-dim)',
      fontSize: '0.85rem',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f5b037 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Flame size={18} color="#090a0f" />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>
                Atharva Fireworks
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                Premium Sivakasi Crackers Collection 2026
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontWeight: 600, color: 'var(--text-muted)' }}>
            <a href="#catalog">Catalog</a>
            <a href="#brands">Brands</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div style={{
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.78rem',
        }}>
          <div>
            © 2026 Atharva Fireworks. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Crafted with</span>
            <Heart size={14} color="#ef4444" fill="#ef4444" />
            <span>for a brighter, safer Diwali</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
