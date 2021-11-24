/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";

export default function Welcome() {
    const [text, setText] = useState("");
    const [headline, setHeadline] = useState("");
    const { article } = useParams();

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
    }, []);

    function onInput(event) {
        setText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        console.log("Ready to save text", text);
    }

    return (
        <div className="article-edit">
            <form onSubmit={onSubmit}>
                <textarea
                    onInput={onInput}
                    value={text}
                    onKeyUp={(newValue) => {
                        console.log(newValue.target.lastChild);
                    }}
                />
            </form>
            <section className="output">
                <h1>{headline}</h1>
                <ReactMarkdown>{text}</ReactMarkdown>
            </section>
        </div>
    );
}
