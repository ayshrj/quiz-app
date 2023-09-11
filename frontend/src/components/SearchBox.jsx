import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./SearchBox.css";
import Loader from "./Loader";
import { Quiz } from "./Quiz";

export const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const searchTopic = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/search', { query });
            setResult(res.data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        searchTopic();
    }

    const inputChange = (event) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                >
                    Search
                </button>
            </form>
            {isLoading ? (
                <Loader />
            ) : (
                result && <Quiz result={result} />
            )}
        </div>
    );
};

export default SearchBox;
