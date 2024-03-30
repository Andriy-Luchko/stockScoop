
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
        <p className="infoItem">{symbol}</p>
        <p className="infoItem">{name}</p>
        <p className="infoItem">{price}</p>
        <p className={"infoItem " + returnColor(change)} >{change}</p>
        <p className={"infoItem " + returnColor(changesPercentage)}>{changesPercentage}</p>
        </div>
    );
}

export default StockInfo;
