import React from 'react'
import { useTransactionContext } from "/context/TransactionContext";
import Link from "next/link";

const styles = {
    header: `px-5 py-3 flex justify-between items-center w-full`
}

const Header = () => {

  const { connectWallet, data, setData } : any = useTransactionContext();

  const nav = (dynamicClass : string) => {
     return (<div className={`p-1 bg-white rounded-2xl ${dynamicClass}`}>
                {['Swap','Pool','Vote','Charts'].map((item: string, index: number) => 
                <button 
                        key={index}
                        onClick={() => setData({...data, currentPage : item})}
                        className={`${data.currentPage == item && 'bg-gray-100 font-bold'} rounded-2xl py-1 px-4`}>
                    {item}
                </button>)}
      </div>)
  }
	return (
    <header className={`flex flex-col items-center`}>
		 <div className={`${styles.header}`}>
            <Link href="/"><a><img src="/images/ethCurrency.png" className="h-10 w-auto" /></a></Link>

            {nav('hidden md:block')}

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
        </div>
          {nav('inline-block md:hidden')}	
      </header>)
}

export default Header