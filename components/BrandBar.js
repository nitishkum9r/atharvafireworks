'use client';

import React from 'react';
import { brandsData } from '@/data/brands';
import { Sparkles, X } from 'lucide-react';

export default function BrandBar({ activeBrand, onSelectBrand }) {
  return (
    <section id="brands" style={{
      padding: '1.5rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(10, 12, 26, 0.55)',
      backdropFilter: 'blur(12px)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.85rem',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ffb703',
              boxShadow: '0 0 10px #ffb703',
            }} />
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              color: 'var(--c-gold-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              24 Authentic Sivakasi Brands
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'none' }} className="brand-hint">
              (Tap to filter items)
            </span>
          </div>

          {activeBrand && (
            <button
              onClick={() => onSelectBrand(null)}
              style={{
                fontSize: '0.78rem',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #ff0055 0%, #ff5400 100%)',
                fontWeight: 700,
                boxShadow: '0 2px 10px rgba(255, 0, 85, 0.35)',
              }}
            >
              <span>Filtering: <strong>{activeBrand}</strong></span>
              <X size={13} strokeWidth={2.8} />
            </button>
          )}
        </div>

        {/* Brand Horizontal Carousel */}
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {brandsData.map((brand) => {
            const isSelected = activeBrand?.toLowerCase() === brand.name.toLowerCase();
            return (
              <button
                key={brand.name}
                onClick={() => onSelectBrand(isSelected ? null : brand.name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 13px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSelected
                    ? 'rgba(255, 183, 3, 0.22)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected
                    ? '1px solid #ffb703'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isSelected ? '#ffb703' : 'var(--text-main)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected ? '0 0 12px rgba(255, 183, 3, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 183, 3, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <img
                  src={`/assets/brands/${brand.file}`}
                  alt={`${brand.name} logo`}
                  style={{
                    width: '18px',
                    height: '18px',
                    objectFit: 'contain',
                    borderRadius: '3px',
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span>{brand.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .brand-hint {
            display: inline !important;
          }
        }
      `}</style>
    </section>
  );
}
