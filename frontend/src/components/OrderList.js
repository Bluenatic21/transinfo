import React, { useEffect, useState } from "react";

export default function OrderList({ refresh }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/api/orders/")
            .then((r) => r.json())
            .then(setOrders)
            .finally(() => setLoading(false));
    }, [refresh]);

    if (loading) return <div style={{ textAlign: "center", color: "#aaa", margin: "32px 0" }}>Загрузка заявок...</div>;

    if (!orders.length) return <div style={{ textAlign: "center", color: "#aaa", margin: "32px 0" }}>Нет заявок</div>;

    return (
        <div style={{
            display: "flex", flexDirection: "column", gap: 16,
            width: "100%", marginTop: 16
        }}>
            {orders.map((o, idx) => (
                <div key={idx} style={{
                    background: "#fafbff", borderRadius: 10, boxShadow: "0 1px 6px #0001", padding: 16, border: "1px solid #ececec"
                }}>
                    <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 2 }}>
                        {o.cargoType} &rarr; {o.fromCity} → {o.toCity}
                    </div>
                    <div style={{ fontSize: 15, color: "#444", marginBottom: 2 }}>
                        Вес: <b>{o.weight}</b> кг | Дата: <b>{o.date || "—"}</b>
                    </div>
                    <div style={{ fontSize: 14, color: "#666" }}>
                        Контакт: {o.contact} ({o.phone})
                    </div>
                </div>
            ))}
        </div>
    );
}
