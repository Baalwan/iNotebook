import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            _id: "67d51d3325ccj033344c6ca9c",
            user: "67d4f992b9fk61a4ddc821b27",
            title: "Learn React",
            description: "Do projects and watch youtube tutorials",
            tag: "personal",
            date: "2025-03-15T06:24:51.444Z",
            __v: 0,
        },
        {
            _id: "67d54610g0e0fa40fb496e4e2",
            user: "67d4f992bl9f61a4ddc821b27",
            title: "Do laundry",
            description: "Get dirty clothes washed and ironed from the laundry",
            tag: "personal",
            date: "2025-03-15T09:19:13.010Z",
            __v: 0,
        },
        {
            _id: "67d54e6100e0fa40fb496e4e2",
            user: "67d4f9y92b9f61a4kddc821b27",
            title: "Visit Market",
            description: "Buy fruits, veges and dairy for the coming week",
            tag: "personal",
            date: "2025-03-15T09:19:13.010Z",
            __v: 0,
        },
        {
            _id: "67d546100e0fak4l0fb496e4e2",
            user: "67d4f992b9hf61a4ddc821b27",
            title: "Visit dentist",
            description: "get the periodical oral checkup done from the dentist",
            tag: "personal",
            date: "2025-03-15T09:19:13.010Z",
            __v: 0,
        },
        {
            _id: "67d546j100e0fga40fb496e4e2",
            user: "67d4f99l2b9f61a4ddc821b27",
            title: "Test Task",
            description: "lorem30",
            tag: "personal",
            date: "2025-03-15T09:19:13.010Z",
            __v: 0,
        }
    ];

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;