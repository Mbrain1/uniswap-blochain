import { useState, createContext, useContext, useEffect } from "react"
import Web3 from 'web3'
import { userTable, transactionTable } from "/firebase";
import { addDoc, serverTimestamp } from  "firebase/firestore";
import Toastr from 'toastr2';

export const TransactionContext = createContext()

let web3;
if(Web3.givenProvider){
    web3 = new Web3(Web3.givenProvider);
}

export const TransactionProvider = ({children}) => {

    const [data, setData] = useState({
        address : '',
        addressTo : '',
        tokenAddress : '',
        tokens : [],
        currentToken: { symbol : 'ETH', address : '', name : '' },
        currentPage : 'Swap',
        amount: 0,
        loading : false
    });

    const [toastr, setToastr] = useState('');

    useEffect(() => {
       
        isWalletConnected(); //Checks if Wallet is connected on Initial load
        isWalletChanged();  //Check if Wallet Connection has been Updated or changed

        setToastr(new Toastr());

    },[])

    const connectWallet = async () => {
        if(web3){
            const accounts =  await web3.eth.requestAccounts();
            setData({...data, address: accounts[0]}); //Save Wallet Address
        }else{
            toastr.error("Please Install Metamask")
        }
    }


    const isWalletConnected = async () => {
        if(web3){

            const accounts =  await web3.eth.getAccounts();
            if(accounts.length > 0){
              setData({...data, address: accounts[0]}); //Save Wallet Address
            }
        }
    }

    const isWalletChanged = async () => {
        if(web3){
                        window.ethereum.on('accountsChanged', async () => {
                            const accounts = await web3.eth.getAccounts();
                            if(accounts.length > 0){
                                setData({...data, address: accounts[0]}); //Save Wallet Address
                            }else{
                                setData({...data, address: ""});
                            }
                        });
            }
    }


    const saveTransaction = async (trxnHash, from, to, amount ) => {

         await addDoc(transactionTable, {
          from : from,
          trxnHash : trxnHash,
          to : to,
          amount : amount,
          symbol : data.currentToken.symbol,
          created_at: serverTimestamp()

         }).catch(console.log)

    }
   
    return (
    <TransactionContext.Provider value={{ connectWallet, data, setData, web3, saveTransaction, toastr }}>
        {children}
    </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => useContext(TransactionContext);