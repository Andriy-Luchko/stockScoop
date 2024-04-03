import {Link} from 'react-router-dom';
import "./StockInfo.css";

function StockInfo({symbol, name, change, price, changesPercentage}) {

    function returnColor(value){
        if (value === "Change" || value === "Percent Change"){
            return "";
        }

        return value < 0 ? "red" : "green";
    }
    return (
        <div className="stockInfo"> 
        {
        symbol === "Symbol" ? 
        <p className='infoItem'>{symbol}</p>:  
        <Link to={"/" + symbol} className="infoItem Link">{symbol}</Link>
        }
        <p className="infoItem">{name}</p>
        <p className="infoItem">{price}</p>
        <p className={"infoItem " + returnColor(change)} >{change === "Change" ? change : (change < 0 ? "-$" + change * -1 : "$" + change) }</p>
        <p className={"infoItem " + returnColor(changesPercentage)}>{changesPercentage === "Percent Change" ? changesPercentage : changesPercentage + "%"}</p>
        </div>
    );
}

export default StockInfo;
