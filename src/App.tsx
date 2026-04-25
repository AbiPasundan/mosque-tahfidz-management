import React, { useState } from 'react';
import { gasLogin } from '@/lib/gasApi';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await gasLogin(email, password);

      console.log("Token berhasil didapat:", res.token);

      alert("Login Berhasil!");
    } catch (error: any) {
      console.error("Gagal login:", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email admin"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
