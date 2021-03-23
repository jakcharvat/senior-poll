import React from 'react'

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;

function Input(props: {
    name: string,
    label?: string,
    value: string,
    placeholder?: string,
    onChange: (str: string) => void,
    className?: string,
    textarea?: Boolean
}) {
    const InputElement = props.textarea ? 'textarea' : 'input'

    return (
        <div className={`table-row ${props.className ?? ''}`}>
            
            { props.label && <label htmlFor={props.name} className={`table-cell mr-3 ${props.textarea ? 'align-top pt-3.5 pr-2' : ''} text-black dark:text-white font-normal dark:font-medium`}>{ props.label }</label> }
        
            <InputElement className={`table-cell shadow-none w-full py-1 px-2.5 rounded-sm border border-gray-300 dark:border-gray-700 outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-blue-300 dark:focus:border-blue-700 focus:border-transparent ${props.label ? 'mt-3' : ''} ${props.textarea ? 'h-20' : ''} bg-white dark:bg-black text-black dark:text-white`}
                name={props.name} 
                type="text" 
                value={props.value} 
                placeholder={props.placeholder}
                onChange={({ target: { value } }: InputChangeEvent) => props.onChange(value)} />
        
        </div>
    )
}


export default Input