import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Blocks from './pages/Blocks';
import BlockDetails from './pages/BlockDetails';

function App() {


  return (
    <>

      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route strict path='/' element={<Home />} />
          <Route strict path='/signin' element={<SignIn />} />
          <Route strict path='/register' element={<Register />} />
          <Route strict path='/blocks' element={<Blocks />} />
          <Route strict path='/details/:id' element={<BlockDetails />} />
        </Routes>
      </div>

    </>
  )
}

export default App
