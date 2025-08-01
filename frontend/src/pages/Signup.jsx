import React from 'react'

function Signup() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/auth/signup', {
              name, email, password 
            });
          console.log(response);
          
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='border shadow p-6 w-80  bg-white '>
            <h2 className='text-2xl font-bold mb-4'>Signup</h2>
            <form>
                <div className='mb-4'>
                    <label className='block text-gray-700 '>Name</label>
                    <input type='text' onChange={(e) => setName(e.target.value)}
                    className='w-full px-3 py-2 border'
                    placeholder='Enter username' required
                     />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input type='email' onChange={(e) => setEmail(e.target.value)} 
                    className='w-full p-2 border ' 
                    placeholder='Enter email' required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} 
                    className='w-full p-2 border ' 
                    placeholder='Enter password' required/>
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Signup</button>
            </form>
        </div>
      
    </div>
  )
}

export default Signup
