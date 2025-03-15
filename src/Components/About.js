import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/Notes/NoteContext";

const About = () => {
    const a = useContext(NoteContext)
    useEffect(()=>{
        a.update();
    }, [])
    return <div>This is About {a.state.name} who lives in {a.state.location}</div>;
};

export default About;
