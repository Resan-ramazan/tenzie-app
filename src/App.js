import './App.css';
import Die from './Die';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSame = dice.every(die => die.value === firstValue);
    if (allHeld && allSame) {
      setTenzies(true);
      alert('You won!');
    }

  }, [dice]);
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    console.log(newDice);
    return newDice;
  }


  const rollDice = () => {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else{
      setTenzies(false);
      setDice(allNewDice());
    }

  }

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElemets = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className='title'>Tenzies</h1>
      <p className='instruction'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElemets}
      </div>

      <button
        className='roll-dice'
        onClick={rollDice}
      >
        {tenzies ? "New Game":"Roll"}

      </button>
    </main>
  );
}

export default App;
