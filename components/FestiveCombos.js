'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { festiveCombos } from '@/data/combos';
import { Sparkles, ShoppingBag, Check, Gift } from 'lucide-react';

export default function FestiveCombos() {
  const { cart, addMultipleToCart } = useCart();

  return (
    <section style={{
      padding: 'clamp(1.8rem, 4vw, 3rem) 0 1rem',
      position: 'relative',
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '1.75rem',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(90deg, rgba(255, 183, 3, 0.18) 0%, rgba(255, 42, 109, 0.18) 100%)',
            border: '1px solid rgba(255, 183, 3, 0.35)',
            color: '#fed976',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}>
            <Gift size={14} color="#ffb703" />
            <span>1-Click Curated Diwali Bundles</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}>
            Save Time with <span className="festive-gradient-text">Festive Combo Packs</span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            lineHeight: 1.45,
          }}>
            Handcrafted assortments with the best sparklers, anars, chakkars & aerial sky shots. Add the whole box in 1 click!
          </p>
        </div>

        {/* Combos Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '16px',
        }}>
          {festiveCombos.map((combo) => {
            // Check if all items of this combo are in cart
            const allInCart = combo.items.every((it) => cart[it.id]?.qty > 0);

            return (
              <div
                key={combo.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'rgba(20, 24, 46, 0.88)',
                  border: `1.5px solid ${combo.badgeColor}55`,
                  overflow: 'hidden',
                  boxShadow: `0 10px 30px -8px ${combo.badgeColor}25`,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  position: 'relative',
                }}
                className="combo-card"
              >
                {/* Banner / Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '46%',
                  backgroundColor: '#0c0d1c',
                  overflow: 'hidden',
                }}>
                  <img
                    src={combo.img}
                    alt={combo.name}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.85,
                      filter: 'brightness(0.9)',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(7, 7, 18, 0.2) 0%, rgba(7, 7, 18, 0.85) 100%)',
                  }} />

                  {/* Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: combo.badgeColor,
                    color: '#090a0f',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}>
                    {combo.badge}
                  </div>

                  {/* Price overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '12px',
                    textAlign: 'right',
                  }}>
                    <span style={{
                      fontSize: '0.72rem',
                      textDecoration: 'line-through',
                      color: 'rgba(255,255,255,0.6)',
                      marginRight: '6px',
                    }}>
                      ₹{combo.originalValue}
                    </span>
                    <span style={{
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      color: '#ffb703',
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    }}>
                      ₹{combo.specialPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                  gap: '10px',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{combo.icon}</span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>
                        {combo.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      {combo.tagline}
                    </p>

                    {/* Included Crackers Summary Pill List */}
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 10px',
                      fontSize: '0.74rem',
                      color: 'var(--text-dim)',
                      lineHeight: 1.45,
                    }}>
                      <div style={{ fontWeight: 800, color: 'var(--c-gold-light)', marginBottom: '3px' }}>
                        Includes {combo.itemsCount} curated items:
                      </div>
                      <div style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {combo.items.map((it) => it.name.replace(/CRACKER|FW|SECTION/gi, '').trim()).join(' • ')}
                      </div>
                    </div>
                  </div>

                  {/* Add Bundle Button */}
                  <button
                    onClick={() => addMultipleToCart(combo.items, combo.name)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 'var(--radius-full)',
                      background: allInCart
                        ? 'linear-gradient(135deg, rgba(37, 211, 102, 0.25) 0%, rgba(37, 211, 102, 0.4) 100%)'
                        : `linear-gradient(135deg, ${combo.badgeColor} 0%, #ffb703 100%)`,
                      border: allInCart ? '1px solid #25d366' : 'none',
                      color: allInCart ? '#25d366' : '#090a0f',
                      fontSize: '0.86rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '7px',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, filter 0.15s ease',
                      boxShadow: allInCart ? 'none' : `0 4px 16px ${combo.badgeColor}40`,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    {allInCart ? (
                      <>
                        <Check size={16} strokeWidth={3} />
                        <span>Bundle in Cart • Add Another Pack</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} strokeWidth={2.6} />
                        <span>Add Full {combo.name.split(' ')[0]} Pack (₹{combo.specialPrice})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .combo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 35px rgba(255, 183, 3, 0.25);
        }
      `}</style>
    </section>
  );
}
