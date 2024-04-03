import { Legend, Bar, BarChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useState, useEffect } from "react";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import Sidebar from "./components/Sidebar";
function App() {
    const API_KEY = import.meta.env.VITE_APP_KEY;    
    const [list, setList] = useState([]);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(10000);
    const [positive, setPositive] = useState(true);
    const [negative, setNegative] = useState(true);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [lineGraph, setLineGraph] = useState(true);
    useEffect(() => {
        const fetchAllStockData = async () =>{
            const response = await fetch("https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=" + API_KEY);
            const json = await response.json();
            setList(json);
            setFilteredResults(json);
        }
        fetchAllStockData().catch(console.error);
    }, []);

    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
            const filteredData = list.filter((item) => 
                Object.values(item)
                .join("")
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            setFilteredResults(filteredData);
            console.log(filteredData);
        } else {
            setFilteredResults(list);
        }
    };
const sortedData = [...list].sort(function(a,b) {
var priceA = parseInt(a.price);
var priceB = parseInt(b.price);

    return priceA - priceB;
});
function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Ticker : ${label}`}</p>
        <p className="label">{`Percent Change : ${payload[0].value}`}</p>

        </div>
    );
  }

  return null;
}
const renderLineChart = (
  <>
    <LineChart width={600} height={300} data={sortedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="changesPercentage" stroke="#01bdbd" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="symbol" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} wrapperStyle={{ backgroundColor: '#ccc', padding: '5px'}}/>
  </LineChart>
</>
    );

const renderBarChart = (
<BarChart width={600} height={300} data={sortedData}>
  <CartesianGrid strokeDasharray="5 5" />
  <XAxis dataKey="symbol" />
  <YAxis />
    <Tooltip content={<CustomTooltip />} wrapperStyle={{ backgroundColor: '#ccc', padding: '5px'}}/>
  <Bar dataKey="changesPercentage" fill="#8884d8" />
</BarChart>
);

const toggleGraphType = () => {
    setLineGraph(prevLineGraph => !prevLineGraph);
  };

return (
        <>
        <div className="App">
        <Header />
        <Sidebar positive={positive} negative={negative} low={low} high={high} setPositive={setPositive} setNegative={setNegative} setLow={setLow} setHigh={setHigh}/>        
        <List list={filteredResults} low={low} high={high} positive={positive} negative={negative}/>
        <div className="rightSideBar">
        <label>Search bar: 
        <input className="input"
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}/>
        </label>
        <button className='graphToggleButton' onClick={toggleGraphType}>Change Graph Type</button>
        {lineGraph ? renderLineChart : renderBarChart}
<p>This chart displays the stocks sorted in price on the X-axis and their percent change on Y-axis demonstrating the increased volatility in penny stocks </p>
    </div>
        </div>
        </>
    );
}

export default App;
