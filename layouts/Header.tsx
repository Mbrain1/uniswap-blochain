import React, { useState } from 'react'
import { useTransactionContext } from "/context/TransactionContext";

const styles = {
    header: `px-5 py-3 flex justify-between items-center`
}

const Header = () => {
  const [selectedNav, setSelectedNav] : string = useState('Swap');
  const { connectWallet, data} : any = useTransactionContext();

	return (
		 <header className={`${styles.header}`}>
            <img src="/images/ethCurrency.png" className="h-10 w-auto" />

            <div className={`p-1 bg-white rounded-2xl`}>
                {['Swap','Pool','Vote','Charts'].map((item: string, index: number) => 
                <button 
                        key={index}
                        onClick={() => setSelectedNav(item)}
                        className={`${selectedNav == item && 'bg-gray-100 font-bold'} rounded-2xl py-1 px-4`}>
                    {item}
                </button>)}
            </div>

            <div className={``}>
            {data.address.length === 0 ?
              <button
                onClick={() => connectWallet()} 
                className={`btn py-1 ring ring-white text-center bg-pink-200 text-pink-600 px-5`}>Connect Wallet</button>
                :
                <button
                className={`btn py-1 ring ring-white text-center bg-pink-200 text-pink-600 px-5`}>{data.address.slice(0, 7)}...{data.address.slice(35)}</button>
            }

            </div>
        </header>	)
}

export default Header