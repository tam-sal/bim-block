import React from 'react'

const CreateBlock = ({ edit }) => {


  return (
    <>
      <div className="createBlock min-w-[35vw]">

        <h1 className='font-bold my-4 text-lg text-center'>
          {edit ? 'Edit ' : 'Create '}
          Your Block</h1>
        <form action="">
          {!edit && <> <div className="badge badge-outline">Description</div>
            <input
              type="text"
              placeholder="Enter Description"
              className="input input-bordered input-md w-full my-2 min-w-[30vw]" />

            <p className='text-orange-500'>error</p>
          </>}

          <div className="badge badge-outline">Progress</div>
          <input
            type="number"
            placeholder="Enter Progress"
            className="input input-bordered input-md w-full my-2 min-w-[30vw]" />
          <p className='text-orange-500'>error</p>
          <div className="badge badge-outline">Start Date</div>
          <input
            type="date"
            placeholder="Enter Start Date"
            className="input input-bordered input-md w-full my-2 min-w-[30vw]" />
          <p className='text-orange-500'>error</p>
          <div className="badge badge-outline">End Date</div>
          <input
            type="date"
            placeholder="Enter End Date"
            className="input input-bordered input-md w-full my-2 min-w-[30vw]" />
          <p className='text-orange-500'>error</p>
          <div className='text-center'>
            <button
              className='btn btn-sm mt-2 border border-slate-700 w-32'
              type="submit">
              {edit ? 'Update ' : 'Create '}
              Block
            </button>
          </div>

        </form>

      </div>
    </>
  )
}

export default CreateBlock