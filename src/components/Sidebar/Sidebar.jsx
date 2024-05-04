import React, { useContext, useState } from "react";
import "./Sidebar.css";// Import CSS file
import { assets } from "../../assets/assets";// Import assets
import { Context } from "../../context/context";// Import Context

// Define the Sidebar component
const Sidebar = () => {

    // Destructure necessary values from the context
    const {
        onSent,
        previosPrompt,
        setRecentprompt,
        newChat,
        darkMode,
        extended,
        setextended,
    } = useContext(Context);

    // Function to load prompt
    const lodePrompt = async (prompt) => {
        setRecentprompt(prompt);
        await onSent(prompt);
    };

    // Render the Sidebar component
    return (
        <div className={`Sidebar ${darkMode ? "sidebar-dark" : ""}`}>
            <div className="top">
                <img
                    onClick={() => setextended((extended) => !extended)}
                    className="menu"
                    draggable="false"
                    src={!darkMode ? assets.menu_icon : assets.menu_icon_dark}
                    alt="menu_icon"
                />
                <div onClick={() => newChat()} className="new-caht">
                    <img
                        src={assets.plus_icon }
                        draggable="false"
                        alt="plus_icon"
                    />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {previosPrompt.map((item, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        lodePrompt(item);
                                    }}
                                    className="recent-entry"
                                >
                                    <img
                                        src={
                                            !darkMode
                                                ? assets.message_icon
                                                : assets.message_icon_dark
                                        }
                                        draggable="false"
                                        alt="message_icon"
                                    />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img
                        src={
                            !darkMode
                                ? assets.question_icon
                                : assets.bulb_icon_dark
                        }
                        draggable="false"
                        alt="question_icon"
                    />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img
                        src={
                            !darkMode
                                ? assets.history_icon
                                : assets.history_icon_dark
                        }
                        draggable="false"
                        alt="question_icon"
                    />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img
                        src={
                            !darkMode
                                ? assets.setting_icon
                                : assets.setting_icon_dark
                        }
                        draggable="false"
                        alt="question_icon"
                    />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
