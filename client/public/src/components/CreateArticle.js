import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CreateArticle() {
    document.title = "Participate";

    const [topicsArray, setTopicsArray] = useState([]);
    const [noResults, setNoResults] = useState({});
    const [noTopic, setNoTopic] = useState({});
    const [newTopic, setNewTopic] = useState([]);

    useEffect(() => {}, [topicsArray, noResults, newTopic]);

    function urlify(string) {
        return string.toLowerCase().replace(" ", "-");
    }

    async function search(event) {
        event.preventDefault();
        const response = await fetch(
            `/api/search-topic/${event.target.searchTopic.value}`
        );
        const data = await response.json();
        if (response.status >= 500) {
            throw data;
        } else if (data.message == "No such topics in the database") {
            setTopicsArray([]);
            return setNoResults(data);
        } else {
            setNoResults({});
            return setTopicsArray(data);
        }
    }

    async function create(event) {
        event.preventDefault();
        const response = await fetch(
            `/api/search-topic/${event.target.createTopic.value}`
        );
        const data = await response.json();
        if (response.status >= 500) {
            throw data;
        } else if (data.length >= 1) {
            setNewTopic([]);
            return setNoTopic({
                topic: `"${event.target.createTopic.value}" is already in the database! Search above to edit the existing article.`,
            });
        } else if (data.message == "No such topics in the database") {
            setNoTopic({});
            const response = await fetch(
                `/api/create-topic/${urlify(event.target.createTopic.value)}`,
                {
                    method: "POST",
                }
            );
            const data = await response.json();
            return setNewTopic([data]);
        }
    }

    return (
        <div className="create-article">
            <p>
                Search the database to see if there's a fact-check for the topic
                you're interested in, or create a new one.
            </p>
            <form onSubmit={search}>
                <label>SEARCH:</label>
                <input
                    type="text"
                    name="searchTopic"
                    placeholder="Enter topic..."
                    required
                />
                <button type="submit">SEARCH</button>
            </form>
            {topicsArray &&
                topicsArray.map(({ topic, id }) => (
                    <div key={id}>
                        <p>
                            <Link to={`/${urlify(topic)}/edit`}>{topic}</Link>
                        </p>
                    </div>
                ))}
            {noResults && (
                <div>
                    <p>{noResults.message}</p>
                </div>
            )}
            <form onSubmit={create}>
                <label>CREATE:</label>
                <input
                    type="text"
                    name="createTopic"
                    placeholder="Enter topic..."
                    required
                />
                <button type="submit">CREATE</button>
            </form>
            {newTopic &&
                newTopic.map(({ topic, id }) => (
                    <div key={id}>
                        <Link to={`/${urlify(topic)}/edit`}>{topic}</Link>
                    </div>
                ))}
            {noTopic && (
                <div>
                    <p>{noTopic.topic}</p>
                </div>
            )}
        </div>
    );
}
