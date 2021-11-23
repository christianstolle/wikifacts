/* eslint-disable indent */
import { Slate, Editable, withReact, useSlate } from "slate-react";
import React, { useMemo, useState, useCallback } from "react";
import { createEditor } from "slate";

export default function Welcome() {
    const editor = useMemo(() => withReact(createEditor()), []);

    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "Click here and type..." }],
        },
    ]);

    return (
        <div>
            <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    console.log(
                        newValue.map((paragraph) => paragraph.children[0].text)
                    );
                }}
            >
                <Editable />
            </Slate>
        </div>
    );
}
