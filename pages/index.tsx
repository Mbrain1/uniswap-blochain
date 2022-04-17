import React from "react";
import { AiOutlinePlus, AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";
import Footer from "/layouts/Footer"; 

const styles = {
    topLink: `rounded-full py-4 px-6 bg-blue-700 text-xs md:text-lg font-medium flex items-center`,
    callToAction: `rounded-xl btn bg-pink-300 text-pink-700 py-3 px-8 text-base md:text-xl `,
    pageWrapper : `bg-blue-900 min-h-[100vh] md:max-h-[100vh] text-white`
}

const Home = () => {
  return (
    <section className={styles.pageWrapper}>
         <section className="container py-12 flex justify-center md:justify-start">
           <Link href="/app">
            <a className={styles.topLink}> Swap and List your Tokens &nbsp; <AiOutlinePlus size={20} /></a>
           </Link>
        </section>
        <div className="container grid md:grid-cols-2 gap-12  ">
            <div className="space-y-7">
              <div>
                <img src="/images/eth.png" className="h-20" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Swap and List your Tokens</h1>
              <p className="text-xl">
                Use FastExchange to swap and list your tokens deployed on Rinkeby Testnet, it's quick and easy with no extra fees.
              </p>

              <div className={`text-white flex items-center space-x-3`}>
                  <a href="https://github.com/mfonabasiudobia/uniswap-blochain" target="_blank"><AiOutlineGithub size={25} /></a>
                  <a href="https://www.linkedin.com/in/mfonabasi-udobia-a84128217" target="_blank"><AiOutlineLinkedin size={25} /></a>
              </div>
              <div>
                <Link href="/app">
                    <a  className={styles.callToAction}>Get Started</a>
                </Link>
              </div>
            </div>
           <div className="flex justify-center ">

             <img src="/images/app.png" className={`rounded-3xl`} />

           </div>
        </div>

        <Footer />

    </section>
  )
}

export default Home;
