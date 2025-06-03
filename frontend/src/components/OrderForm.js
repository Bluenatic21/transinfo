"use client";
import { useState } from 'react';

export default function OrderForm({ onCreated }) {
    const [form, setForm] = useState({
        city: '', status: '', date: '', price: '', cargo_type: '', comment: ''
    });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await fetch('http://localhost:8000/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            setForm({ city: '', status: '', date: '', price: '', cargo_type: '', comment: '' });
            onCreated && onCreated();
        } else {
            setError('Ошибка при отправке. Проверьте поля.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            background: "#191919",
            borderRadius: 8,
            padding: 18,
            marginBottom: 18
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input name="city" placeholder="Город" value={form.city} onChange={handleChange} required />
                <input name="status" placeholder="Статус" value={form.status} onChange={handleChange} required />
                <input name="date" type="date" value={form.date} onChange={handleChange} required />
                <input name="price" placeholder="Цена" value={form.price} onChange={handleChange} />
                <input name="cargo_type" placeholder="Тип груза" value={form.cargo_type} onChange={handleChange} />
                <input name="comment" placeholder="Комментарий" value={form.comment} onChange={handleChange} />
                <button type="submit" style={{ background: "#2166fa", color: "#fff", border: 0, borderRadius: 5, padding: 10, fontWeight: 600 }}>
                    Отправить заявку
                </button>
            </div>
            {error && <div style={{ color: "#ff3333", marginTop: 8 }}>{error}</div>}
        </form>
    );
}
