"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // username можно брать из auth-сессии, для теста просто "admin"
        fetch("http://localhost:8000/profile/admin")
            .then(res => res.json())
            .then(data => setProfile(data));
    }, []);

    if (!profile) return <div>Загрузка...</div>;

    return (
        <div style={{
            maxWidth: 350, margin: "60px auto", background: "#222", padding: 32,
            borderRadius: 10, color: "#fff"
        }}>
            <h2>Профиль</h2>
            <div>Username: <b>{profile.username}</b></div>
            <div>Role: <b>{profile.role}</b></div>
        </div>
    );
}
