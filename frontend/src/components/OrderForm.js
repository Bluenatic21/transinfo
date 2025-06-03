import React, { useState } from "react";

export default function OrderForm({ onOrderAdded }) {
    const [fields, setFields] = useState({
        cargoType: "",
        weight: "",
        fromCity: "",
        toCity: "",
        date: "",
        contact: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState("");

    function handleChange(e) {
        setFields({ ...fields, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setOk("");
        const res = await fetch("/api/orders/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fields),
        });
        setLoading(false);
        if (res.ok) {
            setFields({
                cargoType: "",
                weight: "",
                fromCity: "",
                toCity: "",
                date: "",
                contact: "",
                phone: "",
            });
            setOk("Заявка отправлена!");
            if (onOrderAdded) onOrderAdded();
        } else {
            setOk("Ошибка при отправке.");
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: "flex", flexDirection: "column", gap: 14,
            background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 28,
            border: "1px solid #eee"
        }}>
            <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Оформить заявку</div>
            <input required name="cargoType" placeholder="Тип груза" value={fields.cargoType} onChange={handleChange} />
            <input required type="number" min="0" name="weight" placeholder="Вес (кг)" value={fields.weight} onChange={handleChange} />
            <input required name="fromCity" placeholder="Город отправления" value={fields.fromCity} onChange={handleChange} />
            <input required name="toCity" placeholder="Город назначения" value={fields.toCity} onChange={handleChange} />
            <input required type="date" name="date" placeholder="Дата погрузки" value={fields.date} onChange={handleChange} />
            <input required name="contact" placeholder="Контактное лицо" value={fields.contact} onChange={handleChange} />
            <input required name="phone" placeholder="Телефон" value={fields.phone} onChange={handleChange} />
            <button type="submit" disabled={loading} style={{
                padding: "10px 0", borderRadius: 8, background: "#1847e1", color: "#fff",
                fontWeight: 700, fontSize: 16, marginTop: 8, border: "none", cursor: "pointer"
            }}>
                {loading ? "Отправка..." : "Отправить заявку"}
            </button>
            <div style={{ color: ok === "Заявка отправлена!" ? "green" : "#d30", minHeight: 18, marginTop: 3 }}>
                {ok}
            </div>
        </form>
    );
}
