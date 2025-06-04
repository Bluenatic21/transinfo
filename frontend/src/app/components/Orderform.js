"use client";
import { useState } from "react";

export default function OrderForm({ onCreated }) {
    const [form, setForm] = useState({
        city: "", status: "", date: "", price: "", cargo_type: "", comment: "", username: ""
    });
    const [error, setError] = useState("");

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        if (!form.city || !form.status || !form.date || !form.cargo_type) {
            setError("Заполните все обязательные поля!");
            return;
        }
        const res = await fetch("http://localhost:8000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            setForm({ city: "", status: "", date: "", price: "", cargo_type: "", comment: "", username: "" });
            onCreated && onCreated();
        } else {
            setError("Ошибка при отправке.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            background: "#282a36", borderRadius: 10, padding: 18, marginBottom: 22, color: "#eee"
        }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <input name="city" placeholder="Город" value={form.city} onChange={handleChange} required />
                <input name="status" placeholder="Статус" value={form.status} onChange={handleChange} required />
                <input name="date" type="date" value={form.date} onChange={handleChange} required />
                <input name="price" placeholder="Цена" value={form.price} onChange={handleChange} />
                <input name="cargo_type" placeholder="Тип груза" value={form.cargo_type} onChange={handleChange} required />
                <input name="username" placeholder="Ваше имя (для профиля)" value={form.username} onChange={handleChange} />
            </div>
            <textarea name="comment" placeholder="Комментарий" value={form.comment} onChange={handleChange} style={{ marginTop: 8, width: "100%", borderRadius: 5 }} />
            <button type="submit" style={{ marginTop: 8, background: "#6cf", color: "#21222b", padding: "8px 14px", borderRadius: 8, border: 0, fontWeight: 600 }}>
                Создать заявку
            </button>
            {error && <div style={{ color: "#f55", marginTop: 6 }}>{error}</div>}
        </form>
    );
}
