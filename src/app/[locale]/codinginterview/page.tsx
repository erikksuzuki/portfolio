'use client'

import { getTemperatureFromSmile } from '@/app/authService'
import { useState } from 'react'
import ChemicalMolecules from '@/assets/coding-interview/reaction.png'
import Image from 'next/image'
import clsx from 'clsx'

export interface HistoryObject {
  input: string | null
  value: number
}

const CodingIntervieewPage = () => {
  const [inputValue, setInputValue] = useState<string>(
    'CN(C)c1cccc([N+](=O)[O-])c1C#N.CO.Cl.[Fe]>>CN(C)c1cccc(N)c1C#N'
  )
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
      <h1 className="text-center text-theme-heading-sm mb-10">
        Chemical Reaction Temperature Calculator
      </h1>
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <form action={handleSubmit} className="flex flex-col gap-x-4 mb-8">
            <label className="text-theme-sm mb-1">
              Input reaction in SMILES format
            </label>
            <div className="flex flex-row gap-2">
              <input
                className="text-black px-2 py-1 rounded-sm border border-[rgba(255,255,255,0.4)]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 px-2 py-1 rounded-sm bg-[rgba(0,0,255,0.4)] border border-[rgba(255,255,255,0.4)]"
              >
                Calculate
              </button>
            </div>
          </form>
          <figure className="px-3 pt-16 pb-6 border border-white rounded-xl">
            <Image
              alt="Chemical Reaction"
              src={ChemicalMolecules.src}
              width={363}
              height={137}
              className="w-full"
            />
            <h4 className="mt-4 text-theme-xs text-center">{inputValue}</h4>
          </figure>
        </div>
        <div>
          <div className="text-center py-6 text-theme-heading-md">{`${resultValue}º`}</div>
          <div>
            {valueHistory.map((historyItem: HistoryObject, index: number) => {
              const lastItem = index === valueHistory.length - 1
              return (
                <div
                  className={clsx(
                    'flex flex-row justify-between gap-x-[100px] items-center py-4 px-2 border-white',
                    { 'border-b': !lastItem }
                  )}
                  key={index}
                >
                  <div className="text-theme-xs">{historyItem.input}</div>
                  <div>{historyItem.value}º</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CodingIntervieewPage
