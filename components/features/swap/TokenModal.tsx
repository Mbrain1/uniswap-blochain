import React, { useState, useEffect } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useTransactionContext } from "/context/TransactionContext";
import { onSnapshot, query, orderBy, limit, where } from  "firebase/firestore";
import { listedTokensTable } from "/firebase";
import Modal from "/components/Modal";


const styles = {
    tokenList : `grid grid-cols-1 gap-2`,
    searchAddress : `form-control rounded-full py-3 font-medium text-base`,
    majorTokenItem : `flex items-center space-x-3 text-left rounded-xl p-2 hover:bg-gray-100`,
    tokenListWrapper : `text-left rounded-xl p-2`,
    tokenItem : `flex w-full items-center space-x-3 hover:bg-gray-100 text-left rounded-xl p-2 mb-2`,
    activeTokenItem : `bg-gray-100 cursor-not-allowed`,
    tokenLogo : `w-7 h-7`
}


const q = query(listedTokensTable, orderBy('created_at','desc'));

const TokenModal = ({ isOpen, setIsOpen } : any) => {

    const { connectWallet, data, setData, web3, saveTransaction } : any = useTransactionContext();
    const [ searchString, setSearchString ] = useState<string>("");

    const changeToken = (symbol : string, address : string, name : string) : void => {

        setData({...data, currentToken : { ...data.currentToken, symbol, address, name } });
        setIsOpen() //Close Modal
    }

    const searchToken = (item : any) : boolean => {

        return ((item.symbol.toLowerCase()).indexOf(searchString) > -1 || 
                (item.address.toLowerCase()).indexOf(searchString) > -1 || 
                    (item.name.toLowerCase()).indexOf(searchString) > -1)

    }

    const filterTokens = () : void => data.tokens.filter((item) => searchToken(item));

  useEffect(() => {

         onSnapshot(q, (snapshot : any) : void => {
            let token = [];
            snapshot.docs.map((doc : any) : void => {
              token.push({...doc.data()});
            });

            setData({...data, tokens : token});
          })
  
     },[]);

  return (
        <Modal isOpen={isOpen} setIsOpen={() => setIsOpen()} title="Select a token" >
           <div className={`${styles.tokenList}`} >
                    <section className={`border-b space-y-2 py-1`}>
                       
                       <input 
                        onChange={(e) => setSearchString((e.target.value).trim().toLowerCase())}
                        className={`${styles.searchAddress}`} 
                        placeholder="Search name or address"
                       />

                       <div className={`flex items-center p-2`}>
                            <button 
                                disabled={(data.currentToken.symbol == "ETH")}
                                onClick={() => changeToken("ETH")}
                                className={`${styles.majorTokenItem} ${(data.currentToken.symbol == "ETH") && styles.activeTokenItem}`}>
                                <img src="/images/eth.png" className={styles.tokenLogo} />
                                <div>
                                    <h2 className={`font-semibold`}>ETH</h2>
                                </div>
                             </button>
                       </div>
                    </section>
                    
                    <section className={`py-3`}>

                        {filterTokens().slice(0, 30).map((item, index) => 
                        (<button
                            onClick={() => changeToken(item.symbol, item.address, item.name)}
                            disabled={(data.currentToken.symbol == item.symbol)} 
                            className={`${styles.tokenItem} ${data.currentToken.symbol == item.symbol && styles.activeTokenItem} `}>
                            <img src="/images/defaultTokenLogo.jpg" className={styles.tokenLogo} />
                            <div>
                                <h2 className={`font-semibold`}>{item.symbol}</h2>
                                <p className={`text-sm`}>{item.name}</p>
                            </div>
                         </button>)

                         )}

                        {filterTokens().length == 0 && <div className="text-center">No tokens found</div>}
                    </section>

                </div>
        </Modal>
    )
}

export default TokenModal