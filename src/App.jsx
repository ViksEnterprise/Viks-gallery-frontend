import { Route, Routes } from 'react-router-dom'
import { Home } from './home/home'
import './App.css'
import { About } from './home/about'
import { Login } from './accounts/login'
import { SignUp } from './accounts/register'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/about' element={ <About /> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/signUp' element={ <SignUp /> }></Route>
      </Routes>
    </>
  )
}

export default App
