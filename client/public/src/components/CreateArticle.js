import { useState, useEffect } from "react";

export default function CreateArticle() {
    document.title = "Participate";

    const [topicsArray, setTopicsArray] = useState([]);
    const [noResults, setNoResults] = useState({});
    useEffect(() => {}, [topicsArray, noResults]);

    function urlify(string) {
        return string.toLowerCase().replace(" ", "-");
    }

    function search(event) {
        event.preventDefault();
        (async () => {
            const response = await fetch(
                `/api/search-topic/${event.target.input.value}`
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

    return (
        <div>
            <form onSubmit={search}>
                <p>
                    Search the database to see if there's a fact-check for the
                    topic you're interested in.
                </p>
                <p>
                    <br />
                </p>
                <label>SEARCH:</label>
                <input
                    type="text"
                    name="input"
                    placeholder="Enter topic..."
                    required
                />
                <button type="submit">SEARCH</button>
                <p>
                    <br />
                </p>
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
        </div>
    );
}
