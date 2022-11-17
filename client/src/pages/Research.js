import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  SymbolOverview,
  TickerTape,
  CompanyProfile,
  TechnicalAnalysis,
  Screener,
} from "react-tradingview-embed";
import "../styles/Research.css";
const Research = () => {
  const [isTickerSubmitted,setIsTickerSubmitted]=useState(false);
  const [symbol, setSymbol] = useState("");
  function handleTickerSubmit(e) {
    e.preventDefault();
    setSymbol(e.target.ticker.value);
    setIsTickerSubmitted(true);
  }

  return (
    <div className="research">
      <TickerTape widgetProps={{ colorTheme: "dark" }} />
      <form
        onSubmit={(e) => handleTickerSubmit(e)}
        className="ticker-submit-form"
      >
        <p>SYMBOL LOOKUP</p>
        <input
          type="text"
          name="ticker"
          placeholder="Search for a ticker here: NFLX, TSLA..."
        ></input>
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
            <Link to ={`/news/${symbol}`}>
            <button className={`read-more-button ${isTickerSubmitted ? "": "absent"}`}>Read More</button>
        </Link>
      </form>
      <div className={`ticker-info ${symbol ? "showing" : "hidden"}`}>
        <div className="stock-overview">
          <SymbolOverview
            widgetProps={{
              symbols: [symbol],
              colorTheme: "dark",
              height: 500,
              locale: "en",
            }}
          />
        </div>

        <div className="stock-info-row">
          <div className="stock-info-row-item">
            <CompanyProfile
              widgetProps={{
                symbol: symbol,
                colorTheme: "dark",
                width: 1100,
                height: 500,
                locale: "en",
              }}
            />
          </div>

          <div className="stock-info-row-item">
            <TechnicalAnalysis
              className="stock-info-row-item"
              widgetProps={{
                symbol: symbol,
                colorTheme: "dark",
                width: 590,
                height: 500,
                locale: "en",
              }}
            />
          </div>

        </div>


      </div>
      <p>SCREENER</p>
      <div className="stock-info-row screener">
        <Screener
          widgetProps={{
            height: 1000,
            width: 1690,
          }}
        />
      </div>
    </div>
  );
};

export default Research;
