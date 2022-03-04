import { useContext } from 'react';
import { TransactionContext } from '../context/transactionContext';

interface InputProps {
    placeholder: string;
    name: string;
    type: string;
    handleChange: Function;
}


const Input = ({ placeholder, name, type, handleChange }: InputProps) => (
    <div className='group w-10/12 h-16'>
        <input
            placeholder={placeholder}
            type={type}
            step='0.0001'
            onInput={(e) => handleChange(e, name)}
            required
            className='w-full h-14 -ml-3 px-2 pt-2 rounded-lg shadow-sm font-bold border-transparent border-2 focus:border-zinc-600 focus:border-solid outline-none dark:text-white text-sm bg-slate-100 dark:bg-neutral-800 placeholder:opacity-0'
        />
        <span className='w-full relative -top-[40px] text-sm text-gray-500 select-none pointer-events-none group-focus-within:text-xs group-focus-within:-top-[58px] transition-all'>{placeholder}</span>
    </div>
)

const TransactionForm = () => {

    const { formData, sendTransaction, handleChange, isLoading }: any = useContext(TransactionContext)
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { addressTo, amount } = formData;
        
        if (!addressTo || !amount ) {
            return;
        }
        
        sendTransaction(formData);

    }

    return (
        <form onSubmit={handleSubmit} className='p-1 sm:w-96 w-full flex flex-col justify-start items-center shadow-2xl bg-gray-200 dark:bg-stone-900 rounded-2xl transition-all'>
            <h1 className='px-5 pt-5 text-2xl w-full dark:text-white'>Transaction Information</h1>
            <hr className='mb-10 bg-gray-300 dark:bg-gray-200 w-full mt-2 h-[3px] dark:h-[1px] transition-all'></hr>
            <Input placeholder='Address To' name='addressTo' type='text' handleChange={handleChange} />
            <Input placeholder='Amount (ETH)' name='amount' type='number' handleChange={handleChange} />
            <hr className='bg-gray-300 dark:bg-gray-200 w-full mt-8 h-[3px] dark:h-[1px] transition-all'></hr>
            <button type='submit' className='flex justify-center items-center w-1/2 h-10 m-4 rounded-2xl shadow-lg text-white bg-violet-500 shadow-violet-500/50 dark:shadow-neutral-900 dark:bg-neutral-800 hover:-translate-y-1 transition-all disabled:hover:-translate-y-0' disabled={isLoading}>
                {isLoading ? <svg className='animate-loadRotate w-6' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle className='animate-loadSpin stroke-white dark:stroke-violet-500' cx='50' cy='50' r='45' fill='none' strokeDasharray='300' strokeWidth='10px'/></svg> : 'Send'}
            </button>
        </form>
    )
}

export default TransactionForm;