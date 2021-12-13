import React, { useState, useEffect } from "react";
import MyResponsiveLine from "./MyResponsiveLine";
import Dropdown from 'react-bootstrap/Dropdown';
// import data from "../data/mockData.json";
import data1 from "../data/mockData1.json";
import { getHistoricalData } from "../APIConnector";
var yahooFinance = require("yahoo-finance");

const StockViewer = () => {
  const [data, setData] = useState(null);
  const [curStock, setCurStock] = useState("AAPL");
  // const [state, setState] = React.useState(false);

  // useEffect(() => {
  //   const getData = () => {
  //     return getHistoricalData("AAPL", "2012-01-01", "2012-01-30");
  //   };
  //   const fetchData = async () => {
  //     const API_DATA = await getData();
  //     console.log("Async Marker");
  //     console.log(API_DATA);
  //     setData(formatData(API_DATA));
  //   };
  //   fetchData();
  // }, [data]);

  // const formatData = (data) => {
  //   console.log(data);
  //   setData(data);
  // };

  useEffect(() => {
    
      yahooFinance
        .historical({
          symbol: curStock,
          from: "2021-01-01",
          to: "2021-01-30",
          period: "d",
        })
        .then(function (quotes) {
          if (quotes[0]) {
            console.log(`successfully retrieved ${quotes.length} results`);
            setData(formatData(quotes));
          } else {
            console.log("N/A");
            // setData("IDK");
          }
        });
    
  }, [data, curStock]);

  const formatData = (data) => {
    console.log(data);
    const formattedData = data.map((currentValue, index, data) => {
      const correctDateFormat = data[index].date.toISOString().split("T");
      return {
        x: correctDateFormat[0],
        y: data[index].close,
      };
    });

    const finalData = {
      id: data[0].symbol,
      data: formattedData,
    };
    console.log(finalData);
    return [finalData];
  };

  return (
    <div
      style={{
        height: "700px",
        width: "80%",
        margin: "auto",
        background: "#ffffff",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        padding: "40px 55px 45px 55px",
        borderRadius: "15px",
        transition: "all 0.3s",
      }}
    >
      <h3>Stock Viewer</h3>
      {data !== null ? (
        <MyResponsiveLine data={data}></MyResponsiveLine>
      ) : (
        "Loading"
      )}
      {/* <MyResponsiveLine data={data1}></MyResponsiveLine> */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {curStock}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCurStock("FB")} href="#/action-3">Facebook</Dropdown.Item>
          <Dropdown.Item onClick={() => setCurStock("AAPL")} href="#/action-1">Apple</Dropdown.Item>
          <Dropdown.Item onClick={() => setCurStock("AMZN")} href="#/action-2">Amazon</Dropdown.Item>
          <Dropdown.Item onClick={() => setCurStock("NFLX")} href="#/action-3">Netflix</Dropdown.Item>
          <Dropdown.Item onClick={() => setCurStock("GOOGL")} href="#/action-3">Google</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default StockViewer;
