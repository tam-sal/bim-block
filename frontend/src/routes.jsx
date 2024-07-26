import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import Register from './pages/Register.jsx';
import Blocks from './pages/Blocks.jsx';
import BlockDetails from './pages/BlockDetails.jsx';
import CreateBlock from './pages/CreateBlock.jsx';


const routes = () => {
  return (

    <Router>

      <Routes>
        <Route strict path='/' element={<Home />} />
        <Route strict path='/signin' element={<SignIn />} />
        <Route strict path='/register' element={<Register />} />
        <Roue strict path='/create-blocl' element={<CreateBlock />} />
        <Route strict path='/blocks' element={<Blocks />} />
        <Route strict path='/details/:id' element={<BlockDetails />} />
      </Routes>

    </Router>
  )
}

export default routes