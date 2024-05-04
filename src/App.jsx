import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main_gemini from './components/Main_gemini/Main_gemini';
import ContextProvider from './context/context';




export const App = () => {
  return (
    <>
      <Sidebar/>
      <Main_gemini/>
    </>
  )
}
export default App;
