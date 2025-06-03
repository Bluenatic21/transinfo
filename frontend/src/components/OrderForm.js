"use client";
import { useState } from 'react';

export default function OrderForm({ onCreated }) {
    const [form, setForm] = useState({
        city: '', status: '', date: '', price: '', cargo_type: '', comment: ''
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            setForm({ city: '', status: '', date: '', price: '', cargo_type: '', comment: '' });
            onCreated && onCreated();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
            <input name="city" placeholder="Город" value={form.city} onChange={handleChange} required />
            <input name="status" placeholder="Статус" value={form.status} onChange={handleChange} required />
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
            <input name="price" placeholder="Цена" value={form.price} onChange={handleChange} />
            <input name="cargo_type" placeholder="Тип груза" value={form.cargo_type} onChange={handleChange} />
            <input name="comment" placeholder="Комментарий" value={form.comment} onChange={handleChange} />
            <button type="submit">Создать заявку</button>
        </form>
    );
}
