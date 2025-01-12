import { Route, Routes } from 'react-router-dom'
import { Home } from './home/home'
import './App.css'
import { About } from './home/about'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/about' element={ <About /> }></Route>
      </Routes>
    </>
  )
}

export default App
