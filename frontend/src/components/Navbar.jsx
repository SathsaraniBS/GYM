const Header = () => (
  <header className="bg-black text-white p-4 flex justify-between items-center">
    <div className="text-xl font-bold">FitTrack</div>
    <nav className="space-x-6">
      <a href="#" className="hover:text-red-500">HOME</a>
      <a href="#" className="hover:text-red-500">ABOUT</a>
      <a href="#" className="hover:text-red-500">COURSES</a>
      <a href="#" className="hover:text-red-500">PRICING</a>
      <a href="#" className="hover:text-red-500">GALLERY</a>
      <a href="#" className="hover:text-red-500">BLOG</a>
      <a href="#" className="hover:text-red-500">CONTACT</a>
    </nav>
    <div className="space-x-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      <button className="bg-green-600 text-white px-4 py-2 rounded">Signup</button>
    </div>
  </header>
);

export default Header;