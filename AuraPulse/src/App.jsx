import { useState } from 'react'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import './App.css'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
