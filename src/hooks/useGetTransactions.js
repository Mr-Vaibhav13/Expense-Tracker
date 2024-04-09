import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"
import { useEffect, useState } from "react"

export const useGetTransactions = () =>{
    const [transactions, setTransactions] = useState([])

    const [total, setTotal] = useState({balance: 0.0, expense:0.0, income:0.0})

    
    const {userID} = useGetUserInfo();

    let result;

    const TaCollectionRef = collection(db, 'transactions');
    
    const docs = [];

    const getTransactions  = async () =>{
         try {
            const queryTransactions = query(TaCollectionRef ,
                where("userID" , "==" , userID),
                orderBy("createdAt"))

            
            result = onSnapshot(queryTransactions , (snapShot)=>{
                
                let totalIncome = 0;
                let totalExpenses= 0;
                // console.log(snapShot)
                snapShot.forEach((a)=>{
                    const data = a.data();
                    const id = a.id;

                    docs.push({...data, id})

                    if(data.transactionType === 'expense'){
                        totalExpenses+=Number(data.transactionAmount)
                    }
                      
                    else if(data.transactionType === 'income'){
                        totalIncome+=Number(data.transactionAmount)
                    }
                    //  console.log(docs)
                });
                setTransactions(docs)

                let balance = totalIncome - totalExpenses;

                setTotal({
                    balance,
                    expense: totalExpenses,
                    income: totalIncome
                })
            })
            
         } catch (err) {
            console.error(err)
         };

         

         return () =>result()
    }


    useEffect(()=>{
        getTransactions()
    },[])




    return{transactions, total}

}