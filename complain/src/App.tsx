import React, { useState } from 'react'
import ComplainForm, { ComplaintResponse } from './ComplainForm'
import ComplaintFiled from './ComplaintFiled'


function App() {
  const [response, setResponse] = useState<ComplaintResponse | null>(null)

  return (
    <div className="px-3 pb-3">
      { response
        ? <ComplaintFiled response={response} onNewComplaint={() => setResponse(null)} />
        : <ComplainForm onFinished={setResponse} /> }
    </div>
  )
}

export default App
