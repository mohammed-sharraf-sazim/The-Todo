import React, {useRef} from 'react'
import './InputField.css'


interface Props {
    todo: string, 
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e:React.FormEvent)=> void
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
        <form className='input'  onSubmit={(e)=>{
                handleAdd(e);
                inputRef.current?.blur();
            }}>
            <input type="input" placeholder='Type your thoughts' className='input__box' value={todo} onChange={(e)=> setTodo(e.target.value)}/>
            <button className='input_submit' type='submit'> + </button>
        </form>
        </div>
    )
} 

export default InputField
