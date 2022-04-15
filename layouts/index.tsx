import React, { useEffect } from 'react'
import Header from "./Header"; 
import Loader from "/components/Loader";
import { onSnapshot, query, orderBy, limit } from  "firebase/firestore";
import { useToasts } from 'react-toast-notifications';
import { transactionTable } from "/firebase";

const q = query(transactionTable, orderBy('created_at','desc'), limit(4));

const Layout = ({children} : children) => {

	const { addToast } = useToasts();

	  useEffect(() => {

	     onSnapshot(q, (snapshot) => {

	        snapshot.docs.map((doc) => {
	          addToast({...doc.data()});
	        });

	        
	      })
  
  	 },[]);

	return (
		<>
		<Loader />
		<div className="page-wrapper space-y-10">
			 <Header />
			{ children }
		</div>
		</>
	)
}

export default Layout