import React, { useState, useEffect } from "react";
import "../styles/Trade.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SymbolInfo, SymbolOverview } from "react-tradingview-embed";
const Trade = () => {
  const [ticker, setTicker] = useState("");
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [buyingPower, setBuyingPower] = useState(0);
  const [value, setValue] = useState(0);
  const [errors, setErrors] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/buying_power")
      .then((r) => r.json())
      .then(setBuyingPower);
    fetch("/account_value")
      .then((r) => r.json())
      .then(setValue);
  }, [trigger]);

  function handleTickerSubmit(e) {
    e.preventDefault();
    setTicker(e.target.ticker.value);
  }

  function handleActionSubmit(e) {
    e.preventDefault();

    setQuantity(e.target.quantity.value);

    if (action === "Buy") {
      //POSITIVE FETCH
      fetch("/trade", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: ticker, shares: quantity }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json();
        } else {
          setErrors("Insufficient Funds to Make this Purchase");
        }
      });
    } else {
      //NEGATIVE FETCH

      fetch("/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: ticker, shares: 0 - quantity }),
      }).then((r) => {
        setIsLoading(false);
        r.json();
      });
    }
  }

  return (
    <div className="trade">
      <div className="account-info">
        <div className="account-info-col">
          <p>Account Value</p>
          <p>${value.toLocaleString()}</p>
          {/* to fill in */}
        </div>
        <div className="account-info-col">
          <p>Buying Power</p>
          <p>${buyingPower.toLocaleString()}</p>
        </div>

      </div>
      <div className="symbol-info lookup-form">
        <form onSubmit={(e) => handleTickerSubmit(e)}>
          <p>SYMBOL LOOKUP</p>
          <input
            type="text"
            name="ticker"
            placeholder="Search for a ticker here: NFLX, TSLA..."
          ></input>
          <button type="submit" className="symbol-submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <form onSubmit={handleActionSubmit}>
          <div
            className={`lookup-form-row symbol-info ${ticker ? "" : "hidden"}`}
          >
            <SymbolInfo
              widgetProps={{
                symbol: ticker,
                colorTheme: "light",

                width: 830,

                locale: "en",
              }}
            />
            <SymbolOverview
              widgetProps={{
                symbols: [ticker],
                colorTheme: "light",
                width: 830,
                locale: "en",
                chartOnly: true,
                gridLineColor: "#d8d8d8",
              }}
            />
          </div>
          <div className="lookup-form-row">
            <div className="lookup-form-row-item">
              <p>ACTION</p>
              <button className="action-button" onClick={()=>setAction("Buy")}>Buy</button>
              <button className="action-button"  onClick={()=>setAction("Sell")}>Sell</button>
            </div>
            <div className="lookup-form-row-item">
              <p>QUANTITY</p>
              <input name="quantity"></input>
            </div>
          </div>
          <div className="lookup-form-row">
            <div className="lookup-form-row-item">
              <button type="submit" onClick={() => setTrigger(!trigger)}>
                SUBMIT ORDER
              </button>
              <p className={errors ? "error" : "error hidden"}>{errors}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trade;
