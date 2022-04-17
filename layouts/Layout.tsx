import React, { useEffect } from 'react'
import Loader from "/components/Loader";
import { onSnapshot, query, orderBy, limit, where } from  "firebase/firestore";
import { useToasts } from 'react-toast-notifications';
import { transactionTable } from "/firebase";
import type { AppProps } from 'next/app';

const currentTimeStamp = new Date(Math.floor((new Date().getTime())) - (600*1000)); //Current unix timestamp in seconds

const q = query(transactionTable, 
			orderBy('created_at','desc'),
			where('created_at','>',currentTimeStamp), //Get records added in the last 3 seconds
			limit(4));

interface LayoutProps {
	children : React.ReactNode
} 

const Layout = ({children} : LayoutProps ) => {

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
			{ children }
		</>
	)
}

export default Layout