import React from 'react'

function WriteComment() {
  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
        <div className='bg-white p-8 rounded'>
            <h2 className='text-2xl font-bold mb-4'>Write a Comment</h2>
            <form>
                <div className='mb-4'>
                    <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>Name</label>
                    <input type="text" id="title" className='w-full p-2 border rounded' />

                    <label htmlFor="email"></label>
                </div>
                <div className='mb-4'>
                    <label htmlFor="description" className='block text-gray-700 font-bold mb-2'>Description</label>
                    <textarea id="description" className='w-full p-2 border rounded' rows="4"></textarea>
                    </div>
                    <button type="submit" className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>Save</button>
            </form>

        </div>

      
    </div>
    
  
    )
}

export default WriteComment
