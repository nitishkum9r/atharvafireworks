'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Sparkles, Phone, Flame } from 'lucide-react';

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(7, 7, 18, 0.82)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 183, 3, 0.2)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ffb703 0%, #ff2a6d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(255, 42, 109, 0.4)',
            flexShrink: 0,
          }}>
            <Flame size={22} color="#ffffff" strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span className="festive-gradient-text">Atharva</span>
              <span style={{ color: '#ffffff' }}>Fireworks</span>
            </div>
            <div style={{
              fontSize: '0.66rem',
              fontWeight: 700,
              color: '#ffb703',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Diwali Collection 2026
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '24px',
          fontSize: '0.92rem',
          fontWeight: 700,
        }} className="desktop-nav">
          <a href="#catalog" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = '#ffb703'}
             onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            Crackers Catalog
          </a>
          <a href="#brands" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = '#ffb703'}
             onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            Top Brands
          </a>
          <a href="#contact" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = '#ffb703'}
             onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            Contact Sellers
          </a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="#contact"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              transition: 'all 0.2s ease',
            }}
            className="call-action-btn"
          >
            <Phone size={13} color="#05d9e8" />
            <span>Direct Call</span>
          </a>

          {/* Cart Button with vibrant glow */}
          <button
            id="navbar-cart-btn"
            onClick={toggleCart}
            aria-label="View Cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: totalItems > 0 
                ? 'linear-gradient(135deg, #ffb703 0%, #fb8500 50%, #ff0055 100%)' 
                : 'linear-gradient(135deg, rgba(255, 183, 3, 0.15) 0%, rgba(255, 42, 109, 0.15) 100%)',
              color: '#ffffff',
              border: totalItems > 0 ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 183, 3, 0.35)',
              fontSize: '0.88rem',
              fontWeight: 800,
              boxShadow: totalItems > 0 ? '0 0 20px rgba(255, 42, 109, 0.5)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <ShoppingBag size={17} strokeWidth={2.4} />
            <span style={{ letterSpacing: '0.02em' }}>Cart</span>
            {totalItems > 0 && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '22px',
                height: '22px',
                padding: '0 6px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#ffffff',
                color: '#ff0055',
                fontSize: '0.78rem',
                fontWeight: 900,
                lineHeight: 1,
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .call-action-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
