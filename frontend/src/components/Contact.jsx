import React, { useState } from 'react'
import { ClipLoader } from "react-spinners";

function Contact() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading , setLoading] = useState(false);
  return (
    <section className="contact">
      <form>
        <h1>Contact Us</h1>

        <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <button type="submit" disabled={loading}
        style={
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blue",
            color: "white",
            gap: "15px"
          }
          }
          >
            {!loading && <ClipLoader size={20} color="white"/>}
            Send Message</button>
      </form>
      
    </section>
  )
}

export default Contact
