import { Route, Routes } from 'react-router-dom'
import { Home } from './home/home'
import './App.css'
import { About } from './home/about'
import { Login } from './accounts/login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/about' element={ <About /> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
      </Routes>
    </>
  )
}

export default App
