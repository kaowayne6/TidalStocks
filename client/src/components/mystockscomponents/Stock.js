import React, {useContext} from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Stock = ({ stock }) => {
    const { deleteTransaction } = useContext(GlobalContext);
    return (
      <li>
        {stock.text}: {stock.amount} shares <button class="btn btn-danger" onClick={() => deleteTransaction(stock.id)}>x</button>
      </li>
    )
  }