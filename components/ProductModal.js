'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag, Check, Tag, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProductModal({ item, category, onClose }) {
  const { cart, addToCart, updateQty } = useCart();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!item) return null;

  const cartEntry = cart[item.id];
  const isInCart = Boolean(cartEntry);
  const qty = cartEntry ? cartEntry.qty : 0;
  const hasPrice = typeof item.price === 'number';

  const imageSrc = imgError
    ? (category?.img || '/assets/celebration.jpg')
    : (item.img || `/assets/items/item-${item.id}.jpg`);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 5, 12, 0.82)',
          backdropFilter: 'blur(12px)',
          animation: 'fadeIn 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0e1022',
          border: '1.5px solid rgba(255, 183, 3, 0.35)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 183, 3, 0.2)',
          zIndex: 1101,
          animation: 'popUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(7, 7, 18, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.15s',
          }}
        >
          <X size={18} />
        </button>

        {/* Large Product Image Preview */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '65%',
          backgroundColor: '#070712',
          overflow: 'hidden',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
        }}>
          <img
            src={imageSrc}
            alt={item.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '12px',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            padding: '3px 9px',
            borderRadius: '4px',
            backgroundColor: 'rgba(7, 7, 18, 0.85)',
            color: 'var(--c-gold-light)',
            fontSize: '0.75rem',
            fontWeight: 800,
            border: '1px solid rgba(255, 183, 3, 0.3)',
            fontFamily: 'monospace',
          }}>
            #{item.srNo ?? item.id}
          </div>
        </div>

        {/* Content Details */}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.74rem', color: '#ffb703', fontWeight: 700 }}>
                {category?.icon || '✨'} {category?.name || 'Crackers'}
              </span>
              {item.brand && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: 'var(--c-gold-light)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  textTransform: 'uppercase',
                }}>
                  <Tag size={10} strokeWidth={2.5} />
                  <span>{item.brand}</span>
                </span>
              )}
            </div>

            <h3 style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.25,
              marginBottom: '6px',
            }}>
              {item.name}
            </h3>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              {item.sub}
            </p>
          </div>

          {/* Price & Value Callout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 183, 3, 0.08)',
            border: '1px solid rgba(255, 183, 3, 0.25)',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700 }}>
                Selling Rate
              </div>
              {hasPrice ? (
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffb703', letterSpacing: '-0.02em' }}>
                  ₹{item.price.toLocaleString('en-IN')}{' '}
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 600 }}>/ piece</span>
                </div>
              ) : (
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fed976' }}>
                  Call for price
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: '#00f5d4', fontWeight: 700 }}>
              <ShieldCheck size={14} />
              <span>Sivakasi Direct</span>
            </div>
          </div>

          {/* Stepper / Add to Cart Actions */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isInCart ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.2) 0%, rgba(255, 42, 109, 0.15) 100%)',
                border: '1.5px solid #ffb703',
                borderRadius: 'var(--radius-full)',
                padding: '4px',
                minHeight: '44px',
              }}>
                <button
                  onClick={() => updateQty(item.id, -1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.14)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Minus size={15} strokeWidth={2.5} />
                </button>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffb703' }}>
                    {qty} in Cart
                  </span>
                  {hasPrice && (
                    <div style={{ fontSize: '0.72rem', color: '#fed976' }}>
                      = ₹{(item.price * qty).toLocaleString('en-IN')}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => updateQty(item.id, 1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                    color: '#090a0f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                  }}
                >
                  <Plus size={15} strokeWidth={2.8} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(item, category)}
                style={{
                  flex: 1,
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #ffb703 0%, #ff2a6d 100%)',
                  color: '#ffffff',
                  fontSize: '0.94rem',
                  fontWeight: 900,
                  boxShadow: '0 6px 20px rgba(255, 42, 109, 0.4)',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <ShoppingBag size={17} strokeWidth={2.4} />
                <span>Add to Cart ({hasPrice ? `₹${item.price}` : 'Call for price'})</span>
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-muted)',
                fontSize: '0.86rem',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
