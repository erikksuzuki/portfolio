'use client'

import { useState } from 'react'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function replaceRepeatedLetters(inputString: string) {
  let outputString = inputString
  const alphabetRepeated = alphabet.map((letter) => {
    return letter.repeat(3)
  })
  alphabetRepeated.forEach((letterGroup) => {
    if (outputString.includes(letterGroup)) {
      outputString = outputString.replaceAll(letterGroup, '_')
    }
  })
  return outputString
}

const LetterButton = ({
  letter,
  handleLetterClick,
}: {
  letter: string
  handleLetterClick: (letter: string) => void
}) => {
  return (
    <button
      className="w-10 h-10 bg-black rounded-sm text-white"
      onClick={() => {
        handleLetterClick(letter)
      }}
    >
      {letter}
    </button>
  )
}

const CodingAssessment = () => {
  const [outputString, setOutputString] = useState('')

  const handleLetterClick = (letter: string) => {
    setOutputString(outputString + letter)
  }
  return (
    <div className="max-w-screen-md mx-auto">
      {alphabet.map((letter) => (
        <LetterButton
          key={letter}
          letter={letter}
          handleLetterClick={handleLetterClick}
        />
      ))}
      <div className="my-4 min-h-20">
        {replaceRepeatedLetters(outputString)}
      </div>
      <button
        onClick={() => setOutputString('')}
        className="py-2 px-3 bg-black"
      >
        Reset String
      </button>
      <div className="py-10">Fin.</div>
    </div>
  )
}

export default CodingAssessment
