'use client'

import { getTemperatureFromSmile } from '@/app/authService'
import { useState } from 'react'

export interface HistoryObject {
  input: string | null
  value: number
}

const CodingIntervieewPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [resultValue, setResultValue] = useState<number>(0)
  const [valueHistory, setValueHistory] = useState<HistoryObject[]>([])

  async function handleSubmit() {
    const temperature: number = await getTemperatureFromSmile(inputValue)
    const historyUpdate = [...valueHistory]
    historyUpdate.push({
      input: inputValue,
      value: temperature,
    })
    setValueHistory(historyUpdate)
    setResultValue(temperature)

    console.log('Submitted!')
  }
  return (
    <section className="text-left gap-y-6 py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px] relative">
      <div className="flex gap-x-4">
        Input SMILE:
        <form action={handleSubmit}>
          <input
            className="text-black px-2 py-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="ml-2">
            Submit
          </button>
        </form>
      </div>
      <div>Result: {`${resultValue}º`}</div>
      <div>
        {valueHistory.map((historyItem: HistoryObject, index: number) => {
          return (
            <div className="grid grid-cols-2" key={index}>
              <div>SMILE: {historyItem.input}</div>
              <div>Temp: {historyItem.value}º</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CodingIntervieewPage
