"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);
    return (
        <div style={{
            maxWidth: 480, margin: "60px auto", background: "#222", padding: 32,
            borderRadius: 10, color: "#fff"
        }}>
            <h2>Список пользователей</h2>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        {u.username} | role: <b>{u.role}</b>
                    </li>
                ))}
            </ul>
        </div>
    );
}
