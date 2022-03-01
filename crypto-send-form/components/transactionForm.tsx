import { useContext } from "react";
import { TransactionContext } from "../context/transactionContext";

interface Props {
    placeholder: string;
    name: string;
    type: string;
    handleChange: Function;
}


const Input = ({ placeholder, name, type, handleChange }: Props) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        onInput={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm"
    />
)

const TransactionForm = () => {

    const { formData, sendTransaction, handleChange }: any = useContext(TransactionContext)
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { addressTo, amount, keyword, message } = formData;
        
        if (!addressTo || !amount || !keyword || !message ) {
            return;
        }
        
        sendTransaction(formData);

    }

    return (
        <div className="flex w-full justify-end items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between py-4 px-4">
                <div className="flex flex-col flex-1 items-center justify-start w-full">
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-blue-800 rounded-2xl">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                    </div>
                </div>
            </div>
            <button
                onClick={ handleSubmit }
            >
            </button>
        </div>
    )
}

export default TransactionForm;