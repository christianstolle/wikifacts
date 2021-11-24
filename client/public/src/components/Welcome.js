/* eslint-disable indent */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const markdownText = `
# This is a document

You can use **bold**, _italic_, [links](http://example.com)

- this
- is
- a
- list

Images are nice!

![A picture](https://source.unsplash.com/random)`;

function getText() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(markdownText), 500);
    });
}

export default function Welcome() {
    const [text, setText] = useState("");

    useEffect(() => {
        getText().then(setText);
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
                <ReactMarkdown>{text}</ReactMarkdown>
            </section>
        </div>
    );
}
