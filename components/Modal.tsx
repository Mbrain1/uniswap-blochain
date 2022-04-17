import React, { useRef, useEffect } from 'react'
import { FaTimes } from "react-icons/Fa";

interface LayoutProps {
	children : React.ReactNode,
	isOpen : boolean,
	setIsOpen : any,
	title : string
} 


const Modal = ({ children, isOpen, setIsOpen, title } : LayoutProps) => {

	 const ref = useRef(null);

	useEffect(() => {
	    const handleClickOutside = (e) => {
	      if (isOpen && ref.current && !ref.current.contains(e.target)) return setIsOpen();
	    };
	     
	     document.addEventListener('click', handleClickOutside, true);

	     return () => document.removeEventListener('click', handleClickOutside, true);
	
  	}, [ isOpen ]);

	return (
		 <section className={`modal-wrapper ${isOpen ? 'show-modal' : 'hide-modal'} `}>

	      <div className="modal-inner-wrapper">

	      	<div className="modal-body" ref={ref}>

	      		 <header className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-bold">{ title }</h2>
                          <button onClick={() => setIsOpen()}><FaTimes size={20} /></button>
                        </div>
            	</header>

				{ children }
			</div>
		  </div>
		</section>
	)
}

export default Modal