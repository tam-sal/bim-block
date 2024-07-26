import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Blocks from './pages/Blocks';
import BlockDetails from './pages/BlockDetails';
import CreateBlock from './pages/CreateBlock';

function App() {


  return (
    <>


      <Routes>
        <Route strict path='/' element={<Home />} />
        <Route strict path='/signin' element={<SignIn />} />
        <Route strict path='/register' element={<Register />} />
        <Route strict path='/create-block' element={<CreateBlock />} />
        <Route strict path='/blocks' element={<Blocks edit={false} />} />
        <Route strict path='/details/:id' element={<BlockDetails />} />
      </Routes>


    </>
  )
}

export default App
