import React, { useMemo, useState } from "react";

import {
  Activity,
  Bell,
  BrainCircuit,
  CandlestickChart,
  ChevronRight,
  CircleDollarSign,
  Gauge,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
  Zap
} from "lucide-react";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";


const assets = [
  {
    symbol: "BTC",
    pair: "BTC/USDT",
    name: "Bitcoin",
    price: 108420.22,
    change: 2.43,
    score: 78,
    signal: "BULLISH"
  },

  {
    symbol: "ETH",
    pair: "ETH/USDT",
    name: "Ethereum",
    price: 4112.42,
    change: 1.82,
    score: 71,
    signal: "BULLISH"
  },

  {
    symbol: "SOL",
    pair: "SOL/USDT",
    name: "Solana",
    price: 238.60,
    change: -0.42,
    score: 54,
    signal: "NEUTRAL"
  },

  {
    symbol: "NVDA",
    pair: "NVDA",
    name: "NVIDIA",
    price: 186.21,
    change: 1.16,
    score: 74,
    signal: "BULLISH"
  }
];


const chartData = [
  { time: "09:00", value: 102000 },
  { time: "10:00", value: 103500 },
  { time: "11:00", value: 102800 },
  { time: "12:00", value: 105400 },
  { time: "13:00", value: 106200 },
  { time: "14:00", value: 105700 },
  { time: "15:00", value: 107300 },
  { time: "16:00", value: 108420 }
];


function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}


function App() {
  const [selected, setSelected] = useState(assets[0]);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);


  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const q = search.toLowerCase();

      return (
        asset.symbol.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q)
      );
    });
  }, [search]);


  return (
    <div className="app">

      {/* HEADER */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-icon">
            <Zap size={18} />
          </div>

          <div>
            <strong>M4ZK1PLAY</strong>
            <span>MARKET AI</span>
          </div>

        </div>


        <div className="desktop-search">

          <Search size={17} />

          <input
            placeholder="Search asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <kbd>⌘ K</kbd>

        </div>


        <div className="top-actions">

          <button className="icon-button">
            <Bell size={18} />
          </button>

          <div className="profile">
            M
          </div>

          <button
            className="mobile-menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

        </div>

      </header>


      {/* MOBILE SEARCH */}

      <div className="mobile-search">

        <Search size={17} />

        <input
          placeholder="Search asset..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* HERO */}

      <section className="hero">

        <div className="hero-copy">

          <div className="eyebrow">

            <span className="live-dot" />

            MARKET INTELLIGENCE

          </div>


          <h1>
            See the market.
            <br />

            <span>Understand the signal.</span>
          </h1>


          <p>
            Technical, fundamental, macro and AI
            analysis in one intelligent workspace.
          </p>


          <div className="hero-actions">

            <button className="primary-button">
              <BrainCircuit size={17} />
              Analyze Market
            </button>

            <button className="secondary-button">
              Explore Scanner
              <ChevronRight size={16} />
            </button>

          </div>

        </div>


        <div className="regime-card">

          <div className="card-label">
            AI MARKET REGIME
          </div>


          <div className="regime-value">
            <strong>RISK-ON</strong>

            <span>76%</span>
          </div>


          <div className="meter">
            <span style={{ width: "76%" }} />
          </div>


          <div className="regime-footer">
            <span>
              Model confidence
            </span>

            <span>
              Live analysis
            </span>
          </div>

        </div>

      </section>


      {/* TICKER */}

      <section className="ticker">

        {assets.map((asset) => (

          <button
            key={asset.symbol}
            className="ticker-item"
            onClick={() => setSelected(asset)}
          >

            <strong>
              {asset.symbol}
            </strong>

            <span>
              {formatPrice(asset.price)}
            </span>

            <b
              className={
                asset.change >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {asset.change >= 0 ? "+" : ""}
              {asset.change.toFixed(2)}%
            </b>

          </button>

        ))}

      </section>


      {/* MAIN */}

      <main>

        {/* SECTION HEADER */}

        <div className="section-header">

          <div>

            <div className="eyebrow">
              MARKET PULSE
            </div>

            <h2>
              Top signals
            </h2>

          </div>


          <button className="text-button">
            View scanner
            <ChevronRight size={15} />
          </button>

        </div>


        {/* ASSET GRID */}

        <section className="asset-grid">

          {filteredAssets.map((asset) => (

            <article
              className={
                "asset-card " +
                (
                  selected.symbol === asset.symbol
                    ? "selected"
                    : ""
                )
              }
              key={asset.symbol}
              onClick={() => setSelected(asset)}
            >

              <div className="asset-header">

                <div className="asset-icon">
                  {asset.symbol.substring(0, 1)}
                </div>


                <div className="asset-name">

                  <strong>
                    {asset.pair}
                  </strong>

                  <span>
                    {asset.name}
                  </span>

                </div>


                <div
                  className={
                    asset.change >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {asset.change >= 0 ? "+" : ""}
                  {asset.change.toFixed(2)}%
                </div>

              </div>


              <div className="asset-price">
                {formatPrice(asset.price)}
              </div>


              <div className="mini-chart">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart data={chartData}>

                    <defs>

                      <linearGradient
                        id={"gradient-" + asset.symbol}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopOpacity={0.25}
                        />

                        <stop
                          offset="100%"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>


                    <Tooltip
                      contentStyle={{
                        background: "#0d1218",
                        border: "1px solid #26313d",
                        borderRadius: "10px",
                        fontSize: "11px"
                      }}
                    />


                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={
                        asset.change >= 0
                          ? "#62dc92"
                          : "#ff7180"
                      }
                      fill={
                        "url(#gradient-" +
                        asset.symbol +
                        ")"
                      }
                      strokeWidth={2}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>


              <div className="asset-footer">

                <span>
                  AI SIGNAL
                </span>

                <strong
                  className={
                    asset.signal === "BULLISH"
                      ? "positive"
                      : "neutral"
                  }
                >
                  {asset.signal}
                </strong>

                <b>
                  {asset.score}/100
                </b>

              </div>

            </article>

          ))}

        </section>


        {/* SELECTED ASSET */}

        <section className="workspace">

          <article className="panel chart-panel">

            <div className="panel-header">

              <div>

                <div className="eyebrow">
                  LIVE ANALYSIS
                </div>

                <h3>
                  {selected.pair}
                </h3>

              </div>


              <div className="timeframes">

                <button>1H</button>
                <button className="active">4H</button>
                <button>1D</button>
                <button>1W</button>

              </div>

            </div>


            <div className="large-chart">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart data={chartData}>

                  <defs>

                    <linearGradient
                      id="mainChart"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopOpacity={0.2}
                      />

                      <stop
                        offset="100%"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>


                  <Tooltip
                    contentStyle={{
                      background: "#0d1218",
                      border: "1px solid #26313d",
                      borderRadius: "10px",
                      fontSize: "11px"
                    }}
                  />


                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#62dc92"
                    fill="url(#mainChart)"
                    strokeWidth={2}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>


            <div className="indicator-grid">

              <Indicator
                label="RSI"
                value="62.4"
                status="Bullish"
              />

              <Indicator
                label="MACD"
                value="+124.8"
                status="Positive"
              />

              <Indicator
                label="EMA 20"
                value="$106.2K"
                status="Above"
              />

              <Indicator
                label="Volume"
                value="+18.2%"
                status="Strong"
              />

            </div>

          </article>


          {/* AI PANEL */}

          <article className="panel ai-panel">

            <div className="panel-header">

              <div>

                <div className="eyebrow">
                  AI ANALYST
                </div>

                <h3>
                  Market reasoning
                </h3>

              </div>

              <Sparkles size={20} />

            </div>


            <div className="ai-status">

              <div className="ai-orb">
                <BrainCircuit size={22} />
              </div>

              <div>

                <strong>
                  {selected.signal}
                </strong>

                <span>
                  Model score {selected.score}/100
                </span>

              </div>

            </div>


            <p className="analysis">

              Momentum remains positive while price
              holds above key trend averages. Current
              volume supports the move, while the model
              continues monitoring resistance and momentum
              deterioration.

            </p>


            <div className="reason-list">

              <Reason
                icon={<TrendingUp size={15} />}
                title="Momentum"
                value="Positive"
              />

              <Reason
                icon={<Activity size={15} />}
                title="Volume"
                value="Strong"
              />

              <Reason
                icon={<Gauge size={15} />}
                title="RSI"
                value="62.4"
              />

              <Reason
                icon={<ShieldCheck size={15} />}
                title="Risk"
                value="Moderate"
              />

            </div>


            <button className="full-button">
              Generate deeper analysis
              <ChevronRight size={16} />
            </button>

          </article>

        </section>


        {/* MACRO */}

        <section className="macro-section">

          <div className="section-header">

            <div>

              <div className="eyebrow">
                FUNDAMENTAL & MACRO
              </div>

              <h2>
                High-impact events
              </h2>

            </div>

          </div>


          <div className="macro-grid">

            <Macro
              title="US CPI"
              date="Upcoming"
              impact="HIGH"
              value="Inflation"
            />

            <Macro
              title="FOMC"
              date="Scheduled"
              impact="HIGH"
              value="Interest Rate"
            />

            <Macro
              title="NFP"
              date="Upcoming"
              impact="HIGH"
              value="Employment"
            />

            <Macro
              title="GDP"
              date="Scheduled"
              impact="MEDIUM"
              value="Growth"
            />

          </div>

        </section>

      </main>


      {/* BOTTOM NAV */}

      <nav className="bottom-nav">

        <NavItem
          icon={<CandlestickChart />}
          label="Markets"
          active
        />

        <NavItem
          icon={<BrainCircuit />}
          label="AI"
        />

        <NavItem
          icon={<ShieldCheck />}
          label="Scanner"
        />

        <NavItem
          icon={<Wallet />}
          label="Portfolio"
        />

        <NavItem
          icon={<CircleDollarSign />}
          label="Plans"
        />

      </nav>

    </div>
  );
}


function Indicator({
  label,
  value,
  status
}) {

  return (

    <div className="indicator">

      <span>{label}</span>

      <strong>{value}</strong>

      <small>{status}</small>

    </div>

  );

}


function Reason({
  icon,
  title,
  value
}) {

  return (

    <div className="reason">

      <div className="reason-icon">
        {icon}
      </div>

      <span>{title}</span>

      <strong>{value}</strong>

    </div>

  );

}


function Macro({
  title,
  date,
  impact,
  value
}) {

  return (

    <article className="macro-card">

      <div className="macro-top">

        <span>{date}</span>

        <b
          className={
            impact === "HIGH"
              ? "high"
              : "medium"
          }
        >
          {impact}
        </b>

      </div>

      <h3>{title}</h3>

      <p>{value}</p>

    </article>

  );

}


function NavItem({
  icon,
  label,
  active
}) {

  return (

    <a className={active ? "active" : ""}>

      {React.cloneElement(icon, {
        size: 18
      })}

      <span>{label}</span>

    </a>

  );

}


export default App;
