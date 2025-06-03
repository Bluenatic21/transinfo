import { useState } from "react";

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                username: email,
                password: password,
            }),
        });
        const data = await res.json();
        if (data.access_token) {
            setMsg("Login successful!");
            onLogin(data.access_token);
        } else {
            setMsg(data.detail || "Login error");
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            <div>{msg}</div>
        </form>
    );
}
