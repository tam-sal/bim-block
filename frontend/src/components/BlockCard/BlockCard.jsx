import { Link } from 'react-router-dom';
import { MdDeleteSweep } from "react-icons/md";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const BlockCard = ({ id, description, startDate, endDate, progress }) => {
  const baseURL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;
  const navigate = useNavigate();
  const deleteCard = async (id) => {
    try {
      const { data: deleted } = await axios.delete(`${baseURL}/blocks/${id}`, {
        withCredentials: true
      });
      console.log(deleted);
      if (deleted.success) {
        toast.success(deleted.success);
        navigate('/');
      };

    } catch (error) {
      toast.error(error.message || 'Error on Deletion');
      console.log(error.message)
    };

  }
  return (
    <>
      <div
        className="h-[16em] w-[18em] border-2 border-[rgba(214,196,237,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#7c2ee3] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
      >
        <div>
          <h1 className="text-[2em] font-medium">BLOCK</h1>
          <p className="text-[0.85em]">
            Description: {description}<br />
            Start: {startDate} <br />
            End: {endDate} <br />
            Progress: {progress}
          </p>
        </div>
        <div className='h-8 w-8 hover:cursor-pointer' onClick={() => deleteCard(id)}>
          <MdDeleteSweep />
        </div>

        <Link to={`/details/${id}`} >
          <button
            className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]"
          >
            <p>Edit</p>
            <svg
              className="w-6 h-6 group-hover:translate-x-[10%] duration-300"
              stroke="currentColor"
              stroke-width="1"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </button>
        </Link>

      </div>

    </>
  )
}

export default BlockCard