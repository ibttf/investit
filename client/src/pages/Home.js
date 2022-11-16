import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";

import "../styles/Home.css";
const Home = ({ user, setUser }) => {
  const [tickers, setTickers] = useState([]);
  const [value, setValue] = useState(0);
  const [buyingPower, setBuyingPower] = useState(0);
  const [dailyChange, setDailyChange] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  useEffect(() => {
    fetch("/tickers")
      .then((r) => r.json())
      .then((data) => setTickers([...data]));

    fetch("/account_value")
      .then((r) => r.json())
      .then((data) => setValue(data));
    fetch("/buying_power")
      .then((r) => r.json())
      .then((data) => setBuyingPower(data));
    fetch("/daily_change")
      .then((r) => r.json())
      .then((data) =>
        setDailyChange(Math.round(data.daily_change * 100) / 100)
      );
    fetch("/total_change")
      .then((r) => r.json())
      .then((data) =>
        setTotalChange(Math.round(data.total_change * 100) / 100)
      );
  }, []);
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  if (user) {
    //IF USER IS LOGGED IN
    return (
      <div className="home">
        <div className="portfolio-cols">
          <div className="portfolio-col">
            <p>OVERVIEW</p>
            <div className="portfolio-overview">
              <h3 className="account-overview-big-text">Account Value</h3>
              <p className="account-overview-small-text">
                {"$" +
                  value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </p>
              <div className="change">
                <div className="change-col">
                  <h4 className="account-overview-medium-text">
                    Today's Change
                  </h4>
                  <p
                    className="account-overview-small-text"
                    style={{ color: dailyChange >= 0 ? "green" : "red" }}
                  >
                    {dailyChange.toFixed(2).toString().toLocaleString()}%
                  </p>
                </div>
                <div className="change-col">
                  <h4 className="account-overview-medium-text">Total Change</h4>
                  <p
                    className="account-overview-small-text"
                    style={{ color: dailyChange >= 0 ? "green" : "red" }}
                  >
                    {totalChange.toFixed(2).toString().toLocaleString()}%
                  </p>
                </div>
              </div>

              <h3 className="account-overview-big-text">Buying Power</h3>
              <p className="account-overview-small-text">
                {"$" +
                  buyingPower
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </p>
            </div>
          </div>
          <div className="portfolio-col">
            <p>PERFORMANCE</p>
            <div className="portfolio-performance">
              <Chart />
            </div>
          </div>
        </div>
        <p>HOLDINGS</p>
        <div className="portfolio-holdings">
          <tc className="portfolio-column-title">Symbol</tc>

          <tc className="portfolio-column-title">Current Price</tc>
          <tc className="portfolio-column-title">Today's Change</tc>
          <tc className="portfolio-column-title">Average Price</tc>
          <tc className="portfolio-column-title">QTY</tc>
          <tc className="portfolio-column-title">Total Value</tc>
          <tc className="portfolio-column-title">Total Gain/Loss</tc>
          {tickers.length > 0 ? (
            tickers.map((ticker) => {
              return (
                <>
                  <p className="ticker-info">{ticker.name}</p>
                  <p
                    className="ticker-info"
                    
                  >
                    {"$" +
                      ticker.current_price
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </p>
                  <p
                    className="ticker-info"
                    style={{
                      color: ticker.daily_change >= 0 ? "green" : "red",
                    }}
                  >
                    {Math.round(ticker.daily_change * 100) / 100}%
                  </p>
                  <p className="ticker-info">${ticker.purchase_price}</p>
                  <p className="ticker-info">{ticker.shares_owned}</p>
                  <p className="ticker-info">
                    {"$" +
                      (
                        Math.round(
                          parseInt(ticker.shares_owned) *
                            parseFloat(ticker.purchase_price) *
                            100
                        ) / 100
                      )
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </p>
                  <p
                    className="ticker-info"
                    style={{
                      color:
                        Math.round(
                          (parseInt(ticker.shares_owned) *
                            parseFloat(ticker.current_price) -
                            parseInt(ticker.shares_owned) *
                              parseFloat(ticker.purchase_price)) *
                            100
                        ) /
                          100 >=
                        0
                          ? "green"
                          : "red",
                    }}
                  >
                    {"$" +
                      Math.round(
                        (parseInt(ticker.shares_owned) *
                          parseFloat(ticker.current_price) -
                          parseInt(ticker.shares_owned) *
                            parseFloat(ticker.purchase_price)) *
                          100
                      ) /
                        (100)
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </p>
                </>
              );
            })
          ) : (
            <>
              <p></p>
              <p></p>
              <p></p>
              <p className="no-tickers-error">You have no stock holdings yet</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return <div className="home">
    
  </div>;
};

export default Home;
