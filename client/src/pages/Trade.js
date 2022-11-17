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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting,setIsSubmitting]=useState(false);
  useEffect(() => {
    fetch("/buying_power")
      .then((r) => r.json())
      .then(setBuyingPower);
    fetch("/account_value")
      .then((r) =>{
        if (r.ok){
          setIsLoading(false);
          r.json().then(setValue)
        } })

  }, [trigger]);

  function handleTickerSubmit(e) {
    e.preventDefault();
    setTicker(e.target.ticker.value);
  }

  function handleActionSubmit(e) {
    e.preventDefault();

    setQuantity(e.target.quantity.value);

    if (action === "Buy" && e.target.quantity.value>0) {
      //POSITIVE FETCH
      fetch("/trade", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: ticker, shares: e.target.quantity.value }),
      }).then((r) => {

        if (r.ok) {
          r.json();
        } else {
          setErrors("Insufficient Funds to Make this Purchase");
        }
      });
    } else if (action==="Sell"){
      //NEGATIVE FETCH

        fetch("/trade", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: ticker, shares: 0 - quantity }),
        }).then((r) => {
  
          if (r.ok) {
            r.json();
          } else {
            setErrors("Error. Please try again later.");
          }
        });
    }
  }
  if (isLoading){
      return (<div className="loader">LOADING...<div class="lds-facebook"><div></div><div></div><div></div></div></div>)
    }
  return (
    <div className="trade" style={{opacity : isSubmitting ? "0.5": "1.0"}} onClick={()=>setIsSubmitting(false)}>
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
            <div className="symbol-left">
            <SymbolInfo
              widgetProps={{
                symbol: ticker,
                colorTheme: "light",

                width: 830,

                locale: "en",
              }}
            />
            <div className="symbol-intraday">
              {/* TO FILL OUT */}
            </div>
            </div>
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
              <button className="action-button" type="button" onClick={()=>setAction("Buy")}>Buy</button>
              <button className="action-button" type="button"  onClick={()=>setAction("Sell")}>Sell</button>
            </div>
            <div className="lookup-form-row-item">
              <p>QUANTITY</p>
              <input name="quantity"></input>
            </div>
          </div>
          <div className="lookup-form-row">
            <div className="lookup-form-row-item">
              <button type="submit" onClick={() =>{setIsSubmitting(true); setTrigger(!trigger)}}>
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
