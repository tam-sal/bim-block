import React from 'react'
import BlockCard from '../components/BlockCard/BlockCard';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import NavBar from '../components/NavBar/NavBar';

const Blocks = () => {

  const { blocks } = useContext(GlobalContext);

  return (
    <><NavBar />

      <div className="cards flex justify-center items-center h-[85vh] space-x-4">
        {blocks?.length > 0 ?
          <>
            <div className='text-center font-bold text-4xl'>My Blocks</div>
            {blocks.map((block) => {
              const { _id, description, startDate, endDate, progress } = block
              return (
                <div>
                  <BlockCard
                    key={_id}
                    description={description}
                    startDate={startDate}
                    endDate={endDate}
                    progress={progress}
                    id={_id}
                  />
                </div>
              )
            })}
          </> :
          <>
            <h1 key='12'>No Blocks Found</h1>
          </>}
      </div>
    </>
  )
}

export default Blocks