import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Blocks from './pages/Blocks';
import BlockDetails from './pages/BlockDetails';
import CreateBlock from './pages/CreateBlock';
import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';

function App() {

  const { auth } = useContext(GlobalContext);
  const logged = auth?.authenticated;
  return (
    <>
      <Routes>
        <Route strict path='/' element={<Home />} />
        <Route strict path='/signin' element={!logged ? <SignIn /> : <Navigate to='/' />} />
        <Route strict path='/register' element={!logged ? <Register /> : <Navigate to='/' />} />
        <Route strict path='/create-block' element={logged ? <CreateBlock /> : <Navigate to='/signin' />} />
        <Route strict path='/blocks' element={logged ? <Blocks /> : <Navigate to='/signin' />} />
        <Route strict path='/details/:id' element={logged ? <BlockDetails /> : <Navigate to='/register' />} />
      </Routes>

    </>
  )
}

export default App
