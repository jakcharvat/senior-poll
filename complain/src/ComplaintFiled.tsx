import React from 'react'
import Button from './Button'
import { ComplaintResponse } from './ComplainForm'
import Heading from './Heading'


function ComplaintFiled(props: {
    response: ComplaintResponse | null
    onNewComplaint: () => void
}) {
    return (
        <div className={`container max-w-lg mx-auto mt-20 px-6 pt-6 pb-4 rounded-2xl ${props.response?.success ? 'bg-green-600 dark:bg-green-400' : 'bg-red-600 dark:bg-red-400'}`}>
            <Heading color={{ light: 'white', dark: 'black' }}>{props.response?.success ? 'Success' : 'Error' }</Heading>
            { props.response && <p className="py-3 text-white dark:text-black font-normal dark:font-medium">{props.response.message}</p> }
            <Button
                label={props.response?.success ? 'New Complaint' : 'Try Again'} 
                onClick={props.onNewComplaint}
                background={{ light: 'white', dark: 'black'}}
                textColor={props.response?.success ? { light: 'green-600', dark: 'green-400' } : { light: 'red-600', dark: 'red-400' }}
                hoverBackground={{ light: 'gray-100', dark: 'gray-900' }}
                ringColor={props.response?.success ? { light: 'green-400', dark: 'green-600' } : { light: 'red-400', dark: 'red-600' }}
                className="mt-6 left-1/2 relative transform -translate-x-1/2" />
        </div>
    )
}


export default ComplaintFiled