import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./SearchBox.css";

export const SearchBox = () => {
    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');

    const searchTopic = async (event) => {
        event.preventDefault();
        console.log('button clicked');
        try {
          const res = await axios.post('http://localhost:5000/search', { query });
          setResult(res.data.data);
        } catch (error) {
          console.error('Error:', error);
        }
    }

    const inputChange = (event) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <div>
            <input
                type="text"
                value={query}
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
