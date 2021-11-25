import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ArticleView() {
    const [text, setText] = useState("");
    const [headline, setHeadline] = useState("");
    const { article } = useParams();

    function editButton(event) {
        event.preventDefault();
        location.replace(`/${article}/edit`);
    }

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
    return (
        <div className="output">
            <div className="space-between">
                <h1>{headline}</h1>
                <button className="edit-button" onClick={editButton}>
                    EDIT
                </button>
            </div>
            <div className="output">{text}</div>
        </div>
    );
}
