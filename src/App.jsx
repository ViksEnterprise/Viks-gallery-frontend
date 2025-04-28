import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import './App.css'
import { About } from './pages/About'
import { Login } from './accounts/login'
import { SignUp } from './accounts/register'
import { ForgotAccountDetails } from './accounts/forget'
import { Gallery } from './pages/Gallery'
import { Error404 } from './views/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/about' element={ <About /> }></Route>
        <Route path='/art-gallery' element={ <Gallery /> }></Route>
        <Route path='/*' element={ <Error404 /> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/signUp' element={ <SignUp /> }></Route>
        <Route path='/reset-pass' element={ <ForgotAccountDetails /> }></Route>
      </Routes>
    </>
  )
}

export default App
