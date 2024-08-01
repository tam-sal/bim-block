import React, { useState, useEffect } from 'react'
import BlockCard from '../components/BlockCard/BlockCard';
import NavBar from '../components/NavBar/NavBar';
import axios from 'axios';

const Blocks = () => {

  const [blocks, setBlocks] = useState([]);
  const baseURL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;


  useEffect(() => {
    const source = axios.CancelToken.source();
    const getBlocks = async () => {
      const { data } = await axios.get(`${baseURL}/blocks`, {
        withCredentials: true
      });
      if (data?.blocks) {
        setBlocks(data.blocks);
      };
    };

    getBlocks();

    return () => {
      source.cancel('Request BLOCKS canceled on unmount');
      setBlocks([]);
    }
  }, []);


  return (
    <><NavBar />
      <div className='text-center font-bold text-4xl mt-10'>My Blocks</div>
      <div className="cards flex justify-center items-center h-[65vh] space-x-6 gap-4 flex-wrap flex-grow-2">
        {blocks?.length > 0 ?
          <>

            {blocks.map((block) => {
              const { _id, description, startDate, endDate, progress } = block
              return (
                <div key={_id}>
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