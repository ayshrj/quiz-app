import React, { useState } from "react";
import "./SearchBox.css";

export const SearchBox = () => {
    const [notes, setNotes] = useState([]);

    const [newNote, setNewNote] = useState('');

    const searchTopic = (event) => {
        event.preventDefault();
        console.log('button clicked', event.target);
    }

    const inputChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    }

    return (
        <div>
            <input
                type="text"
                value={newNote}
                onChange={inputChange}
                className="search-input"
                placeholder="Search Topic"
            />
            <button
                type="submit"
                className="search-button"
                onClick={searchTopic}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBox;
