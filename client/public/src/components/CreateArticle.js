import { useState, useEffect } from "react";

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

    function search(event) {
        event.preventDefault();
        (async () => {
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
        })();
    }

    function create(event) {
        event.preventDefault();
        (async () => {
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
                return (async () => {
                    setNoTopic({});
                    const response = await fetch(
                        `/api/create-topic/${urlify(
                            event.target.createTopic.value
                        )}`,
                        {
                            method: "POST",
                        }
                    );
                    const data = await response.json();
                    return setNewTopic([data]);
                })();
            }
        })();
    }

    return (
        <div className="create-article">
            <form onSubmit={search}>
                <p>
                    Search the database to see if there's a fact-check for the
                    topic you're interested in, or create a new one.
                </p>
                <label>SEARCH:</label>
                <input
                    type="text"
                    name="searchTopic"
                    placeholder="Enter topic..."
                    required
                />
                <button type="submit">SEARCH</button>
                {topicsArray &&
                    topicsArray.map(({ topic, id }) => (
                        <div key={id}>
                            <p>
                                <a href={`/${urlify(topic)}/edit`}>{topic}</a>
                            </p>
                        </div>
                    ))}
                {noResults && (
                    <div>
                        <p>{noResults.message}</p>
                    </div>
                )}
            </form>
            <form onSubmit={create}>
                <label>CREATE:</label>
                <input
                    type="text"
                    name="createTopic"
                    placeholder="Enter topic..."
                    required
                />
                <button type="submit">CREATE</button>
                {newTopic &&
                    newTopic.map(({ topic, id }) => (
                        <div key={id}>
                            <p>
                                <a href={`/${urlify(topic)}/edit`}>{topic}</a>
                            </p>
                        </div>
                    ))}
                {noTopic && (
                    <div>
                        <p>{noTopic.topic}</p>
                    </div>
                )}
            </form>
        </div>
    );
}