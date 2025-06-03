"use client";
import { useState, useEffect } from 'react';
import OrderFilter from './OrderFilter';

export default function OrderList() {
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

    useEffect(() => {
        fetchOrders(filters);
        // eslint-disable-next-line
    }, [filters]);

    return (
        <div>
            <OrderFilter onFilter={setFilters} />
            {loading ? <div>Загрузка...</div> :
                <ul style={{ marginTop: 12 }}>
                    {orders.length === 0
                        ? <li style={{ color: "#888" }}>Нет заявок</li>
                        : orders.map(order => (
                            <li key={order.id} style={{
                                background: "#181818", color: "#fff",
                                borderRadius: 5, padding: "9px 12px", marginBottom: 7
                            }}>
                                <b>{order.city}</b> | {order.status} | {order.date} | {order.price} | {order.cargo_type}
                                <div style={{ fontSize: 12, color: "#aaa" }}>{order.comment}</div>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    );
}
