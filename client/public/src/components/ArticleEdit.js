import { Slate, Editable, withReact } from "slate-react";
import React, { useMemo, useState } from "react";
import { createEditor } from "slate";

export default function ArticleEdit() {
    const editor = useMemo(() => withReact(createEditor()), []);

    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "A line of text in a paragraph." }],
        },
    ]);

    const onClick = (event) => {
        // Implement custom event logic...
        // When no value is returned, Slate will execute its own event handler when
        // neither isDefaultPrevented nor isPropagationStopped was set on the event
    };

    const onDrop = (event) => {
        // Implement custom event logic...

        // No matter the state of the event, treat it as being handled by returning
        // true here, Slate will skip its own event handler
        return true;
    };

    const onDragStart = (event) => {
        // Implement custom event logic...

        // No matter the status of the event, treat event as *not* being handled by
        // returning false, Slate will execute its own event handler afterward
        return false;
    };

    return (
        <div>
            <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => setValue(newValue)}
            >
                <Editable />
            </Slate>
        </div>
    );
}
