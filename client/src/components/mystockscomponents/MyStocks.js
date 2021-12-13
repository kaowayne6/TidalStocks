import { GlobalProvider } from '../../context/GlobalState';
import { StockList } from './StockList';
import {AddStock} from './AddStock';

export const MyStocks = () => {
    return (
        <GlobalProvider>
        <div className="container">
            <h1> My Stocks </h1>
            <StockList />
            <AddStock />
        </div>
    </GlobalProvider>
    )
}