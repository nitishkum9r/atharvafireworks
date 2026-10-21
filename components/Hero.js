'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award, Flame, ShoppingBag } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(2.5rem, 6vw, 5rem) 0 clamp(2rem, 5vw, 4rem)',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          {/* Festive Colorful Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 18px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(90deg, rgba(255, 42, 109, 0.18) 0%, rgba(255, 183, 3, 0.18) 50%, rgba(5, 217, 232, 0.18) 100%)',
            border: '1px solid rgba(255, 183, 3, 0.4)',
            color: '#fed976',
            fontSize: 'clamp(0.75rem, 2vw, 0.88rem)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '1.25rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(255, 183, 3, 0.15)',
          }}>
            <Sparkles size={16} color="#ffb703" />
            <span>Diwali 2026 Collection • Sivakasi Factory Direct</span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 6vw, 4.2rem)',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
            fontWeight: 900,
            letterSpacing: '-0.03em',
          }}>
            Ignite the Sky with{' '}
            <span className="festive-gradient-text">Atharva Fireworks</span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(0.95rem, 2.2vw, 1.22rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '700px',
            margin: '0 auto 2rem',
            fontWeight: 400,
          }}>
            Sparkling golden sparklers, high-rising aerial shots, colourful flower pots & traditional celebration crackers. Handpicked from 24 Sivakasi manufacturers with direct WhatsApp booking.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '2.5rem',
          }}>
            <a
              href="#catalog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                padding: '13px 26px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 50%, #ff0055 100%)',
                color: '#ffffff',
                fontSize: '0.98rem',
                fontWeight: 800,
                boxShadow: '0 8px 25px rgba(255, 183, 3, 0.4)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 0, 85, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 183, 3, 0.4)';
              }}
            >
              <ShoppingBag size={18} strokeWidth={2.4} />
              <span>Explore Collection</span>
              <ArrowRight size={17} strokeWidth={2.4} />
            </a>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 700,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 183, 3, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span>Contact Wholesalers</span>
            </a>

            <button
              onClick={() => window.print()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 183, 3, 0.12)',
                border: '1px solid rgba(255, 183, 3, 0.4)',
                color: '#fed976',
                fontSize: '0.95rem',
                fontWeight: 800,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 183, 3, 0.22)';
                e.currentTarget.style.borderColor = '#ffb703';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 183, 3, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 183, 3, 0.4)';
              }}
            >
              <span>📄 Print Price List</span>
            </button>
          </div>

          {/* Quick Value Cards - Colorful glassmorphism */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px',
            maxWidth: '820px',
            margin: '0 auto',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.1) 0%, rgba(20, 24, 44, 0.7) 100%)',
              border: '1px solid rgba(255, 183, 3, 0.25)',
              backdropFilter: 'blur(12px)',
              textAlign: 'left',
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(255, 183, 3, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Award size={20} color="#ffb703" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>24 Top Brands</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Standard, Anil, Pothi & more</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.1) 0%, rgba(20, 24, 44, 0.7) 100%)',
              border: '1px solid rgba(0, 245, 212, 0.25)',
              backdropFilter: 'blur(12px)',
              textAlign: 'left',
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(0, 245, 212, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <ShieldCheck size={20} color="#00f5d4" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>Certified Green</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Low smoke & emission tested</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(5, 217, 232, 0.1) 0%, rgba(20, 24, 44, 0.7) 100%)',
              border: '1px solid rgba(5, 217, 232, 0.25)',
              backdropFilter: 'blur(12px)',
              textAlign: 'left',
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(5, 217, 232, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Truck size={20} color="#05d9e8" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>Instant WhatsApp</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Direct price list & delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
