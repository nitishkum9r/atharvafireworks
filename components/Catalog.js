'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { categories } from '@/data/categories';
import CategorySection from './CategorySection';
import BrandBar from './BrandBar';
import ProductModal from './ProductModal';
import { Search, X, Sparkles, Filter, LayoutGrid, List, ArrowUp, Printer, FileText } from 'lucide-react';

const CATEGORY_TABS = [
  'All',
  'Bombs',
  'Flower Pots',
  'Sparklers',
  'Rockets',
  'Fancy Shots',
  'Chakkars',
  'Other Crackers',
];

export default function Catalog() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeBrand, setActiveBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedProduct, setSelectedProduct] = useState(null); // { item, category }
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpToCategory = (catName) => {
    setActiveTab(catName);
    if (catName !== 'All') {
      const match = categories.find(
        (c) =>
          c.name.toLowerCase() === catName.toLowerCase() ||
          c.shortName?.toLowerCase() === catName.toLowerCase()
      );
      if (match) {
        setTimeout(() => {
          const el = document.getElementById(`cat-${match.id}`);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return categories
      .filter((cat) => {
        if (activeTab !== 'All') {
          const matchTab =
            cat.name.toLowerCase() === activeTab.toLowerCase() ||
            cat.shortName?.toLowerCase() === activeTab.toLowerCase() ||
            cat.type?.toLowerCase() === activeTab.toLowerCase() ||
            cat.name.toLowerCase().includes(activeTab.toLowerCase());
          if (!matchTab) return false;
        }

        if (activeBrand) {
          const hasBrandInCat = cat.brands?.some(
            (b) => b.toLowerCase() === activeBrand.toLowerCase()
          );
          const hasBrandInItems = cat.items.some(
            (it) => it.brand?.toLowerCase() === activeBrand.toLowerCase() ||
                    it.name.toLowerCase().includes(activeBrand.toLowerCase())
          );
          if (!hasBrandInCat && !hasBrandInItems) return false;
        }

        return true;
      })
      .map((cat) => {
        let matchingItems = cat.items.filter((item) => {
          if (activeBrand) {
            const matchesBrand =
              (item.brand && item.brand.toLowerCase() === activeBrand.toLowerCase()) ||
              item.name.toLowerCase().includes(activeBrand.toLowerCase());
            if (!matchesBrand) return false;
          }

          if (q) {
            const searchString = `${item.name} ${item.sub} ${item.brand || ''} ${cat.name} ${cat.type}`.toLowerCase();
            if (!searchString.includes(q)) return false;
          }

          return true;
        });

        // Apply item-level sorting if requested
        if (sortBy === 'price-asc') {
          matchingItems = [...matchingItems].sort((a, b) => {
            if (a.price === null) return 1;
            if (b.price === null) return -1;
            return a.price - b.price;
          });
        } else if (sortBy === 'price-desc') {
          matchingItems = [...matchingItems].sort((a, b) => {
            if (a.price === null) return 1;
            if (b.price === null) return -1;
            return b.price - a.price;
          });
        } else if (sortBy === 'name') {
          matchingItems = [...matchingItems].sort((a, b) => a.name.localeCompare(b.name));
        } else {
          // default PDF order by srNo
          matchingItems = [...matchingItems].sort((a, b) => (a.srNo ?? 0) - (b.srNo ?? 0));
        }

        return { ...cat, items: matchingItems };
      })
      .filter((cat) => cat.items.length > 0)
      .sort((a, b) => a.id - b.id);
  }, [activeTab, activeBrand, searchQuery, sortBy]);

  const handleBrandSelect = (brandName) => {
    setActiveBrand(brandName);
    if (brandName) {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearAllFilters = () => {
    setActiveTab('All');
    setActiveBrand(null);
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <>
      <BrandBar activeBrand={activeBrand} onSelectBrand={handleBrandSelect} />

      {/* Sticky Category Quick Jump Bar for easy navigation */}
      <nav
        aria-label="Category Quick Jump"
        style={{
          position: 'sticky',
          top: '68px',
          zIndex: 40,
          backgroundColor: 'rgba(9, 10, 20, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 183, 3, 0.2)',
          padding: '8px 0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '2px 0',
            }}
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => jumpToCategory(tab)}
                  style={{
                    padding: '5px 13px',
                    borderRadius: 'var(--radius-full)',
                    background: isActive
                      ? 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: isActive
                      ? '1px solid #ffb703'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? '#090a0f' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 800 : 600,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Quick View Mode Toggle in Sticky Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: 'var(--radius-full)',
            padding: '2px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            flexShrink: 0,
          }}>
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Visual Card Grid"
              style={{
                width: '30px',
                height: '28px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: viewMode === 'grid' ? '#ffb703' : 'transparent',
                color: viewMode === 'grid' ? '#090a0f' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <LayoutGrid size={14} strokeWidth={2.6} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List view"
              title="Quick Wholesale List View"
              style={{
                width: '30px',
                height: '28px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: viewMode === 'list' ? '#ffb703' : 'transparent',
                color: viewMode === 'list' ? '#090a0f' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <List size={15} strokeWidth={2.6} />
            </button>
          </div>
        </div>
      </nav>

      <section id="catalog" style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0', scrollMarginTop: '120px' }}>
        <div className="container">
          {/* Header & Controls */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginBottom: '1.75rem',
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '14px',
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ffb703',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '4px',
                }}>
                  <Sparkles size={14} />
                  <span>Diwali 2026 Collection • 111 Branded Items</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)', fontWeight: 900, color: '#fff' }}>
                  Diwali Crackers Catalog
                </h2>
              </div>

              {/* Actions: Print Price List & Search */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                maxWidth: '520px',
                flexWrap: 'wrap',
              }}>
                {/* Search Bar */}
                <div style={{
                  position: 'relative',
                  flex: 1,
                  minWidth: '220px',
                }}>
                  <Search
                    size={15}
                    color="#ffb703"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search crackers, bombs, rockets..."
                    style={{
                      width: '100%',
                      padding: '8px 32px 8px 34px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 183, 3, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.84rem',
                      backdropFilter: 'blur(8px)',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ffb703')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 183, 3, 0.3)')}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    flexShrink: 0,
                  }}
                >
                  <option value="default" style={{ background: '#0e101f' }}>PDF Order (#1–#111)</option>
                  <option value="price-asc" style={{ background: '#0e101f' }}>Price: Low to High</option>
                  <option value="price-desc" style={{ background: '#0e101f' }}>Price: High to Low</option>
                  <option value="name" style={{ background: '#0e101f' }}>Name (A-Z)</option>
                </select>

                {/* Print Price List Button */}
                <button
                  onClick={() => window.print()}
                  title="Print / Save Catalog Price List"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 183, 3, 0.35)',
                    color: '#fed976',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Printer size={14} />
                  <span>Print List</span>
                </button>
              </div>
            </div>

            {/* Active Filter Indicators */}
            {(activeBrand || searchQuery || activeTab !== 'All') && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexWrap: 'wrap',
                paddingTop: '2px',
              }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700 }}>Filters:</span>

                {activeTab !== 'All' && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.2) 0%, rgba(255, 42, 109, 0.2) 100%)',
                    border: '1px solid rgba(255, 183, 3, 0.3)',
                    fontSize: '0.76rem',
                    color: '#fff',
                    fontWeight: 700,
                  }}>
                    {activeTab}
                    <button onClick={() => setActiveTab('All')} style={{ display: 'flex', color: '#ffb703' }}>
                      <X size={12} strokeWidth={2.8} />
                    </button>
                  </span>
                )}

                {activeBrand && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, rgba(5, 217, 232, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)',
                    border: '1px solid rgba(5, 217, 232, 0.4)',
                    fontSize: '0.76rem',
                    color: '#05d9e8',
                    fontWeight: 700,
                  }}>
                    Brand: {activeBrand}
                    <button onClick={() => setActiveBrand(null)} style={{ display: 'flex', color: '#05d9e8' }}>
                      <X size={12} strokeWidth={2.8} />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    fontSize: '0.76rem',
                    color: '#fff',
                    fontWeight: 700,
                  }}>
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} style={{ display: 'flex', color: 'var(--text-dim)' }}>
                      <X size={12} strokeWidth={2.8} />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  style={{
                    fontSize: '0.76rem',
                    color: '#ffb703',
                    textDecoration: 'underline',
                    marginLeft: '4px',
                    fontWeight: 700,
                  }}
                >
                  Reset All
                </button>
              </div>
            )}
          </div>

          {/* Catalog Categories */}
          {filteredCategories.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3.5rem 1rem',
              backgroundColor: 'rgba(16, 18, 34, 0.6)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed rgba(255, 183, 3, 0.3)',
              backdropFilter: 'blur(10px)',
            }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                No crackers matched your search
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Try different keywords or reset current filters.
              </p>
              <button
                onClick={clearAllFilters}
                style={{
                  padding: '9px 22px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                  color: '#090a0f',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div>
              {filteredCategories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  onBrandClick={handleBrandSelect}
                  viewMode={viewMode}
                  onViewDetails={(item, cat) => setSelectedProduct({ item, category: cat })}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 80,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(26, 22, 46, 0.92)',
            border: '1.5px solid #ffb703',
            color: '#ffb703',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(0,0,0,0.6)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffb703';
            e.currentTarget.style.color = '#090a0f';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(26, 22, 46, 0.92)';
            e.currentTarget.style.color = '#ffb703';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowUp size={20} strokeWidth={2.6} />
        </button>
      )}

      {/* Detailed Product Zoom / Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          item={selectedProduct.item}
          category={selectedProduct.category}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
