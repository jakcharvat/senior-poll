import React, { useState } from 'react'
import Button from './Button'
import Heading from './Heading'
import Input from './Input'

type ComplaintResponse = { success: boolean, message: string }


const url = 'https://senior-poll-logging.herokuapp.com/log'
// const url = 'http://localhost:5000/log'


function ComplainForm(props: {
    onFinished: (res: ComplaintResponse | null) => void
}) {
    const [name, setName] = useState('')
    const [platform, setPlatform] = useState('')
    const [browser, setBrowser] = useState('')
    const [description, setDescription] = useState('')
    const [sending, setSending] = useState(false)


    async function submit() {
        setSending(true)
        const body = { name, platform, browser, description }
        console.log(body)
        const bodyString = JSON.stringify(body)
        console.log(bodyString)

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyString
            })

            const resBody = await res.json()

            if (res.status >= 200 && res.status < 300) {
                props.onFinished({
                    success: true,
                    message: resBody.message ?? 'Complaint successfully created'
                })
            } else {
                props.onFinished({
                    success: false,
                    message: resBody.message ?? 'Complaint creation failed'
                })
            }
        } catch(error) {
            props.onFinished({
                success: false,
                message: `Creating complaint failed. Please check the dev console for any logs. ${error}`
            })
        }
    }

    function disableSubmit(): boolean {
        return (!name || !platform || !browser || !description) || sending
    }

    return (
        <div className="flex flex-col container mx-auto font-sans pt-20">
            <Heading className="text-center">Complain about my poll...</Heading>
            <div className="table table-auto max-w-lg mx-auto w-full py-10">
                <Input name="name" label="Name: " value={name} placeholder="Jakub" onChange={setName} />
                <Input name="platform" label="Platform: " value={platform} placeholder="macOS 11" onChange={setPlatform} />
                <Input name="browser" label="Browser: " value={browser} placeholder="Safari" onChange={setBrowser} />
                <Input name="description" label="Description: " value={description} placeholder="The polling website is 💩" onChange={setDescription} textarea />
            </div>
            <Button label={sending ? 'Sending...' : 'Submit'} onClick={submit} disabled={disableSubmit()} />
        </div>
    )
}


export default ComplainForm
export type {
    ComplaintResponse
}