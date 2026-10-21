'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingMobileCart() {
  const { totalItems, totalAmount, openCart } = useCart();

  if (totalItems <= 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '12px',
        right: '12px',
        zIndex: 90,
        display: 'flex',
        justifyContent: 'center',
        animation: 'popUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="mobile-cart-bar"
    >
      <button
        onClick={openCart}
        style={{
          width: '100%',
          maxWidth: '460px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 50%, #ff0055 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 42, 109, 0.4)',
          border: '1.5px solid rgba(255, 255, 255, 0.4)',
          fontWeight: 900,
          fontSize: '0.92rem',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            color: '#ff0055',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.84rem',
            fontWeight: 900,
          }}>
            {totalItems}
          </div>
          <div>
            <span>{totalItems === 1 ? '1 Cracker' : `${totalItems} Crackers`}</span>
            {totalAmount > 0 && (
              <span style={{ marginLeft: '6px', opacity: 0.95, fontWeight: 800 }}>
                • ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>View Cart</span>
          <ArrowRight size={17} strokeWidth={2.8} />
        </div>
      </button>

      <style jsx>{`
        @media (min-width: 992px) {
          .mobile-cart-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
