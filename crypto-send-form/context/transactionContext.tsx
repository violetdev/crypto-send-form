import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

declare global {
    interface Window {
        ethereum: any;
    }
}


export const TransactionContext = createContext({});

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    })

    return transactionContract;

}

export const TransactionProvider = ({ children }: any) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', message: '', keyword: ''});
    const [isLoading, setLoading] = useState(false);
    const [transactionCount, settransactionCount] = useState(0);

    const handleChange = (e: any, name: string) => {
        setFormData((prevstate) => ({ ...prevstate, [name]: e.target.value }));
    }

    const checkWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                return alert('Please Install Metamask');
            }
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            console.log(accounts)
    
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log('No Accounts Found')
            }
        } catch (error) {
            console.log(error)
            //throw new Error('No Ethereum Object.')
        }

    }

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                return alert('Please Install Metamask');
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            console.log(accounts[0])
        } catch (error) {
            console.log(error)
            //throw new Error('No Ethereum Object.')
        }
    }

    const sendTransaction = async () => {
        try {
            if (!window.ethereum) {
                return alert('Please Install Metamask');
            }
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);
            setLoading(true);
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait();
            setLoading(false);
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount();
            settransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkWalletConnected();
    }, [])

    return (
        <TransactionContext.Provider value = {{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            { children }
        </TransactionContext.Provider>
    )
}