import {addDoc ,collection, serverTimestamp} from 'firebase/firestore'
import {db} from '.././config/firebase-config'

import {useGetUserInfo} from '../hooks/useGetUserInfo'

export const useAddTransactions = () =>{
    
    const TcollectionRef = collection(db , "transactions")
    const {userID} = useGetUserInfo()


    const addTransactions = async ({
        description,
        transactionAmount,
        transactionType
    }) =>{
        await addDoc(TcollectionRef ,{
            userID : userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        })
    }
    
    return {addTransactions};
}