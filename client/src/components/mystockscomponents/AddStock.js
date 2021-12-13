import React, {useState, useContext} from 'react'
import { GlobalContext } from '../../context/GlobalState';

export const AddStock = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h4>Add new stock</h4>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Ticker </label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter ticker..." />
        </div>
        <br/>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            </label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <br/>
        <button className="btn btn-primary btn-block">Add Stock</button>
      </form>
    </>
  )
}