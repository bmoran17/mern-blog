import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
    // submit data to server  
    method: 'POST',
      // turns key value pair to 'username', "password"
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'}
    });
    if (response.status === 200) {
      alert('Registration Sucessful')
    } else {
      alert('Registration Failed')
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input 
      name="username"
        type="text" 
        placeholder="username" 
        value={username} 
        onChange={e => setUsername(e.target.value)}
      />
      <input 
      name="password"
        type="password" 
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  )
}

export default RegisterPage;