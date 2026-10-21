'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { sellers } from '@/data/sellers';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight, Sparkles, Percent, Copy, Check, ShieldCheck, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    totalItems,
    totalAmount,
    unpricedCount,
    isCartOpen,
    closeCart,
    updateQty,
    removeFromCart,
    clearCart,
    chosenSeller,
    setChosenSeller,
    getOrderText,
    sendWhatsAppOrder,
    showToast,
  } = useCart();

  const [copied, setCopied] = useState(false);
  const items = Object.values(cart);
  const seller = sellers[chosenSeller] || sellers.Harsh;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  const copyOrderText = async () => {
    try {
      const text = getOrderText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Order details copied to clipboard! 📋', 'success');
      setTimeout(() => setCopied(false), 2400);
    } catch (e) {
      console.error(e);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999 }}>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 5, 12, 0.78)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping Cart"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#0c0d1c',
          borderLeft: '1.5px solid rgba(255, 183, 3, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.1rem 1.4rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(90deg, rgba(26, 22, 46, 0.95) 0%, rgba(14, 16, 31, 0.9) 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ffb703 0%, #ff2a6d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(255, 42, 109, 0.4)',
            }}>
              <ShoppingBag size={18} color="#ffffff" strokeWidth={2.4} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff' }}>My Order Cart</h2>
              <div style={{ fontSize: '0.74rem', color: '#ffb703', fontWeight: 700 }}>
                {totalItems} {totalItems === 1 ? 'item' : 'items'} ({items.length} types)
              </div>
            </div>
          </div>

          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.1rem 1.4rem',
        }}>
          {items.length === 0 ? (
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'var(--text-muted)',
              padding: '2rem 1rem',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.15) 0%, rgba(255, 42, 109, 0.15) 100%)',
                border: '1px dashed rgba(255, 183, 3, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <ShoppingBag size={28} strokeWidth={1.8} color="#ffb703" />
              </div>
              <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.5, maxWidth: '240px', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                Click "+ Add to Cart" on any cracker or curated bundle to add it here.
              </p>
              <button
                onClick={closeCart}
                style={{
                  padding: '9px 22px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                  color: '#090a0f',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 14px rgba(255, 183, 3, 0.35)',
                  cursor: 'pointer',
                }}
              >
                Browse Crackers
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((item) => {
                const hasPrice = typeof item.price === 'number';
                const lineTotal = hasPrice ? item.price * item.qty : null;

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(20, 24, 46, 0.85)',
                      border: '1px solid rgba(255, 183, 3, 0.2)',
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src = item.fallbackImg;
                      }}
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        backgroundColor: '#000',
                        flexShrink: 0,
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: 800,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.name}
                      </div>

                      <div style={{ fontSize: '0.7rem', color: '#ffb703', marginBottom: '6px', fontWeight: 600 }}>
                        {item.categoryIcon} {item.categoryName} {item.brand ? `• ${item.brand}` : ''}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        {/* Stepper */}
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: 'var(--radius-full)',
                          padding: '2px 6px',
                        }}>
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            aria-label="Decrease"
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              cursor: 'pointer',
                            }}
                          >
                            <Minus size={11} strokeWidth={2.5} />
                          </button>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fed976', minWidth: '18px', textAlign: 'center' }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            aria-label="Increase"
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffb703',
                              cursor: 'pointer',
                            }}
                          >
                            <Plus size={11} strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div style={{ textAlign: 'right' }}>
                          {hasPrice ? (
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#ffb703' }}>
                                ₹{lineTotal.toLocaleString('en-IN')}
                              </div>
                              <div style={{ fontSize: '0.64rem', color: 'var(--text-dim)' }}>
                                ₹{item.price} × {item.qty}
                              </div>
                            </div>
                          ) : (
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              color: '#fed976',
                              background: 'rgba(255, 183, 3, 0.12)',
                              border: '1px solid rgba(255, 183, 3, 0.3)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                            }}>
                              Call for price
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      style={{
                        color: 'var(--text-dim)',
                        padding: '8px',
                        borderRadius: '6px',
                        transition: 'all 0.15s ease',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ff0055';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-dim)';
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: Totals, Discounts, Seller Picker & WhatsApp Order */}
        {items.length > 0 && (
          <div style={{
            padding: '1.1rem 1.4rem',
            borderTop: '1px solid rgba(255, 183, 3, 0.25)',
            backgroundColor: 'rgba(14, 16, 31, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {/* Grand Total & Line Breakdown */}
            <div style={{
              backgroundColor: 'rgba(255, 183, 3, 0.08)',
              border: '1px solid rgba(255, 183, 3, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Estimated Total ({totalItems} items):
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffb703', letterSpacing: '-0.02em' }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {unpricedCount > 0 && (
                <div style={{ fontSize: '0.7rem', color: '#fed976', lineHeight: 1.35 }}>
                  * Plus {unpricedCount} item{unpricedCount > 1 ? 's' : ''} marked "Call for price" (quoted directly on WhatsApp).
                </div>
              )}

              {/* Bulk discount callout from PDF */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '6px',
                paddingTop: '6px',
                borderTop: '1px dashed rgba(255, 183, 3, 0.2)',
                fontSize: '0.72rem',
                color: '#00f5d4',
                fontWeight: 700,
              }}>
                <Percent size={13} strokeWidth={2.6} />
                <span>Bulk / wholesale discounts applied on final order!</span>
              </div>
            </div>

            {/* Trust Signals */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '4px 0',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} color="#00f5d4" />
                <span>No Advance Payment</span>
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={12} color="#05d9e8" />
                <span>Sivakasi Direct Stock</span>
              </span>
            </div>

            {/* Seller Choice */}
            <div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: 'var(--c-gold-light)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}>
                Send Order To Representative:
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                {Object.values(sellers).map((s) => {
                  const isSelected = chosenSeller === s.name;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setChosenSeller(s.name)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isSelected ? 'rgba(255, 183, 3, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1.5px solid #ffb703' : '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        color: isSelected ? '#fed976' : '#fff',
                      }}>
                        {s.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                        {s.display}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action: WhatsApp CTA */}
            <button
              onClick={sendWhatsAppOrder}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #25d366 0%, #1ea952 100%)',
                color: '#ffffff',
                fontSize: '0.94rem',
                fontWeight: 900,
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.filter = 'brightness(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              <MessageCircle size={18} strokeWidth={2.4} />
              <span>Send Order via WhatsApp (₹{totalAmount.toLocaleString('en-IN')})</span>
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>

            {/* Secondary Action: Copy Order Text */}
            <button
              onClick={copyOrderText}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: copied ? '#00f5d4' : '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} color="#00f5d4" strokeWidth={3} />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={13} strokeWidth={2.4} />
                  <span>Copy Order Summary Text</span>
                </>
              )}
            </button>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              style={{
                width: '100%',
                padding: '4px',
                fontSize: '0.74rem',
                color: 'var(--text-dim)',
                textAlign: 'center',
                transition: 'color 0.2s',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff0055')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              Clear all items
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
