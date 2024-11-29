import { Route, Routes } from 'react-router-dom'
import { Home } from './home/home'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
      </Routes>
    </>
  )
}

export default App
