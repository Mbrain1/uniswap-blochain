import Swap from "/components/features/Swap";
import Vote from "/components/features/Vote";
import Charts from "/components/features/Charts";
import Pool from "/components/features/Pool";
import { useTransactionContext } from "/context/TransactionContext";

const Home = () => {

    const { data } : any = useTransactionContext();

    const page = () => {
        const { currentPage } = data;

        if(currentPage == 'Swap') return  <Swap />;
        else if(currentPage == 'Pool') return  <Pool />;
        else if(currentPage == 'Vote') return  <Vote />;
        else if(currentPage == 'Charts') return  <Charts />;
    }

  return page()
  
}

export default Home