import { createContext, useEffect, useState } from "react"; // Import necessary dependencies from React
import runChat from "../config/gemini"; // Import the function responsible for running the chat
// Create a new context
export const Context = createContext();

// Define the ContextProvider component
const ContextProvider = (props) => {
    // State variables for managing input, prompts, results, and loading state
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentprompt] = useState("");
    const [previosPrompt, setProviosPromot] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loding, setLoding] = useState(false);
    const [resultData, setResultData] = useState("");
    const [darkMode, setDarkMode] = useState(false); // New state variable for dark mode
    const [isSmallScreen, setIsSmallScreen] = useState(false); // smaell screan responsive

    //smaell screan responsive

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 600px)");
        const handleMediaQueryChange = (e) => setIsSmallScreen(e.matches);

        handleMediaQueryChange(mediaQuery); // Check initially
        mediaQuery.addListener(handleMediaQueryChange); // Listen to changes

        // Clean up listener
        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    // Function to add delay between displaying words
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    // Function to reset state for a new chat session
    const newChat = () => {
        setLoding(false);
        setShowResult(false);
    };

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    // Effect hook to handle key presses
    useEffect(() => {
        function handleKeyPress(event) {
            // Check if the pressed key is Enter
            if (event.key === "Enter") {
                // Prevent the default action of submitting a form
                event.preventDefault();
                if (input.trim() !== "") {
                    // If input is not empty, call the debounced onSent function
                    debouncedOnSent();
                }
            }
        }

        // Attach the keypress event listener when the component mounts
        document.addEventListener("keypress", handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [input]); // Include input in the dependency array to update the effect when input changeszz

    // Function to handle sending user input to the chat function
    const onSent = async (prompt) => {
        setResultData("");
        setLoding(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentprompt(prompt);
        } else {
            setProviosPromot((prev) => [...prev, input]);
            setRecentprompt(input);
            response = await runChat(input);
        }

        // Formatting the response
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoding(false);
        setInput("");
    };

    // Applying debounce to the onSent function
    const debouncedOnSent = debounce(onSent, 500);

    // Value object for the context provider
    const contextValue = {
        previosPrompt,
        setProviosPromot,
        onSent,
        setRecentprompt,
        recentPrompt,
        showResult,
        loding,
        resultData,
        input,
        setInput,
        newChat,
        darkMode,
        toggleDarkMode,
        isSmallScreen,
    };

    // Render the context provider with its children
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
export default ContextProvider;
