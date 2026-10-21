'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { brandLogoMap } from '@/data/brands';

export default function CategorySection({ category, onBrandClick }) {
  const uniqueBrands = [...new Set(category.brands || [])];

  return (
    <div
      id={`cat-${category.id}`}
      style={{
        marginBottom: '2.5rem',
        scrollMarginTop: '80px',
      }}
    >
      {/* Category Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        padding: '0.8rem 1rem',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(90deg, rgba(26, 22, 46, 0.95) 0%, rgba(14, 16, 31, 0.88) 100%)',
        border: '1px solid rgba(255, 183, 3, 0.25)',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.4)',
        marginBottom: '0.85rem',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.25) 0%, rgba(255, 42, 109, 0.25) 100%)',
            border: '1px solid rgba(255, 183, 3, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 900,
            color: '#fed976',
            fontFamily: 'Outfit, sans-serif',
            flexShrink: 0,
          }}>
            {String(category.id).padStart(2, '0')}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.15rem' }}>{category.icon}</span>
              <h2 style={{
                fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>
                {category.name}
              </h2>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {category.type} • {category.items.length} items
            </div>
          </div>
        </div>

        {/* Brands in this category */}
        {uniqueBrands.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontSize: '0.64rem',
              fontWeight: 800,
              color: 'var(--c-gold-light)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginRight: '2px',
            }}>
              Brands:
            </span>
            {uniqueBrands.map((brand) => {
              const logoFile = brandLogoMap[brand.toLowerCase()];
              return (
                <button
                  key={brand}
                  onClick={() => onBrandClick?.(brand)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ffb703';
                    e.currentTarget.style.background = 'rgba(255, 183, 3, 0.15)';
                    e.currentTarget.style.color = '#ffb703';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  title={`Filter by ${brand}`}
                >
                  {logoFile && (
                    <img
                      src={`/assets/brands/${logoFile}`}
                      alt={brand}
                      style={{
                        width: '12px',
                        height: '12px',
                        objectFit: 'contain',
                        borderRadius: '2px',
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <span>{brand}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Responsive Grid: 2 columns on mobile, 3-4 columns on tablet/desktop */}
      <div className="product-grid">
        {category.items.map((item) => (
          <ProductCard key={item.id} item={item} category={category} />
        ))}
      </div>

      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        @media (min-width: 480px) {
          .product-grid {
            gap: 12px;
          }
        }
        @media (min-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
            gap: 14px;
          }
        }
        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
