'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Check, ShoppingBag, Tag } from 'lucide-react';

export default function ProductListRow({ item, category, onViewDetails }) {
  const { cart, addToCart, updateQty } = useCart();
  const [imgError, setImgError] = useState(false);

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: isInCart ? 'rgba(26, 22, 46, 0.92)' : 'rgba(16, 18, 34, 0.72)',
        border: isInCart ? '1.5px solid #ffb703' : '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.18s ease',
      }}
      className="product-list-row"
    >
      {/* Left: Thumbnail & Details */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
        {/* Sr No */}
        <span style={{
          fontSize: '0.68rem',
          fontFamily: 'monospace',
          color: 'var(--c-gold-light)',
          fontWeight: 800,
          minWidth: '28px',
          textAlign: 'center',
        }}>
          #{item.srNo ?? item.id}
        </span>

        {/* Thumbnail */}
        <div
          onClick={() => onViewDetails?.(item, category)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '6px',
            overflow: 'hidden',
            backgroundColor: '#0a0b16',
            flexShrink: 0,
            cursor: 'pointer',
            position: 'relative',
          }}
          title="Tap to preview"
        >
          <img
            src={imageSrc}
            alt={item.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Name & Subtitle */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h4
              onClick={() => onViewDetails?.(item, category)}
              style={{
                fontSize: 'clamp(0.82rem, 2.2vw, 0.92rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.25,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
              }}
              title={item.name}
            >
              {item.name}
            </h4>
            {item.brand && (
              <span style={{
                fontSize: '0.62rem',
                color: 'var(--c-gold-light)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                padding: '1px 5px',
                borderRadius: '3px',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {item.brand}
              </span>
            )}
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.sub}
          </div>
        </div>
      </div>

      {/* Right: Price & Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {/* Price */}
        <div style={{ textAlign: 'right', minWidth: '70px' }}>
          {hasPrice ? (
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#ffb703' }}>
                ₹{item.price.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>
                per pc
              </div>
            </div>
          ) : (
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: '#fed976',
              background: 'rgba(255, 183, 3, 0.12)',
              border: '1px solid rgba(255, 183, 3, 0.3)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}>
              Call
            </span>
          )}
        </div>

        {/* Action Button / Stepper */}
        <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'flex-end' }}>
          {isInCart ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.2) 0%, rgba(255, 42, 109, 0.15) 100%)',
              border: '1px solid #ffb703',
              borderRadius: 'var(--radius-full)',
              padding: '2px 4px',
            }}>
              <button
                onClick={() => updateQty(item.id, -1)}
                aria-label="Decrease"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Minus size={11} strokeWidth={2.5} />
              </button>
              <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#ffb703', minWidth: '18px', textAlign: 'center' }}>
                {qty}
              </span>
              <button
                onClick={() => updateQty(item.id, 1)}
                aria-label="Increase"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                  color: '#090a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                }}
              >
                <Plus size={11} strokeWidth={2.8} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item, category)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.15) 0%, rgba(255, 42, 109, 0.15) 100%)',
                border: '1px solid rgba(255, 183, 3, 0.35)',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffb703 0%, #ff2a6d 100%)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 183, 3, 0.15) 0%, rgba(255, 42, 109, 0.15) 100%)';
                e.currentTarget.style.color = '#fff';
              }}
            >
              <Plus size={12} strokeWidth={2.8} color="#ffb703" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
