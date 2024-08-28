import React from "react"
import Dot from "./Dot"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    const dotElements = [];
    for(let i = 0; i < props.value; i++) {
        dotElements.push(<Dot />)
    }
    
    return (
        <div 
            className="die-face fifth-dot" 
            style={styles}
            onClick={props.holdDice}
        >
            {dotElements}
        </div>
    )
}