import { useContext, useState } from "react"
import { TransactionContext } from "../context/transactionContext"


export default function Navbar() {

    const { currentAccount, connectWallet }: any = useContext(TransactionContext);
    const [darkMode, setdarkMode] = useState(true);

    const toggleDark = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
        setdarkMode(!darkMode)
    }

    return (
        <div className='bg-gray-50 flex justify-between items-center px-5 py-3 dark:bg-neutral-800 text-gray-200 border-b-[1px] border-gray-200 border-opacity-10 transition-all'>
            <a href='http://localhost:3000'>
                <h1 className='text-2xl text-black dark:text-white transition-all'>Home</h1>
            </a>
            <ul className='flex align-middle space-x-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 p-1 rounded-full hover:cursor-pointer hover:bg-gray-200 transition ease-linear duration-150" viewBox="0 0 20 20" fill="gray"
                    onClick={toggleDark}>
                    {darkMode ?
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    :
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />}
                </svg>
                { !currentAccount ? 
                    <button className='px-3 py-1 font-bold border-2 rounded border-violet-500 text-violet-500 hover:text-purple-100 hover:bg-violet-500 transition ease-linear duration-150'
                        onClick={ connectWallet }>
                        Connect Wallet
                    </button>
                    :
                    <a href={'https://etherscan.io/address/'+currentAccount} target="_blank" rel='noreferrer noopenner'  className='group pt-2 font-bold text-violet-500 dark:text-violet-500 cursor-pointer'>{currentAccount.substring(0, 5)}{' ... '}{currentAccount.substring(currentAccount.length - 5)}
                        <div className='mt-2 ml-4 text-xs h-10 w-16 rounded p-1 hidden group-hover:block absolute bg-violet-500 text-white dark:bg-stone-900 dark:text-violet-500'>View Etherscan</div>
                    </a>
                }
            </ul>
        </div>
    )
}
