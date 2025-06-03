import React, { useState } from "react";

export default function OrderForm() {
    const [form, setForm] = useState({
        cargoType: "",
        weight: "",
        fromCity: "",
        toCity: "",
        contact: "",
        phone: ""
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        alert("Заявка отправлена!\n" + JSON.stringify(form, null, 2));
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h2>Заявка на перевозку</h2>
            <input name="cargoType" placeholder="Тип груза" value={form.cargoType} onChange={handleChange} required />
            <input name="weight" placeholder="Вес (кг)" value={form.weight} onChange={handleChange} required />
            <input name="fromCity" placeholder="Город отправления" value={form.fromCity} onChange={handleChange} required />
            <input name="toCity" placeholder="Город назначения" value={form.toCity} onChange={handleChange} required />
            <input name="contact" placeholder="Контактное лицо" value={form.contact} onChange={handleChange} required />
            <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} required />
            <button type="submit">Отправить заявку</button>
        </form>
    );
}
