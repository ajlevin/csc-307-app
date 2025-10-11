// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        var removedID = characters[index]._id;
        const updated = characters.filter((character, i) => {
            return i !== index;
        });

        setCharacters(updated);
        deleteUser(removedID);
    }

    function updateList(person) {
        setCharacters([...characters, person]);
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    function deleteUser(id) {
        const promise = fetch("Http://localhost:8000/users/" + id, {
            method: "DELETE",
        });

        return promise;
    }

    function updateList(person) { 
        postUser(person)
        .then((res) => res.json())
        .then((postedUser) => setCharacters([...characters, postedUser]))
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;
