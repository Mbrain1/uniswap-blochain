import React from 'react'
import Moment from "react-moment"

const TransactionHistory = ({ children } : any ) => {
	const { amount, created_at, to, trxnHash, symbol } = children;

	return (
		<div className={`rounded-xl px-4 py-2 text-white bg-[#191a1e] my-2 text-sm md:text-sm`}>
		    <span>{amount} {symbol} sent to {(to).slice(0, 7)}... on {<Moment date={created_at.seconds} format="ddd DD,YYYY [by] hA" unix />}</span>  <a target="_blank" href={`https://rinkeby.etherscan.io/tx/`+trxnHash} className={`text-blue-500`}>View on Etherscan</a>
		 </div>
	)
}

export default TransactionHistory