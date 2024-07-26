import React from 'react'
import CreateBlock from './CreateBlock';
import axios from 'axios';
import toast from 'react-hot-toast';
const BlockDetails = () => {
  const baseURL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;
  const { id } = useParams();
  const getBlock = async () => {
    try {
      const block = await axios.put(`${baseURL}/blocks/${id}`)
      if (block.success) {
        toast.success(block.success);
      } else {
        toast.error(error.message)
      };
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <CreateBlock edit={true} conSumbit={getBlock} />
    </>
  )
}

export default BlockDetails