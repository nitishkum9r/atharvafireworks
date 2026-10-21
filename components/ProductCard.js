'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Check, ShoppingBag, Tag } from 'lucide-react';

export default function ProductCard({ item, category }) {
  const { cart, addToCart, updateQty } = useCart();
  const [imgError, setImgError] = useState(false);

  const cartEntry = cart[item.id];
  const isInCart = Boolean(cartEntry);
  const qty = cartEntry ? cartEntry.qty : 0;

  // Each item has its own distinct photo; fallback gracefully to category image if missing
  const imageSrc = imgError
    ? (category?.img || '/assets/celebration.jpg')
    : (item.img || `/assets/items/item-${item.id}.jpg`);

  const hasPrice = typeof item.price === 'number';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)',
        backgroundColor: isInCart ? 'rgba(26, 22, 46, 0.94)' : 'rgba(16, 18, 34, 0.82)',
        border: isInCart
          ? '1.5px solid #ffb703'
          : '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isInCart
          ? '0 8px 24px -4px rgba(255, 183, 3, 0.28)'
          : '0 8px 20px -6px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        height: '100%',
      }}
      className="product-card"
    >
      {/* Product Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '68%',
        backgroundColor: '#0a0b16',
        overflow: 'hidden',
      }}>
        <img
          src={imageSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          className="product-card-img"
        />

        {/* Ambient gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(7, 7, 18, 0.4) 0%, transparent 45%, rgba(7, 7, 18, 0.75) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Category Emoji Badge */}
        <div style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          padding: '2px 7px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(7, 7, 18, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          fontSize: '0.78rem',
          lineHeight: 1,
          zIndex: 2,
        }}>
          {category?.icon || '✨'}
        </div>

        {/* Sr No Badge */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: '6px',
          padding: '2px 6px',
          borderRadius: '4px',
          backgroundColor: 'rgba(7, 7, 18, 0.85)',
          color: 'var(--c-gold-light)',
          fontSize: '0.64rem',
          fontWeight: 800,
          letterSpacing: '0.04em',
          border: '1px solid rgba(255, 183, 3, 0.3)',
          fontFamily: 'monospace',
          zIndex: 2,
        }}>
          #{item.srNo ?? item.id}
        </div>

        {/* In Cart Indicator */}
        {isInCart && (
          <div style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            padding: '2px 7px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
            color: '#090a0f',
            fontSize: '0.64rem',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            zIndex: 2,
          }}>
            <Check size={10} strokeWidth={3.5} />
            <span>IN CART ({qty})</span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div style={{
        padding: 'clamp(0.65rem, 2vw, 0.95rem)',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        gap: '6px',
      }}>
        <div>
          {/* Brand Tag */}
          {item.brand && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '0.65rem',
              fontWeight: 800,
              color: 'var(--c-gold-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '2px',
            }}>
              <Tag size={9} strokeWidth={2.5} />
              <span>{item.brand}</span>
            </div>
          )}

          {/* Product Name */}
          <h3 style={{
            fontSize: 'clamp(0.82rem, 2.3vw, 0.96rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.28,
            marginBottom: '4px',
            minHeight: '2.5em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {item.name}
          </h3>

          {/* Subtitle / Description */}
          <p style={{
            fontSize: 'clamp(0.68rem, 1.8vw, 0.78rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.32,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {item.sub}
          </p>
        </div>

        {/* Pricing & Cart Action Area */}
        <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
          {/* Price Row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '3px',
            marginBottom: '7px',
            paddingTop: '4px',
            borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
          }}>
            <span style={{ fontSize: '0.66rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              Selling Rate:
            </span>

            {hasPrice ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                  fontWeight: 900,
                  color: '#ffb703',
                  letterSpacing: '-0.02em',
                }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>
                  /pc
                </span>
              </div>
            ) : (
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#fed976',
                background: 'rgba(255, 183, 3, 0.12)',
                border: '1px solid rgba(255, 183, 3, 0.3)',
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.02em',
              }}>
                Call for price
              </span>
            )}
          </div>

          {/* Stepper / Add to Cart Button */}
          {isInCart ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.2) 0%, rgba(255, 42, 109, 0.15) 100%)',
              border: '1px solid #ffb703',
              borderRadius: 'var(--radius-full)',
              padding: '2px 3px',
              minHeight: '36px',
            }}>
              <button
                onClick={() => updateQty(item.id, -1)}
                aria-label={`Decrease ${item.name}`}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s',
                  flexShrink: 0,
                }}
              >
                <Minus size={13} strokeWidth={2.5} />
              </button>

              <div style={{ textAlign: 'center', padding: '0 4px' }}>
                <span style={{
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  color: '#ffb703',
                  minWidth: '20px',
                  display: 'inline-block',
                }}>
                  {qty}
                </span>
                {hasPrice && (
                  <div style={{ fontSize: '0.6rem', color: '#fed976', lineHeight: 1 }}>
                    ₹{(item.price * qty).toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              <button
                onClick={() => updateQty(item.id, 1)}
                aria-label={`Increase ${item.name}`}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                  color: '#090a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                <Plus size={13} strokeWidth={2.8} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item, category)}
              aria-label={`Add ${item.name} to Cart`}
              style={{
                width: '100%',
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '7px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.12) 0%, rgba(255, 42, 109, 0.12) 100%)',
                border: '1px solid rgba(255, 183, 3, 0.35)',
                color: '#ffffff',
                fontSize: 'clamp(0.74rem, 2vw, 0.84rem)',
                fontWeight: 700,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffb703 0%, #ff2a6d 100%)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 42, 109, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 183, 3, 0.12) 0%, rgba(255, 42, 109, 0.12) 100%)';
                e.currentTarget.style.borderColor = 'rgba(255, 183, 3, 0.35)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ShoppingBag size={13} strokeWidth={2.4} color="#ffb703" />
              <span>+ Add to Cart</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .product-card:hover .product-card-img {
          transform: scale(1.05);
        }
        .product-card:hover {
          border-color: rgba(255, 183, 3, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -4px rgba(255, 42, 109, 0.25);
        }
      `}</style>
    </div>
  );
}
