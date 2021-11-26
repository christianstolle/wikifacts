import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RandomArticles() {
    const [randomArray, setRandomArray] = useState([]);

    function urlify(string) {
        return string.toLowerCase().replace(" ", "-");
    }

    async function getRandom() {
        const response = await fetch("/api/all-topics");
        const data = await response.json();
        if (response.status >= 500) {
            throw data;
        } else {
            return setRandomArray(data);
        }
    }

    useEffect(() => {
        getRandom();
    }, []);
    return (
        <div>
            <button onClick={getRandom} className="more-facts-button">
                GET MORE FACTS
            </button>
            <ul>
                {randomArray &&
                    randomArray.map(({ topic, id }) => (
                        <li key={id}>
                            <p>
                                <Link to={`/${urlify(topic)}`}>{topic}</Link>
                            </p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
