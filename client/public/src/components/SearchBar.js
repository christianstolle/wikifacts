import { Link } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
    const [resultsArray, setResultsArray] = useState([]);

    function urlify(string) {
        return string.toLowerCase().replace(" ", "-");
    }

    function onClickLink() {
        const input = document.getElementById("search");
        setResultsArray([]);
        return (input.value = "");
    }
    async function searchTopics() {
        const input = document.getElementById("search");

        if (input.value.length <= 1) {
            return setResultsArray([]);
        }

        const response = await fetch(`/api/search-topic/${input.value}`);
        const data = await response.json();
        if (response.status >= 500) {
            throw data;
        } else if (data.message == "No such topics in the database") {
            return setResultsArray([]);
        } else {
            return setResultsArray(data);
        }
    }
    return (
        <div className="header-wrapper">
            <div className="header-bar">
                <span>LOGIN PLACEHOLDER</span>
                <Link to="/">WIKIFACTS</Link>
                <input
                    onKeyUp={searchTopics}
                    type="text"
                    id="search"
                    name="search"
                    placeholder="SEARCH"
                />
            </div>
            <ul>
                {resultsArray &&
                    resultsArray.map(({ topic, id }) => (
                        <li key={id}>
                            <Link
                                onClick={onClickLink}
                                to={`/${urlify(topic)}`}
                            >
                                {topic}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
