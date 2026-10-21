'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Sparkles, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        pointerEvents: 'none',
        animation: 'popUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(16, 20, 31, 0.94)',
          border: '1px solid rgba(245, 176, 55, 0.4)',
          color: '#ffffff',
          fontSize: '0.88rem',
          fontWeight: 600,
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 176, 55, 0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Sparkles size={16} color="#f5b037" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
