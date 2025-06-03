import { useState } from "react";

export default function RegisterForm({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.status === "ok") {
            setMsg("Registration successful!");
            onSuccess();
        } else {
            setMsg(data.detail || "Registration error");
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
            <div>{msg}</div>
        </form>
    );
}
