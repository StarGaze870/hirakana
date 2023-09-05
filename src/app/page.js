'use client'

import { useEffect, useState } from 'react'
import { Hiragana } from './texts/Hiragana'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Katakana } from './texts/Katakana'

const KanaArray = Hiragana.concat(Katakana);

export default function Home() {

  const [tracker, setTracker] = useState(new Set());
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateUniqueCharacter();
  }, [])

  function generateCharacter() {
    return Math.floor(Math.random() * KanaArray.length);
  }

  function generateUniqueCharacter() {
    let randomCharacterNum;

    do {
      randomCharacterNum = generateCharacter();      
    } while (tracker.has(randomCharacterNum));

    setSelectedCharacter(randomCharacterNum);
    setTracker(prev => prev.add(randomCharacterNum));
  }

  // ------------------------- HANDLE FUNCTIONS --------------------------------------------------  

  const handleInputChange = (e) => {
    
    if (tracker.size == KanaArray.length) {
      return
    }    
    const value = e.target.value;

    if (value && value.toLowerCase() === KanaArray[selectedCharacter][1].toLowerCase()) {
      generateUniqueCharacter();
      setInputValue('')
      setIsCorrect(true);
      return;
    }
    setInputValue(value);
    setIsCorrect(false);
  }

  return (

    <div className='vh-100 vw-100'>
      <div className='d-flex flex-row h-100'>
        <div className='col-4 flex-fill d-flex ps-5 pt-5'>
          <h1>
            {tracker.size} / {KanaArray.length}
          </h1>
        </div>
        <div className='col-4 flex-fill d-flex flex-column justify-content-center align-items-center'>
          <span className='fw-bold text-center' style={{ fontSize: '15em' }}>
            {selectedCharacter != null ? KanaArray[selectedCharacter][0] : '. . .'}
          </span>
          <input
            className='p-3 text-center my-5 w-75'
            style={{ fontSize: '2em' }}
            onChange={handleInputChange}
            value={inputValue}            
          >

          </input>
        </div>
        <div className='col-4 flex-fill justify-content-center d-flex align-items-center'>

          {
            isCorrect
            ? <h1 className='text-center text-success' style={{ fontSize: '5em' }}>CORRECT</h1>
            : <h1 className='text-center text-danger' style={{ fontSize: '5em' }}>WRONG</h1>
          }          
        </div>
      </div>
    </div>
  )
}
