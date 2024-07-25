import React from 'react'
import NavBar from '../components/NavBar/NavBar';
import CreateBlock from './CreateBlock'
const Home = () => {
  return (
    <>
      <NavBar />
      <CreateBlock
        edit={false}

      />

    </>
  )
}

export default Home