"use client";
import { useState, useEffect } from "react";
import OrderFilter from "./OrderFilter";

export default function OrderList({ reload, setMessage }) {
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchOrders = async (filterObj = {}) => {
        setLoading(true);
        const params = new URLSearchParams();
        Object.entries(filterObj).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        const res = await fetch('http://localhost:8000/orders?' + params.toString());
        if (!res.ok) {
            setOrders([]);
            setLoading(false);
            return;
        }
        const data = await res.json();
        setOrders(data);
        setLoading(false);
    };

    useEffect(() => { fetchOrders(filters); }, [filters, reload]);

    // для удаления
    const handleDelete = async (id) => {
        if (!window.confirm("Удалить заявку?")) return;
        const res = await fetch(`http://localhost:8000/orders/${id}`, { method: "DELETE" });
        if (res.ok) {
            setMessage("Заявка удалена!");
            fetchOrders(filters);
        }
    };

    return (
        <div>
            <OrderFilter onFilter={setFilters} />
            {loading ? <div>Загрузка...</div> :
                <ul style={{ marginTop: 12 }}>
                    {orders.length === 0
                        ? <li style={{ color: "#888" }}>Нет заявок</li>
                        : orders.map(order => (
                            <li key={order.id} style={{
                                background: "#202130", color: "#fff",
                                borderRadius: 6, padding: "13px 18px", marginBottom: 10,
                                boxShadow: "0 1px 4px #0003"
                            }}>
                                <div>
                                    <b>{order.city}</b> | {order.status} | {order.date} | {order.price} | {order.cargo_type}
                                    <span style={{ float: "right", color: "#6cf", fontSize: 13 }}>
                                        {order.username && `Автор: ${order.username}`}
                                    </span>
                                </div>
                                {order.comment && <div style={{ fontSize: 13, color: "#bfc" }}>{order.comment}</div>}
                                <button onClick={() => handleDelete(order.id)} style={{
                                    background: "#f55", color: "#fff", border: 0, borderRadius: 5,
                                    padding: "3px 10px", marginTop: 5, fontSize: 13, cursor: "pointer"
                                }}>
                                    Удалить
                                </button>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    );
}
