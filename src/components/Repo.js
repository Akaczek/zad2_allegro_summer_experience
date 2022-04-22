import React, { useState } from "react";

export default function Repo(props){

    const [isClicked, changeClick] = useState(false)

    const languages = []
    Object.keys(props.languages).forEach(function(key){
        languages.push(
            <p>{key}: {props.languages[key]} B</p>
        )
    })

    function handleClick(){
        if(isClicked === false){
            changeClick(true)
        }
        else{
            changeClick(false)
        }
    }

    return(
        <div className="repoItem">
            <div className="itemHeader" onClick={handleClick}>
                <h3>{props.name}</h3>
                {isClicked ? 
                <img src="./downarrow.png" alt="strzalka"/>
                : <img src="./rightarrow.png" alt="strzalka"/>}
                
            </div>
            {isClicked && <hr/>}
            {isClicked && languages}
            {isClicked && languages.length === 0 && 
            <p>
                To repozytorium nie ma żadnych języków    
            </p>}
        </div>
    )
}