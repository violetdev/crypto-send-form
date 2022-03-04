import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/navbar'
import TransactionForm from '../components/transactionForm'
import { TransactionProvider } from '../context/transactionContext'

const Home: NextPage = (props) => {
    return (
        <TransactionProvider>
            <Head>
                <title>Simple Crypto Transaction Service</title>
            </Head>

            <Navbar />

            <div className='flex justify-center items-center h-screen bg-slate-100 dark:bg-zinc-800'>
                <TransactionForm />
            </div>
        </TransactionProvider>
    )
}

export default Home
