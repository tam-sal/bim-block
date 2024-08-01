import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loader/Loading';
import { useState } from 'react';

import NavBar from '../components/NavBar/NavBar'


const BlockDetails = () => {
  const baseURL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;
  const { id } = useParams();
  const navigate = useNavigate();

  let initial = { 'progress': '', 'startDate': '', 'endDate': '' };
  let initialErr = { 'progress': '', 'startDate': '', 'endDate': '', isValid: false };

  const [form, setForm] = useState(initial);
  const [err, setErr] = useState(initialErr);
  const [loading, setLoading] = useState(false);

  const validateDates = (form) => {
    const [start, end] = [new Date(form.startDate), new Date(form.endDate)];
    if (!form.startDate) {
      setErr({ ...err, startDate: 'Start date is required', isValid: false });
      return;
    }
    if (!form.endDate) {
      setErr({ ...err, endDate: 'End date is required', isValid: false });
      return;
    }
    if (isNaN(start.getTime())) {
      setErr({ ...err, startDate: 'Invalid start date', isValid: false });
      return;
    }
    if (isNaN(end.getTime())) {
      setErr({ ...err, endDate: 'Invalid end date', isValid: false });
      return;
    }
    if (start >= end) {
      setErr({ ...err, startDate: 'Start date must be earlier than end date', isValid: false });
      return;
    }
    setErr({ ...err, startDate: '', endDate: '', isValid: true });
  };

  const validateProgress = (form) => {
    const progress = +form.progress;

    if ((!form.progress) || form.progress === null || form.progress === '') setErr({ ...err, progress: 'Progress is required', isValid: false });

    if (isNaN(progress)) setErr({ ...err, progress: 'Progress must be a number', isValid: false });

    if (progress < 0 || progress > 100) setErr({ ...err, progress: 'Progress must be a number between 0 and 100', isValid: false });

    if (progress >= 0 && progress <= 100) setErr({ ...err, progress: '', isValid: true });
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    name === 'startDate' && validateDates({
      ...form,
      [name]: value
    });
    name === 'endDate' && validateDates({
      ...form,
      [name]: value
    });
    name === 'progress' && validateProgress({
      ...form,
      [name]: value
    });
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data: block } = await axios.put(`${baseURL}/blocks/${id}`, form, {
        withCredentials: true
      })
      if (block.success) {
        toast.success(block.success);
        navigate('/blocks');
      };
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      }
      else {
        toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  const disableButton = !Object.values(form).every(Boolean) || !err.isValid || form.progress === null;
  return (
    <>
      <NavBar />
      <div className="p-4 flex items-center justify-center h-[75vh]">

        {loading ?
          <Loading /> :

          <div className="createBlock min-w-[35vw]">

            <h1 className='font-bold my-4 text-lg text-center'>

              Edit Your Block</h1>
            <form onSubmit={handleSubmit} >
              <div className="badge badge-outline">Progress</div>
              <input
                type="number"
                placeholder="Enter Progress"
                className="input input-bordered input-md w-full my-2 min-w-[30vw]"
                name='progress'
                value={form.progress}
                onChange={handleFormChange} />
              <p className='text-orange-500 h-6 mb-2'>{err.progress}</p>
              <div className="badge badge-outline">Start Date</div>
              <input
                type="date"
                placeholder="Enter Start Date"
                className="input input-bordered input-md w-full my-2 min-w-[30vw]"
                name='startDate'
                value={form.startDate}
                onChange={handleFormChange} />
              <p className='text-orange-500 h-6 mb-2'>{err.startDate}</p>
              <div className="badge badge-outline">End Date</div>
              <input
                type="date"
                placeholder="Enter End Date"
                className="input input-bordered input-md w-full my-2 min-w-[30vw]"
                name='endDate'
                value={form.endDate}
                onChange={handleFormChange}
              />
              <p className='text-orange-500 h-6 mb-2'>{err.endDate}</p>
              <div className='text-center'>
                <button
                  disabled={disableButton}
                  className='btn btn-sm mt-2 border border-slate-700 w-32 disabled:border-slate-500 disabled:text-slate-400 cursor-pointer'
                  type="submit">
                  Update Block
                </button>
              </div>

            </form>

          </div>}

      </div>
    </>

  )
}

export default BlockDetails