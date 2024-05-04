import React, { useContext, useEffect, useRef } from "react"; // Import React and necessary hooks
import "./Main_gemini.css"; // Import CSS file
import { assets } from "../../assets/assets"; // Import assets
import { Context } from "../../context/context"; // Import Context
// import Sidebar from "../Sidebar/Sidebar";

// Define the Main_gemini component
const Main_gemini = () => {
    // Destructure necessary values from the context
    const {
        onSent,
        recentPrompt,
        showResult,
        loding,
        resultData,
        setInput,
        input,
        setRecentprompt,
        darkMode,
        toggleDarkMode,
        isSmallScreen,
        setextended,
        extended
    } = useContext(Context);

    // Function to load prompt

    const lodePrompt = async (prompt) => {
        setRecentprompt(prompt);
        await onSent(prompt);
    };

    // Reference to the result element for scrolling
    const resultRef = useRef(null);

    // Effect hook to scroll to the bottom of the resultData when it changes
    useEffect(() => {
        // Scroll to the bottom of the resultData when it changes
        if (resultRef.current) {
            resultRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [resultData]);

    // Render the Main_gemini component
    return (
        <div className={`Main-gemini ${darkMode ? "Main-dark" : ""}`}>
        {isSmallScreen&&extended ? <><div>sidebar</div></>:null}
            <div className="nav">
                {isSmallScreen ? (
                    <img
                        onClick={() => setextended((extended) => !extended)}
                        className="menu"
                        draggable="false"
                        src={
                            !darkMode ? assets.menu_icon : assets.menu_icon_dark
                        }
                        alt="menu_icon"
                    />
                ) : (
                    <p>Gemini</p>
                )}

                <img
                    onClick={toggleDarkMode}
                    draggable="false"
                    src={darkMode ? assets.moon : assets.sun}
                    alt=""
                />
            </div>
            <div className="Main-container">
                {!showResult ? (
                    <>
                        <div className="Hello">
                            <p>
                                <span>Hello, Dev.</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div
                                //
                                onClick={() =>
                                    lodePrompt(
                                        "Suggest beautiful places to see on an upcoming road trip"
                                    )
                                }
                                className="card"
                            >
                                <p>
                                    Suggest beautiful places to see on an
                                    upcoming road trip
                                </p>
                                <img
                                    draggable="false"
                                    src={
                                        !darkMode
                                            ? assets.compass_icon
                                            : assets.compass_icon_dark
                                    }
                                    alt=""
                                />
                            </div>
                            <div
                                onClick={() =>
                                    lodePrompt(
                                        " Briefly summarize this concept: urban planning"
                                    )
                                }
                                className="card"
                            >
                                <p>
                                    Briefly summarize this concept: urban
                                    planning
                                </p>
                                <img
                                    draggable="false"
                                    src={
                                        !darkMode
                                            ? assets.bulb_icon
                                            : assets.bulb_icon_dark
                                    }
                                    alt=""
                                />
                            </div>
                            <div
                                onClick={() =>
                                    lodePrompt(
                                        " Brainstorm team bonding activities for our work retreat"
                                    )
                                }
                                className="card"
                            >
                                <p>
                                    Brainstorm team bonding activities for our
                                    work retreat
                                </p>
                                <img
                                    src={
                                        !darkMode
                                            ? assets.message_icon
                                            : assets.menu_icon_dark
                                    }
                                    draggable="false"
                                    alt=""
                                />
                            </div>
                            <div
                                onClick={() =>
                                    lodePrompt(
                                        "Tell me about React js and React native"
                                    )
                                }
                                className="card"
                            >
                                <p>Tell me about React js and React native</p>
                                <img
                                    draggable="false"
                                    src={
                                        !darkMode
                                            ? assets.code_icon
                                            : assets.code_icon_dark
                                    }
                                    alt=""
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={`result ${darkMode ? "result-dark" : ""}`}>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="user-icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="icon" />
                            {loding ? (
                                <div className="loder">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p
                                    //
                                    ref={resultRef}
                                    dangerouslySetInnerHTML={{
                                        __html: resultData,
                                    }}
                                ></p>
                            )}
                        </div>
                    </div>
                )}

                <div
                    className={`Main-bottom ${
                        (isSmallScreen && loding) || showResult ? "pp" : ""
                    }`}
                >
                    <div className="serch-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Message Gemini ..."
                        />
                        <div>
                            <img
                                src={
                                    !darkMode
                                        ? assets.gallery_icon
                                        : assets.gallery_icon_dark
                                }
                                draggable="false"
                                alt=""
                            />
                            <img
                                src={
                                    !darkMode
                                        ? assets.mic_icon
                                        : assets.mic_icon_dark
                                }
                                draggable="false"
                                alt=""
                            />
                            {input && (
                                <img
                                    onClick={() => onSent()}
                                    src={
                                        !darkMode
                                            ? assets.send_icon
                                            : assets.send_icon_dark
                                    }
                                    draggable="false"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about
                        people, so double-check its responses. Your privacy and
                        Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main_gemini;// Export the Main_gemini component
