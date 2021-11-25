/* eslint-disable indent */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const markdownText = `# Headline

Use this page as a sandbox to try out the editor.

You can use **bold**, _italic_, and [links](http://example.com)

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
    document.title = "Sandbox";

    const [text, setText] = useState("");

    useEffect(() => {
        getText().then(setText);
    }, []);

    function onInput(event) {
        setText(event.target.value);
    }

    return (
        <div className="article-edit">
            <form>
                <textarea onInput={onInput} value={text} />
            </form>
            <section className="output">
                <ReactMarkdown>{text}</ReactMarkdown>
            </section>
        </div>
    );
}
