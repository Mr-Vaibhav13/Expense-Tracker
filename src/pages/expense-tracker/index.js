import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
 
import {useAddTransactions} from '../../hooks/useAddTransactions'
import {useGetTransactions} from '../../hooks/useGetTransactions'
import {useGetUserInfo} from '../../hooks/useGetUserInfo'


import "./style.css"
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'

const ExpenseTracker = () => {


  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");


  

  const navigate = useNavigate();

  const {name , profilePhoto} = useGetUserInfo() 

  const {transactions, total} = useGetTransactions()
  const {balance,expense,income} = total;
   

  const {addTransactions} = useAddTransactions();

  const tSlice = transactions.slice(1,transactions.length/2+1)

  const onSubmit = async(e) =>{
    e.preventDefault();
    await addTransactions({description:description, 
                           transactionAmount:transactionAmount, 
                           transactionType:transactionType})

    setDescription("")
    setTransactionAmount("")

  }

  const signUserBtn =async() =>{
    try {
      await signOut(auth);
      localStorage.clear()
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <div className='expense-tracker'>

      <div className='container'>
        <h1>{name} - Expense Tracker</h1>
        <div className='balance'>
          <h3> Your Balance</h3>
          <h2>{balance}</h2>
        </div>
        
        <div className='summary'>

          <div className='income'>
            <h4>Income</h4>
            <p>{income}</p>
          </div>
          <div className='expenses'>
            <h4>Expenses</h4>
            <p>{expense}</p>
          </div>
        </div>

        <form className='add-transaction' onSubmit={onSubmit}>
          <input type='text' placeholder='Description' required value={description}
          onChange={(e)=>{setDescription(e.target.value)}}/>

          <input type='number' placeholder='Amount' required value={transactionAmount}
          onChange={(e)=>{setTransactionAmount(e.target.value)}}/>

          
          <input type='radio' id='expense' value="expense"
          onClick={(e)=>{setTransactionType(e.target.value)}}
          checked={transactionType==="expense"}/>
          <label htmlFor='expense'>Expense </label>

          <input type='radio' id='income' value="income"
          onClick={(e)=>{setTransactionType(e.target.value)}}
          checked={transactionType==="income"}/>
          <label htmlFor='income'>Income </label>

          <button type='submit'>Add Transaction</button>
        </form>

      </div>
      
      {/* {console.log({profilePhoto})} */}

      {profilePhoto && 
        <div className='profile'> 
        <img className='profile-photo' src={profilePhoto} alt=''/>
        <button className='sign-out-button' onClick={signUserBtn}>SignOut</button>
        </div>
      }
      
    </div>



    <div className='transactions'>

      <h3>Transactions</h3>
      {/* {console.log(tSlice)} */}
      
      

      {}

      <ul>
      {tSlice.map((val ,index) => {
    return (
      <li key={index}>
        <h4>{val.description}</h4>
        <h4 style={{color: val.transactionType==='expense' ? "red" : "green"}}>{val.transactionAmount}</h4>
      </li>
    );
  })}
      </ul>

    </div>


    </>
  )
}

export default ExpenseTracker