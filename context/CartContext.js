'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { sellers } from '@/data/sellers';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [chosenSeller, setChosenSeller] = useState('Harsh');
  const [toast, setToast] = useState(null);

  // Load cart from localStorage once mounted
  useEffect(() => {
    try {
      const saved = localStorage.getItem('atharva_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
      const savedSeller = localStorage.getItem('atharva_seller');
      if (savedSeller && sellers[savedSeller]) {
        setChosenSeller(savedSeller);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atharva_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save chosen seller
  useEffect(() => {
    try {
      localStorage.setItem('atharva_seller', chosenSeller);
    } catch (e) {
      console.error(e);
    }
  }, [chosenSeller]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 2800);
  };

  /**
   * addToCart:
   * Opens the cart preview ONLY if cart was previously empty/null.
   * If cart already contains items, it does NOT repeatedly open the drawer.
   * If cart becomes empty again, the next item added will open the preview.
   */
  const addToCart = (item, category, explicitOpen = null) => {
    const wasEmpty = Object.keys(cart).length === 0;

    setCart((prev) => {
      const existing = prev[item.id];
      const newQty = existing ? existing.qty + 1 : 1;
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          srNo: item.srNo,
          name: item.name,
          sub: item.sub,
          brand: item.brand,
          price: typeof item.price === 'number' ? item.price : null,
          categoryName: category?.name || item.categoryName || 'Crackers',
          categoryIcon: category?.icon || item.categoryIcon || '✨',
          img: item.img || `/assets/items/item-${item.id}.jpg`,
          fallbackImg: category?.img || '/assets/celebration.jpg',
          qty: newQty,
        },
      };
    });

    showToast(`Added "${item.name}" to cart ✨`, 'success');

    const shouldOpen = explicitOpen !== null ? explicitOpen : wasEmpty;
    if (shouldOpen) {
      setIsCartOpen(true);
    }
  };

  /**
   * addMultipleToCart:
   * Batch adds an array of items (e.g. curated festive combos) in 1 click
   */
  const addMultipleToCart = (itemsList, bundleName) => {
    const wasEmpty = Object.keys(cart).length === 0;

    setCart((prev) => {
      const updated = { ...prev };
      itemsList.forEach((it) => {
        const existing = updated[it.id];
        const addQty = it.qty || 1;
        const newQty = existing ? existing.qty + addQty : addQty;
        updated[it.id] = {
          id: it.id,
          srNo: it.srNo,
          name: it.name,
          sub: it.sub,
          brand: it.brand,
          price: typeof it.price === 'number' ? it.price : null,
          categoryName: it.categoryName || 'Diwali Pack',
          categoryIcon: it.categoryIcon || '🎁',
          img: it.img || `/assets/items/item-${it.id}.jpg`,
          fallbackImg: it.fallbackImg || '/assets/celebration.jpg',
          qty: newQty,
        };
      });
      return updated;
    });

    showToast(`Added "${bundleName || 'Festive Combo'}" (${itemsList.length} items) to cart! 🪔`, 'success');

    if (wasEmpty) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      const item = updated[itemId];
      delete updated[itemId];
      if (item) {
        showToast(`Removed "${item.name}"`, 'info');
      }
      return updated;
    });
  };

  const updateQty = (itemId, delta) => {
    setCart((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      const newQty = existing.qty + delta;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[itemId];
        showToast(`Removed "${existing.name}"`, 'info');
        return updated;
      }
      return {
        ...prev,
        [itemId]: { ...existing, qty: newQty },
      };
    });
  };

  const clearCart = () => {
    setCart({});
    showToast('Cart cleared', 'info');
  };

  const toggleItemInCart = (item, category) => {
    if (cart[item.id]) {
      removeFromCart(item.id);
    } else {
      addToCart(item, category);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Totals calculations
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

  const totalAmount = Object.values(cart).reduce((sum, item) => {
    if (typeof item.price === 'number') {
      return sum + item.price * item.qty;
    }
    return sum;
  }, 0);

  const unpricedCount = Object.values(cart).reduce((sum, item) => {
    if (typeof item.price !== 'number') {
      return sum + item.qty;
    }
    return sum;
  }, 0);

  const getOrderText = () => {
    const items = Object.values(cart);
    if (!items.length) return '';

    const seller = sellers[chosenSeller] || sellers.Harsh;
    const lines = items
      .map((it) => {
        const priceInfo = typeof it.price === 'number'
          ? `₹${(it.price * it.qty).toLocaleString('en-IN')} (@ ₹${it.price.toLocaleString('en-IN')})`
          : 'Call for price';
        return `• ${it.name} × ${it.qty} = ${priceInfo}`;
      })
      .join('\n');

    let totalText = `💰 Estimated Total: ₹${totalAmount.toLocaleString('en-IN')}`;
    if (unpricedCount > 0) {
      totalText += ` (+ ${unpricedCount} call-for-price items)`;
    }

    return `Namaste ${seller.name}! 🪔\n\nI would like to place an order from Atharva Fireworks (Diwali 2026 PDF Catalog):\n\n📦 My Order Items (${totalItems} total crackers):\n${lines}\n\n${totalText}\n\n📢 Note: Bulk orders get exclusive discounts. Please confirm item availability and dispatch details.\n\nThank you!`;
  };

  const sendWhatsAppOrder = () => {
    const items = Object.values(cart);
    if (!items.length) return;

    const seller = sellers[chosenSeller] || sellers.Harsh;
    const msg = getOrderText();
    const url = `https://wa.me/${seller.phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalAmount,
        unpricedCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleItemInCart,
        chosenSeller,
        setChosenSeller,
        toast,
        showToast,
        getOrderText,
        sendWhatsAppOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
