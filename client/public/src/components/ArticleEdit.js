/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";

export default function Welcome() {
    const [text, setText] = useState("");
    const [saved, setSaved] = useState({ text: "" });
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
        setSaved({ text: "" });
        setText(event.target.value);
    }

    function linkButton(event) {
        event.preventDefault();
        location.replace(`/${article}`);
    }

    function onSubmit(event) {
        event.preventDefault();
        (async () => {
            await fetch(`/api/${article}/edit`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    text: text,
                }),
            });
            setSaved({ text: "SUCCESSFULLY SAVED!" });
        })();
        console.log("Ready to save text", text);
    }

    return (
        <div className="article-edit">
            <form>
                <textarea onInput={onInput} value={text} />
                <div>
                    <button onClick={onSubmit}>SAVE</button>
                    <button onClick={linkButton}>VIEW</button>
                </div>
                {saved && <p>{saved.text}</p>}
            </form>
            <section className="output">
                <h1>{headline}</h1>
                <ReactMarkdown>{text}</ReactMarkdown>
            </section>
        </div>
    );
}
