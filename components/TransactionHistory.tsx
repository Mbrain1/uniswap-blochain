import React from 'react'

const TransactionHistory = ({ children } ) => {
	const { amount, created_at, to, trxnHash } = children;
	const time = created_at.seconds.toDate();
	return (
		<div className={`rounded-xl px-4 py-2 text-white bg-[#191a1e] my-2 text-sm`}>
		    <span>{amount} ETH sent to {(to).slice(0, 7)}... on {time}</span>  <a target="_blank" href={`https://rinkeby.etherscan.io/tx/`+trxnHash} className={`text-blue-500`}>View on Etherscan</a>
		 </div>
	)
}

export default TransactionHistory