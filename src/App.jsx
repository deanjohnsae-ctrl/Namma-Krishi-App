import { useEffect, useMemo, useRef, useState } from "react";
import {
  assets,
  categories,
  commodities,
  commoditiesByCategory,
  marketOptions,
  priceCards,
  searchResults,
  varietyOptions,
} from "./data";

function App() {
  const [view, setView] = useState("home");
  const [query, setQuery] = useState("");
  const [draftQuery, setDraftQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedCommodity, setSelectedCommodity] = useState("ಸೇಬು");
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedVarieties, setSelectedVarieties] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const activeQuery = draftQuery || query || selectedCommodity;

  const categoryCommodities = useMemo(() => {
    const items = commoditiesByCategory[selectedCategory];
    return (items || []).map((name, index) => ({
      id: `cat-${index + 1}`,
      name,
    }));
  }, [selectedCategory]);

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return priceCards.filter((card) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        card.commodity.toLowerCase().includes(normalizedQuery) ||
        card.market.toLowerCase().includes(normalizedQuery) ||
        card.variety.toLowerCase().includes(normalizedQuery);

      const matchesMarket =
        selectedMarkets.length === 0 || selectedMarkets.includes(card.market);

      const matchesVariety =
        selectedVarieties.length === 0 || selectedVarieties.includes(card.variety);

      return matchesQuery && matchesMarket && matchesVariety;
    });
  }, [query, selectedMarkets, selectedVarieties]);

  const searchSuggestionRows = useMemo(() => {
    const normalizedQuery = draftQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return searchResults;
    }

    return searchResults.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery),
    );
  }, [draftQuery]);

  const goToResults = (nextCommodity = selectedCommodity, nextQuery = draftQuery || query) => {
    setSelectedCommodity(nextCommodity);
    setQuery(nextQuery || nextCommodity);
    setDraftQuery(nextQuery || nextCommodity);
    setSearchOpen(false);
    setView("results");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCommodity("ಸೇಬು");
    setDraftQuery("ಸೇಬು");
    setQuery("ಸೇಬು");
    setExpandedCardId(null);
  };

  const toggleSelection = (value, selectedValues, setter) => {
    setter(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value],
    );
  };

  const clearFilters = () => {
    setSelectedMarkets([]);
    setSelectedVarieties([]);
  };

  const applyFilters = () => {
    setFilterOpen(false);
    setView("results");
  };

  const showFilterSummary = view === "results" && (selectedMarkets.length > 0 || selectedVarieties.length > 0);

  return (
    <div className="site-shell">
      {view === "home" ? (
        <HomePage
          searchValue={draftQuery}
          onCategoryChange={handleCategoryChange}
          onCommoditySelect={(commodity) => goToResults(commodity, commodity)}
          onQueryChange={(value) => {
            setDraftQuery(value);
            setSearchOpen(true);
          }}
          onSearchSubmit={(value) => {
            const nextQuery = value.trim() || selectedCommodity;
            goToResults(nextQuery, nextQuery);
          }}
          onSearchOpen={() => setSearchOpen(true)}
          onCloseSearch={() => setSearchOpen(false)}
          onSuggestionSelect={(item) => {
            setDraftQuery(item.title);
            goToResults(item.title, item.title);
          }}
          searchOpen={searchOpen}
          searchSuggestionRows={searchSuggestionRows}
          selectedCategory={selectedCategory}
          categoryCommodities={categoryCommodities}
        />
      ) : (
        <ResultsPage
          activeQuery={activeQuery}
          expandedCardId={expandedCardId}
          filterOpen={filterOpen}
          filteredResults={filteredResults}
          onBack={() => {
            setFilterOpen(false);
            setSearchOpen(false);
            setExpandedCardId(null);
            setView("home");
          }}
          onClearFilters={clearFilters}
          onCloseSearch={() => setSearchOpen(false)}
          onFilterOpen={() => setFilterOpen(true)}
          onQueryChange={(value) => {
            setDraftQuery(value);
            setSearchOpen(true);
          }}
          onSearchSubmit={(value) => {
            const nextQuery = value.trim();
            if (!nextQuery) {
              setSearchOpen(false);
              return;
            }
            setQuery(nextQuery);
            setDraftQuery(nextQuery);
            setSearchOpen(false);
          }}
          onSearchOpen={() => setSearchOpen(true)}
          onSuggestionSelect={(item) => {
            setDraftQuery(item.title);
            setQuery(item.title);
            setSearchOpen(false);
          }}
          onToggleCard={(cardId) =>
            setExpandedCardId((currentId) => (currentId === cardId ? null : cardId))
          }
          onToggleMarket={(market) =>
            toggleSelection(market, selectedMarkets, setSelectedMarkets)
          }
          onToggleVariety={(variety) =>
            toggleSelection(variety, selectedVarieties, setSelectedVarieties)
          }
          onApplyFilters={applyFilters}
          query={query}
          searchOpen={searchOpen}
          searchSuggestionRows={searchSuggestionRows}
          selectedCommodity={selectedCommodity}
          selectedMarkets={selectedMarkets}
          selectedVarieties={selectedVarieties}
          showFilterSummary={showFilterSummary}
        />
      )}
    </div>
  );
}

function HomePage({
  searchValue,
  onCategoryChange,
  onCommoditySelect,
  onCloseSearch,
  onQueryChange,
  onSearchSubmit,
  onSearchOpen,
  onSuggestionSelect,
  searchOpen,
  searchSuggestionRows,
  selectedCategory,
  categoryCommodities,
}) {
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page home-page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-inline">
            <img src={assets.logo} alt="" />
            <span>ನಮ್ಮ ಕೃಷಿ ಬೆಲೆಗಳು</span>
          </div>
          <button
            className={`icon-button sticky-search-btn ${heroVisible ? "" : "visible"}`}
            onClick={onSearchOpen}
            type="button"
          >
            <img src={assets.search} alt="" />
          </button>
        </div>
      </header>

      <section className="hero-block" ref={heroRef}>
        <picture className="hero-bg-img">
          <source media="(min-width: 768px)" srcSet={assets.heroBg} />
          <img src={assets.heroBgMobile} alt="" />
        </picture>
        <div className={`hero-copy ${searchOpen ? "search-active" : ""}`}>
          <h1>ಸರಕುಗಳು, ಮಾರುಕಟ್ಟೆಗಳು ಅಥವಾ<br />ತಳಿಗಳನ್ನು ಹುಡುಕಿ</h1>
          <SearchField
            value={searchValue}
            placeholder="ಟೊಮೇಟೊ, ಮೈಸೂರು, ಅಥವಾ ಸ್ಥಳೀಯ ಎಂದು ಪ್ರಯತ್ನಿಸಿ"
            onChange={onQueryChange}
            onFocus={onSearchOpen}
          />
        </div>
      </section>

      <section className="category-section">
        <p className="section-copy">ನಿಮ್ಮ ಸರಕನ್ನು ಕೆಳಗೆ ತ್ವರಿತವಾಗಿ ಆಯ್ಕೆ ಮಾಡಿ.</p>
      </section>
      <div className="category-tabs">
        {categories.map((label) => (
          <button
            key={label}
            className={`category-tab ${label === selectedCategory ? "active" : ""}`}
            onClick={() => onCategoryChange(label)}
            type="button"
          >
            <img src={assets.category} alt="" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <section className="commodity-gallery">
        <div className="section-heading">
          <h2>{selectedCategory} ({categoryCommodities.length} ವಸ್ತುಗಳು)</h2>
        </div>
        <div className="commodity-grid">
          {categoryCommodities.map((commodity) => (
            <button
              key={commodity.id}
              className="commodity-tile"
              onClick={() => onCommoditySelect(commodity.name)}
              type="button"
            >
              <div className="thumb-wrap">
                <img src={assets.commodityThumb} alt={commodity.name} />
              </div>
              <p>{commodity.name}</p>
            </button>
          ))}
        </div>
      </section>

      {searchOpen && (
        <>
          <div className="screen-overlay" onClick={onCloseSearch} />
          <div className="floating-search-panel home-search">
            <SearchField
              value={searchValue}
              placeholder="ಟೊಮೇಟೊ, ಮೈಸೂರು, ಅಥವಾ ಸ್ಥಳೀಯ ಎಂದು ಪ್ರಯತ್ನಿಸಿ"
              onChange={onQueryChange}
              onFocus={onSearchOpen}
              onSubmit={onSearchSubmit}
              onClose={onCloseSearch}
              autoFocus
            />
            <SearchSuggestions items={searchSuggestionRows} onSelect={onSuggestionSelect} />
          </div>
        </>
      )}
    </div>
  );
}

function ResultsPage({
  activeQuery,
  expandedCardId,
  filterOpen,
  filteredResults,
  onApplyFilters,
  onBack,
  onClearFilters,
  onCloseSearch,
  onFilterOpen,
  onQueryChange,
  onSearchSubmit,
  onSearchOpen,
  onSuggestionSelect,
  onToggleCard,
  onToggleMarket,
  onToggleVariety,
  searchOpen,
  searchSuggestionRows,
  selectedCommodity,
  selectedMarkets,
  selectedVarieties,
  showFilterSummary,
}) {
  const [filterSummaryVisible, setFilterSummaryVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 0) {
        setFilterSummaryVisible(true);
      } else if (Math.abs(scrollDelta) >= 4) {
        setFilterSummaryVisible(scrollDelta < 0);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showFilterSummary) {
      setFilterSummaryVisible(true);
    }
  }, [showFilterSummary]);

  return (
    <div className="page results-page">
      <header className="topbar">
        <div className="topbar-inner results-topbar-inner">
          <button className="icon-button" onClick={onBack} type="button">
            <img src={assets.back} alt="" />
          </button>
        <div className="brand-inline">
          <img src={assets.logo} alt="" />
          <span>ನಮ್ಮ ಕೃಷಿ ಬೆಲೆಗಳು</span>
        </div>
          <button className="icon-button" onClick={onSearchOpen} type="button">
            <img src={assets.search} alt="" />
          </button>
        </div>
      </header>

      <section className={`results-toolbar ${showFilterSummary ? "has-filter-summary" : ""}`}>
        <div className="results-toolbar-inner">
          <div className="commodity-title">
            <div className="thumb-wrap large">
              <img src={assets.commodityThumb} alt="" />
            </div>
            <h2>{selectedCommodity}</h2>
          </div>
          <button className="filter-button" onClick={onFilterOpen} type="button">
            <span className="filter-icon" aria-hidden="true" />
            <span>ಫಿಲ್ಟರ್</span>
          </button>
        </div>
      </section>

      {showFilterSummary && (
        <section className={`filter-summary ${filterSummaryVisible ? "" : "is-hidden"}`}>
          <div className="filter-summary-inner">
            {selectedMarkets.length > 0 && (
              <div className="filter-summary-row market-filter-summary">
                <div className="filter-summary-label">
                  <img src={assets.suggestionMarket} alt="" />
                  <span>ಮಾರುಕಟ್ಟೆ :</span>
                </div>
                <div className="chip-row wrap">
                  {selectedMarkets.map((item) => (
                    <FilterChip
                      key={item}
                      label={item}
                      onRemove={() => onToggleMarket(item)}
                      tone="market"
                    />
                  ))}
                </div>
              </div>
            )}
            {selectedVarieties.length > 0 && (
              <div className="filter-summary-row variety-filter-summary">
                <div className="filter-summary-label">
                  <img src={assets.suggestionVariety} alt="" />
                  <span>ತಳಿ :</span>
                </div>
                <div className="chip-row wrap">
                  {selectedVarieties.map((item) => (
                    <FilterChip
                      key={item}
                      label={item}
                      onRemove={() => onToggleVariety(item)}
                      tone="variety"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <main className="results-content">
        {filteredResults.map((card) => (
          <PriceCard
            card={card}
            expanded={expandedCardId === card.id}
            key={card.id}
            onToggle={() => onToggleCard(card.id)}
          />
        ))}
      </main>

      {searchOpen && (
        <>
          <div className="screen-overlay" onClick={onCloseSearch} />
          <div className="floating-search-panel results-search">
            <SearchField
              value={activeQuery}
              placeholder="ಸರಕುಗಳನ್ನು ಹುಡುಕಿ"
              onChange={onQueryChange}
              onFocus={onSearchOpen}
              onSubmit={onSearchSubmit}
              onClose={onCloseSearch}
              autoFocus
            />
            {searchSuggestionRows.length > 0 && (
              <SearchSuggestions items={searchSuggestionRows} onSelect={onSuggestionSelect} />
            )}
          </div>
        </>
      )}

      {filterOpen && (
        <>
          <div className="screen-overlay" onClick={onApplyFilters} />
          <FilterDialog
            marketOptions={marketOptions}
            onApply={onApplyFilters}
            onClear={onClearFilters}
            onClose={onApplyFilters}
            onToggleMarket={onToggleMarket}
            onToggleVariety={onToggleVariety}
            selectedMarkets={selectedMarkets}
            selectedVarieties={selectedVarieties}
            varietyOptions={varietyOptions}
          />
        </>
      )}
    </div>
  );
}

function SearchField({
  autoFocus = false,
  onChange,
  onClose,
  onFocus,
  onSubmit,
  placeholder,
  value,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form className="search-field" onSubmit={handleSubmit} role="search">
      {onSubmit ? (
        <button className="search-submit" type="submit" aria-label="ಹುಡುಕಿ">
          <img className="search-icon" src={assets.search} alt="" />
        </button>
      ) : (
        <img className="search-icon" src={assets.search} alt="" />
      )}
      <input
        aria-label={placeholder}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
      />
      {onClose && (
        <button
          className="search-close"
          type="button"
          onClick={onClose}
          aria-label="ಹುಡುಕಾಟ ಮುಚ್ಚಿ"
        >
          <img src={assets.close} alt="" />
        </button>
      )}
    </form>
  );
}

function SearchSuggestions({ items, onSelect }) {
  const suggestionIcons = {
    Commodity: assets.suggestionCommodity,
    Market: assets.suggestionMarket,
    Variety: assets.suggestionVariety,
  };

  return (
    <div className="search-suggestions">
      {items.map((item, index) => (
        <button
          className="suggestion-row"
          key={`${item.kind}-${index}`}
          onClick={() => onSelect(item)}
          type="button"
        >
          <div className={`thumb-wrap small suggestion-thumb-${item.kind.toLowerCase()}`}>
            <img
              src={item.kind === "Market" ? assets.marketThumb : assets.commodityThumb}
              alt=""
            />
          </div>
          <div className="suggestion-copy">
            <strong>{item.title}</strong>
            <span className={`suggestion-kind ${item.accent}`}>
              <img src={suggestionIcons[item.kind]} alt="" />
              {{ Commodity: "ಸರಕು", Market: "ಮಾರುಕಟ್ಟೆ", Variety: "ತಳಿ" }[item.kind]}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function PriceCard({ card, expanded, onToggle }) {
  return (
    <article className={`price-card ${expanded ? "expanded" : ""}`}>
      <div className="card-header">
        <div className="card-market">
          <img src={assets.marketThumb} alt="" />
          <h3>{card.marketLabel}</h3>
        </div>
      </div>

      <div className="stats-row">
        {card.stats.map((stat) => (
          <div className="stat-block" key={`${card.id}-${stat.label}-${stat.tone}`}>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-value ${stat.tone}`}>{stat.value}</div>
            <div className={`stat-delta ${stat.deltaTone}`}>
              <span className="delta-icon">{stat.deltaTone === "up" ? "▲" : "▼"}</span>
              <span>{stat.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="detail-grid">
        <MetaItem label="ತಳಿ" value={card.variety} />
        <MetaItem label="ದರ್ಜೆ" value={card.grade} />
        <MetaItem label="ಆವಕ ಮತ್ತು ಘಟಕಗಳು" value={card.arrival} subvalue={card.unit} />
        <MetaItem label="ಬೆಲೆ ಅಪ್ಡೇಟ್‌ಗಳು" value={card.updatedAt} />
        <MetaItem label="ಬೆಲೆ ಅಪ್ಡೇಟ್‌ಗಳು" value={card.previousUpdate} />
      </div>

      <div className="data-source">ಮಾಹಿತಿ ಮೂಲ:www.example.com</div>

      {expanded && (
        <div className="graph-panel">
          <div className="graph-title">ಬೆಲೆ ಪ್ರವೃತ್ತಿ</div>
          <div className="graph-canvas">
            <img src={assets.graph} alt="ಬೆಲೆ ಪ್ರವೃತ್ತಿ ನಕ್ಷೆ" />
          </div>
        </div>
      )}

      <button className="history-cta" onClick={onToggle} type="button">
        <span>ಬೆಲೆ ಇತಿಹಾಸವನ್ನು ನೋಡಿ</span>
        <span className="caret">{expanded ? "⌃" : "⌄"}</span>
      </button>
    </article>
  );
}

function MetaItem({ label, value, subvalue }) {
  return (
    <div className="meta-item">
      <div className="meta-label">{label}</div>
      <div className="meta-value">
        {value}
        {subvalue && <span className="meta-subvalue"> {subvalue}</span>}
      </div>
    </div>
  );
}

function FilterDialog({
  marketOptions,
  onApply,
  onClear,
  onClose,
  onToggleMarket,
  onToggleVariety,
  selectedMarkets,
  selectedVarieties,
  varietyOptions,
}) {
  const [openGroup, setOpenGroup] = useState(null);

  return (
    <div className="filter-dialog">
      <div className="dialog-header">
        <h3>ಫಿಲ್ಟರ್ ಫಲಿತಾಂಶಗಳು</h3>
        <button className="icon-button close" onClick={onClose} type="button">
          <img src={assets.close} alt="" />
        </button>
      </div>

      <FilterGroup
        expanded={openGroup === "market"}
        onToggle={onToggleMarket}
        onToggleExpanded={() => setOpenGroup((current) => (current === "market" ? null : "market"))}
        options={marketOptions}
        selectedValues={selectedMarkets}
        title="ಮಾರುಕಟ್ಟೆ ಫಿಲ್ಟರ್"
      />

      <FilterGroup
        expanded={openGroup === "variety"}
        onToggle={onToggleVariety}
        onToggleExpanded={() => setOpenGroup((current) => (current === "variety" ? null : "variety"))}
        options={varietyOptions}
        selectedValues={selectedVarieties}
        title="ತಳಿ ಫಿಲ್ಟರ್"
      />

      <div className="action-row">
        <button className="action-button ghost" onClick={onClear} type="button">
          ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ
        </button>
        <button className="action-button solid" onClick={onApply} type="button">
          ಫಿಲ್ಟರ್ ಅನ್ವಯಿಸಿ
        </button>
      </div>
    </div>
  );
}

function FilterGroup({ expanded, onToggle, onToggleExpanded, options, selectedValues, title }) {
  return (
    <div className="filter-group">
      <div className="filter-line">
        <span>{title}</span>
        <div className="line" />
      </div>

      {selectedValues.length > 0 && (
        <div className="chip-row wrap filter-chip-row">
          {selectedValues.map((item) => (
            <FilterChip key={item} label={item} onRemove={() => onToggle(item)} />
          ))}
        </div>
      )}

      <button
        aria-expanded={expanded}
        className="filter-trigger"
        onClick={onToggleExpanded}
        type="button"
      >
        <span>ಆಯ್ಕೆ ಮಾಡಲು ಒತ್ತಿರಿ</span>
        <span className={`filter-chevron ${expanded ? "expanded" : ""}`} />
      </button>

      {expanded && (
        <div className="option-list">
        {options.map((option, index) => {
          const checked = selectedValues.includes(option);
          return (
            <button
              className={`option-row ${checked ? "selected" : ""}`}
              key={`${option}-${index}`}
              onClick={() => onToggle(option)}
              type="button"
            >
              <span className="checkbox-box">
                {checked && <span className="checkbox-check">✓</span>}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove, tone }) {
  return (
    <div
      className={`filter-chip ${tone ? `filter-chip-${tone}` : ""}`}
      onClick={(event) => {
        if (event.target.closest(".chip-close")) onRemove();
      }}
    >
      <span>{label}</span>
      <span className="chip-close">×</span>
    </div>
  );
}

export default App;
