import Swap from "/components/features/Swap";
import Vote from "/components/features/Vote";
import Charts from "/components/features/Charts";
import Pool from "/components/features/Pool";
import { useTransactionContext } from "/context/TransactionContext";
import Header from "/layouts/Header"; 
import Footer from "/layouts/Footer"; 

const App = () => {

    const { data } : any = useTransactionContext();

    const page = () => {
        const { currentPage } = data;

        if(currentPage == 'Swap') return  <Swap />;
        else if(currentPage == 'Pool') return  <Pool />;
        else if(currentPage == 'Vote') return  <Vote />;
        else if(currentPage == 'Charts') return  <Charts />;
    }

  return  (<>
             <Header />
             {page()}
             <Footer />
             </>
          )
  
}

export default App