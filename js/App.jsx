import React, {useState} from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [rolls, setRolls] = useState(0)
    const [gamesPlayed, setGamesPlayed] = useState(1)
    const [time, setTime] = useState(0)
    const [intervalId, setIntervalId] = useState(0)
    const [tenzies, setTenzies] = useState(false)
    
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            clearInterval(intervalId)
        }
    }, [dice])

    React.useEffect(() => {

        setIntervalId(setInterval(() => {
            setTime(prevTime => prevTime + 1)
        }, 1000))

        return () => clearInterval(intervalId)

    },[gamesPlayed])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setGamesPlayed(prevState => prevState + 1)
            setTime(0)
        }
        setRolls(prevRolls => prevRolls + 1)
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <div className="game-info">
                <h2>Time {Math.floor(time / 60)}:{Math.floor(time % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h2>
                <h2>Rolls {rolls}</h2>
                <h2>Game number {gamesPlayed}</h2>
            </div>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}