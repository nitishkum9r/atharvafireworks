'use client';

import React from 'react';
import { sellers } from '@/data/sellers';
import { MessageCircle, Phone, Sparkles, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const openWhatsApp = (seller) => {
    const msg = `Namaste ${seller.name}! 🪔\n\nI'm contacting you from Atharva Fireworks (Diwali Crackers 2026 Collection). Please share the wholesale & retail price list and delivery options. Thank you!`;
    window.open(`https://wa.me/${seller.phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" style={{
      padding: 'clamp(3rem, 6vw, 4.5rem) 0',
      background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 42, 109, 0.1) 0%, transparent 60%), rgba(10, 12, 26, 0.7)',
      borderTop: '1px solid rgba(255, 183, 3, 0.2)',
      backdropFilter: 'blur(12px)',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(90deg, rgba(255, 183, 3, 0.15) 0%, rgba(255, 42, 109, 0.15) 100%)',
            border: '1px solid rgba(255, 183, 3, 0.35)',
            color: '#fed976',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.8rem',
          }}>
            <Sparkles size={14} color="#ffb703" />
            <span>Direct Representatives</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, marginBottom: '0.8rem', color: '#fff' }}>
            Direct Contact & Bulk Booking
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Connect with Harsh or Manoday directly for wholesale price lists, bulk box discounts, and home delivery arrangements.
          </p>
        </div>

        {/* Sellers Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          maxWidth: '800px',
          margin: '0 auto 2.5rem',
        }}>
          {Object.values(sellers).map((seller) => (
            <div
              key={seller.name}
              style={{
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(20, 24, 46, 0.85)',
                border: '1.5px solid rgba(255, 183, 3, 0.3)',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
              className="seller-card"
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ffb703 0%, #ff2a6d 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    boxShadow: '0 0 14px rgba(255, 42, 109, 0.4)',
                  }}>
                    {seller.name.charAt(0)}
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#25d366',
                    backgroundColor: 'rgba(37, 211, 102, 0.12)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                  }}>
                    ● Ready on WhatsApp
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', marginBottom: '2px' }}>
                  {seller.name}
                </h3>
                <div style={{ fontSize: '0.84rem', color: '#ffb703', fontWeight: 700, marginBottom: '1rem' }}>
                  {seller.role}
                </div>

                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.04em',
                }}>
                  {seller.display}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => openWhatsApp(seller)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    padding: '11px',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, #25d366 0%, #1ea952 100%)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                >
                  <MessageCircle size={16} strokeWidth={2.4} />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={`tel:${seller.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    padding: '11px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = '#ffb703';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                  }}
                >
                  <Phone size={15} color="#05d9e8" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Disclaimer */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(20, 24, 46, 0.65)',
          border: '1px solid rgba(255, 183, 3, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <ShieldCheck size={24} color="#00f5d4" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong style={{ color: '#fff' }}>Diwali Green Crackers Guarantee:</strong> Genuine Sivakasi manufactured fireworks. Always light crackers outdoors in open areas under adult supervision and keep a bucket of water handy.
          </div>
        </div>
      </div>

      <style jsx>{`
        .seller-card:hover {
          border-color: #ffb703;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 42, 109, 0.3);
        }
      `}</style>
    </section>
  );
}
