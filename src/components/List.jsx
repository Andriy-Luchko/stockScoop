import "./List.css";
import StockInfo from './StockInfo';
import Card from './Card';

function List({ list, positive, negative, low, high}) {
    function averagePercentChange(list) {
        if (list.length === 0) {
            return 0;
        }

        var sum = list.reduce(function(a, b) {
            return a + b.changesPercentage;
        }, 0);

        var average = sum / list.length;

        return average;
    }
    const filteredList = list && list.filter(stock => {
        if (!positive && stock.changesPercentage > 0) {
            return false; // Filter out negative percent change stocks if positive parameter is true
        }
        if (!negative && stock.changesPercentage < 0) {
            return false; // Filter out positive percent change stocks if negative parameter is true
        }
        if (low && stock.price < low) {
            return false; // Filter out stocks with price lower than low parameter
        }
        if (high && stock.price > high) {
            return false; // Filter out stocks with price higher than high parameter
        }
        return true;
    });
    return (<div className="List">
        <h3>Most Traded Stocks Today</h3>
        {list && <div className="cardContainer">
            <Card className="card" text="Average Percent Change" data={averagePercentChange(list).toFixed(2) + "%"} />
            <Card className="card" text="Number of Positive Percent Change Stocks" data={list.filter(
                stock => stock.changesPercentage > 0).length
            } />
            <Card className="card" text="Number of Positive Percent Change Stocks" data={list.filter(
                stock => stock.changesPercentage < 0).length
            } />
        </div>
        }
        <StockInfo symbol="Symbol" name="Name" price="Price (USD)" change="Change" changesPercentage="Percent Change" />
        {list && filteredList.map(stock =>
            <StockInfo key={stock.symbol} className="stockInfo" symbol={stock.symbol} name={stock.name} price={"$" + stock.price} change={stock.change} changesPercentage={stock.changesPercentage.toFixed(2)} />


        )}
    </div>);
}

export default List;
