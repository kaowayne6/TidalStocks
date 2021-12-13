import React, { useContext } from 'react';
import { Stock } from './Stock';

import { GlobalContext } from '../../context/GlobalState';

export const StockList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <ul className="list">
        {transactions.map(stock => (<Stock key={stock.id} stock={stock} />))}
      </ul>
    </>
  )
}