import { useState, useEffect } from "react";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import Sidebar from "./components/Sidebar";
function App() {
    const API_KEY = import.meta.env.VITE_APP_KEY;    
    const [list, setList] = useState(null);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(10000);
    const [positive, setPositive] = useState(true);
    const [negative, setNegative] = useState(true);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
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

    return (
        <>
        <div className="App">
        <Header />
        <Sidebar positive={positive} negative={negative} low={low} high={high} setPositive={setPositive} setNegative={setNegative} setLow={setLow} setHigh={setHigh}/>        
        <List list={filteredResults} low={low} high={high} positive={positive} negative={negative}/>
        <label>Search bar: 
        <input className="input"
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
        />
        </label>
        </div>
        </>
    );
}

export default App;
