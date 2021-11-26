import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export default function ArticleView() {
    const [text, setText] = useState("");
    const [headline, setHeadline] = useState("");
    const { article } = useParams();

    document.title = `${headline} | WIKIFACTS`;

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/${article}`);

            const data = await response.json();
            if (response.status >= 500) {
                throw data;
            } else {
                setText(data.content);
                setHeadline(data.topic);
                return;
            }
        })();
    }, [article]);
    return (
        <div className="output">
            <div className="space-between">
                <h1>{headline}</h1>
                <Link to={`/${article}/edit`}>
                    <button type="button">EDIT</button>
                </Link>
            </div>
            <div className="output">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    );
}
