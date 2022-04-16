import { useState, useRef } from 'react'
import { FiSettings, FiArrowDown } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useTransactionContext } from "/context/TransactionContext";

const styles = {
    body : `w-4/5 md:w-2/5 bg-white rounded-3xl shadow-lg p-3 border space-y-3`,
    allCenter : `flex justify-center items-center`,
    tokenFormSwap : `grid grid-cols-1 gap-2`,
    headerTitle : `font-semibold font-semibold`,
    headerDescription : `text-sm`,
    swapArrowFromTop: `after:absolute after:-left-10 after:top-1/2 after:w-10 after:h-1 after:bg-pink-500 before:absolute before:-left-10 before:top-1/2 before:w-1 before:h-20 before:bg-pink-500`,
    swapArrowFromBottom: `after:absolute after:-left-10 after:top-1/2 after:w-10 after:h-1 after:bg-pink-500 before:absolute before:-left-2 before:top-[47%] before:w-2 before:h-2 before:bg-pink-500`,
    selectBtn: `flex p-1 px-2 text-gray-900 shadow-xl border font-bold space-x-2 justify-between items-center absolute right-3 top-4 rounded-full text-lg`
}

const Home = () => {

    const { connectWallet, data, setData, web3, saveTransaction } : any = useTransactionContext();
    const addressInput  = useRef<any>();
    const amountInput = useRef<any>();



    const sendTransaction = async () => {

        const { address, addressTo, amount } = data;

        //In real live project, once transaction has is available, save it to database to avoid future netwrok issues

        web3.eth.sendTransaction({
            from: address,
            to: addressTo,
            value: web3.utils.toWei(amount.toString(), 'ether')
        }).on('transactionHash', (hash : string) => {
            
             setData({...data,loading : !data.loading})

        }).once('confirmation', (confirmationNumber : number, receipt : any) => { 

                  setData({...data,loading : false})

                  const { transactionHash, from, to } = receipt;

                  saveTransaction(transactionHash, from, to, amount);

                  //Clear Field

                  amountInput.current.value =  "";
                  addressInput.current.value =  "";

        })
        .on('error', (err : any) => {

            console.error(err)
            setData({...data,loading : false})
        }); 

    }

  return (
    <>
        <section className={`${styles.allCenter}`}>
            <div className={`${styles.body}`}>
                <h1 className={`flex justify-between items-center pt-2 px-2`}>
                    <div>
                        <span className={`${styles.headerTitle}`}>Swap</span>
                        <p className={`${styles.headerDescription}`}>Trade tokens in an instant</p>
                    </div>
                    <FiSettings size={20} />
                </h1>
                <form className={`${styles.tokenFormSwap}`}>
                    <div className={`form-group ${styles.swapArrowFromTop}`}>
                        <input 
                            type='text' 
                            className="form-control" 
                            ref={amountInput}
                            placeholder="0.00"
                            onChange={(e) => setData({...data, amount: e.target.value})} 
                        />
                        <button className={`${styles.selectBtn}`}>
                            <img src="/images/eth.png" className={`w-5 h-5`} />
                            <div>ETH</div>
                            <IoIosArrowDown size={20} />
                        </button>
                    </div>
                    <div className={`form-group ${styles.swapArrowFromBottom}`}>
                        <input 
                            type='text' 
                            ref={addressInput}
                            className="form-control"
                            placeholder="0x00000"
                            onChange={(e) => setData({...data, addressTo: e.target.value})}
                         />
                       {/* <button className={`${styles.selectBtn}`}>
                            <img src="/images/uniswap.png" className={`w-5 h-5`} />
                            <div>MTNZ</div>
                            <IoIosArrowDown size={20} />
                        </button>*/}
                    </div>

                    <div className={`form-group`}>
                        {data.address.length === 0 ? 
                        <button 
                            onClick={() => connectWallet()}
                            type="button"
                            className={`btn btn-md text-center bg-pink-200 text-pink-600 w-full`}>Connect Wallet</button>
                        :
                        <button 
                            onClick={() => sendTransaction()}
                            type="button"
                            className={`btn btn-md text-center bg-blue-800 text-white w-full`}>Exchange</button>
                        }
                    </div>
                </form>
            </div>
        </section>
    </>
    )
}

export default Home