import React, { useState } from 'react'
import { useTransactionContext } from "/context/TransactionContext";
import axios from "/utils/axios";
import { addDoc, serverTimestamp, query, getDocs, where } from  "firebase/firestore";
import { listedTokensTable } from "/firebase";


const styles = {
    body : `w-4/5 md:w-2/5 bg-white rounded-3xl shadow-lg p-3 border space-y-3`,
    allCenter : `flex justify-center items-center`,
    tokenFormSwap : `grid grid-cols-1 gap-2`,
    headerTitle : `font-semibold font-semibold`,
    headerDescription : `text-sm`,
    selectBtn: `flex p-1 px-2 text-gray-900 shadow-xl border font-bold space-x-2 justify-between items-center absolute right-3 top-4 rounded-full text-lg`
}

const Pool = () => {

    const { connectWallet, data, setData, web3, toastr } : any = useTransactionContext();

    const { tokenAddress } = data;

    const isTokenListed =  () => {

        return new Promise(async (resolve, reject) => {

            let q = query(listedTokensTable, where('address','==',tokenAddress));

            const snapshot = await getDocs(q);
            let tokens = [];

            snapshot.docs.map((doc) => {
              tokens.push({...doc.data(), id: doc.id})
            });

            resolve(tokens.length > 0);

        })
        
    }

    

    const verifyToken = async (e) => {
        e.preventDefault();

        if(await isTokenListed()) return  toastr.error('This token has been listed already');

        setData({...data,loading : true})

         axios.get(`api?module=contract&action=getsourcecode&address=${tokenAddress}`)
          .then(async (res : any) => {

            const { result } = res.data;

            const abi = JSON.parse(result[0].ABI);

            const token = await new web3.eth.Contract(abi, tokenAddress);

            const symbol =  await token.methods.symbol().call();
            const name =  await token.methods.name().call();
            const decimals =  await token.methods.decimals().call();
            const totalSupply =  await token.methods.totalSupply().call();


             setData({...data,loading : false})

            if(symbol && name && decimals && totalSupply){
                //this is where the token will be saved firebase or listed
                   
                 await addDoc(listedTokensTable, {
                          address : tokenAddress,
                          decimal : decimals,
                          name : name,
                          symbol : symbol,
                          total_supply : totalSupply,
                          created_at: serverTimestamp()
                        }).catch(console.log)

                  e.target.reset();

                  return  toastr.success("Token has been Listed");
            }

             toastr.error("Invalid Token Address")

          })
          .catch((err) => {

            toastr.error("Invalid Token Address")
            setData({...data,loading : false})
            console.log(err.message)
          });

    }

  return (
    <>
        <section className={`${styles.allCenter}`}>
            <div className={`${styles.body}`}>
                <h1 className={`flex justify-between items-center pt-2 px-2`}>
                    <div>
                        <span className={`${styles.headerTitle}`}>Add Token</span>
                        <p className={`${styles.headerDescription}`}>Add new Tokens to the pool</p>
                    </div>
                </h1>
                <form className={`${styles.tokenFormSwap}`} onSubmit={(e) => verifyToken(e)}>
                    
                    <div className={`form-group`}>
                        <input 
                            type='text' 
                            className="form-control"
                            placeholder="Token Address"
                            onChange={(e) => setData({...data, tokenAddress: (e.target.value).trim()})}
                         />
                    </div>

                    <div className={`form-group`}>
                        {data.address.length === 0 ? 
                        <button 
                            onClick={() => connectWallet()}
                            type="button"
                            className={`btn btn-md text-center bg-pink-200 text-pink-600 w-full`}>Connect Wallet</button>
                        :
                        <button 
                            type="submit"
                            className={`btn btn-md text-center bg-blue-800 text-white w-full`}>Verify Token</button>
                        }
                    </div>
                </form>
            </div>
        </section>
    </>
    )
}

export default Pool