import '../styles/index.css';
import type { AppProps } from 'next/app';
import { TransactionProvider } from "/context/TransactionContext";
import Layout from "/layouts/Layout";
import 'toastr2/dist/toastr.min.css';
import { ToastProvider } from 'react-toast-notifications';
import TransactionHistory from "/components/TransactionHistory";

const MyApp = ({ Component, pageProps } : AppProps) => {
  return (
    <TransactionProvider>
      <ToastProvider components={{ Toast: TransactionHistory }} autoDismiss={true} autoDismissTimeout={10000} placement="bottom-right">
          <Layout>
            <div className="page-wrapper space-y-10">
               <Component {...pageProps} />
            </div>
          </Layout>
    </ToastProvider>
    </TransactionProvider>
  )
}

export default MyApp