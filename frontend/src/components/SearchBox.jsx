import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./SearchBox.css";
import { Quiz } from "./Quiz";

export const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null); // Use null to represent no data
    const [isLoading, setIsLoading] = useState(false);

    const searchTopic = async (event) => {
        event.preventDefault();
        console.log('button clicked');
        setIsLoading(true); // Set loading state to true while fetching data
        try {
            const res = await axios.post('http://localhost:5000/search', { query });
            setResult(res.data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false); // Set loading state back to false after data fetch
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
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                result && <Quiz result={result} />
            )}
        </div>
    );
};

export default SearchBox;
