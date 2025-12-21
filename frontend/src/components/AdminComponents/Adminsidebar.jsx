import React from 'react'

function Adminsidebar() {
  return (
    <div className='w-64 bg-gray-800 h-screen p-4'>
        {/* <aside className="w-64 bg-gray-800 h-screen p-4"> */}
          <h1 className="text-white text-2xl font-bold mb-8">Admin Panel</h1>
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="flex items-center bg-red-800 text-white px-4 py-2 rounded">
                  <span className="mr-2">🏠</span> Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                  <span className="mr-2">👥</span> Users
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                  <span className="mr-2">📄</span> Content
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                  <span className="mr-2">⚙️</span> Settings
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                  <span className="mr-2">🔔</span> Notifications
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                  <span className="mr-2">❓</span> Support
                </a>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-4">
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              <span className="mr-2">🚪</span> Logout
            </a>
          </div>
        {/* </aside> */}
      
    </div>
  )
}

export default Adminsidebar
