import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { useTransactionContext } from "/context/TransactionContext";

const Loader = () => {

	const { data } : any = useTransactionContext();

	return (
		<div className={`modal-wrapper ${!data.loading && 'hide-modal'}`}>
			<div className={`modal-inner-wrapper`}>
				<div className={`relative z-[300]`}>
					<ClipLoader color="#fff" loading={data.loading}  size={150}  />
				</div>
			</div>
		</div>
	)

}

export default Loader