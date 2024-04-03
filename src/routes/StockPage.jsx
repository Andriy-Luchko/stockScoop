import "./StockPage.css";
import {Link} from 'react-router-dom';
import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_KEY;
function StockPage(){
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getStockDetail = async () => {
            const details = await fetch(
                `https://financialmodelingprep.com/api/v3/profile/${params.symbol}?apikey=` +
                API_KEY
            );

            const detailsJson = await details.json();

            setFullDetails(detailsJson);
        };

        getStockDetail().catch(console.error);
    }, [params.symbol]);

    return (
<div className="stockPage">
        <h3>{"Additional Info For " + params.symbol}</h3>
        <Link to={"/" } className="homeLink"><img src="./images/homeIcon.png"/></Link>
        {fullDetails ? 
            <>
        <table>
  <tbody> 
    <tr>
      <th>Symbol</th>
      <td>{fullDetails[0].symbol}</td>
    </tr>
    <tr>
      <th>Price</th>
      <td>{"$" + fullDetails[0].price}</td>
    </tr>
    <tr>
      <th>Market Cap</th>
      <td> {"$" + fullDetails[0].mktCap.toLocaleString()}</td>
    </tr>
    <tr>
      <th>Company Name</th>
      <td> {fullDetails[0].companyName}</td>
    </tr>
    <tr>
      <th>Exchange</th>
      <td> {fullDetails[0].exchange}</td>
    </tr>
    <tr>
      <th>Industry</th>
      <td> {fullDetails[0].industry}</td>
    </tr>
    <tr>
      <th>CEO</th>
      <td> {fullDetails[0].ceo}</td>
    </tr>
    <tr>
      <th>Sector </th>
      <td> {fullDetails[0].sector}</td>
    </tr>
  </tbody>
</table>
            <p>{fullDetails[0].description}</p>
            </>
        : <p>Loading...</p>}
    </div>);
}

export default StockPage;
