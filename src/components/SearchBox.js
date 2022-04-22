import React, { useState } from "react";

export default function SearchBox(props){
    const [thisValue, setValue] = useState('');

    function handleChange(e){
        setValue(e.target.value);
    }

    return(
        <div className="searchBox">
            <h2>Znajdź użytkownika GitHuba</h2>
            <form onSubmit={(e) => {
                props.search(e, thisValue)
            }}>
                <input type="text" value={thisValue} onChange={handleChange}/>
                <button type="submit">Szukaj</button>
            </form>
        </div>
    )
}