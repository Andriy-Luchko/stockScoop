import "./Sidebar.css"

function Sidebar({positive, negative, setPositive, setNegative, low, setLow, high, setHigh}){
    return (
        <div className="Sidebar">
        <h2>Filters</h2>
        <div>
        <label>
        <p>Show Positive Stocks Today</p>
        <input type="checkbox" checked={positive} onChange={() => setPositive(!positive)} />
        </label>
        </div>
        <div>
        <label>
        <p>Show Negative Stocks Today</p>
        <input type="checkbox" checked={negative} onChange={() => setNegative(!negative)} />
        </label>
        </div>
        <div>
        <label>
        <p>Set Low Price:</p>
        <input type="number" value={low} onChange={e => setLow(parseFloat(e.target.value))} />
        </label>
        <p>Current Low: {low}</p>
        </div>
        <div>
        <label>
        Set High Price:
        <input type="number" value={high} onChange={e => setHigh(parseFloat(e.target.value))} />
        </label>
        <p>Current High: {high}</p>
        </div>
        </div>
    );       
}

export default Sidebar;
