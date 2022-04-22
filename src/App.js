import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import Repo from "./components/Repo";
import fetch from "node-fetch"

export default function App(){

    const [user, setUser] = useState('');
    const [userRepos, setUserRepos] = useState([]);
    const [responseCode, setResponseCode] = useState(0);

    async function search(e, output){
        e.preventDefault()
        const response = await fetch('https://api.github.com/users/' + output + '/repos');
        if(response.status === 200){
            setResponseCode(200)
            setUserRepos([])
            let tempRepos = []
            const repos = await response.json();
            setUser(output);
            for(const idx in repos){
                const langResponse = await fetch(repos[idx].languages_url)
                const languages = await langResponse.json()
                tempRepos.push(
                    {
                        "name" :repos[idx].name,
                        "languages": languages
                    }
                )
            }
            setUserRepos(tempRepos)
        }else if (response.status === 403){
            setResponseCode(403)
        }else{
            setResponseCode(404)
        }
    }

    return(
        <div className="main">
            <div className="sideBar">
                <SearchBox 
                    search = {search}
                />
                {responseCode === 404 && <p className="responseCode">Nie ma takiego użytkownika</p>}
                {responseCode === 403 && <p className="responseCode">Serwer odmawia dostępu</p>}
            </div>
            {user !== '' &&
                <div className="content">
                    <h1>{user} - lista repozytoriów</h1>
                    {userRepos.map(repo => (
                        <Repo 
                        name={repo.name}
                        languages={repo.languages}
                        />
                    ))}
                </div>
            }
        </div>
    )
}