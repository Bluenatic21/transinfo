"use client";
import { useState, useEffect } from 'react';
import OrderFilter from './OrderFilter';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchOrders = async (filterParams = {}) => {
        const params = new URLSearchParams();
        Object.entries(filterParams).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        const response = await fetch(`/api/orders?${params.toString()}`);
        const data = await response.json();
        setOrders(data);
    };

    useEffect(() => {
        fetchOrders(filters);
    }, [filters]);

    return (
        <div>
            <OrderFilter onFilter={setFilters} />
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <strong>{order.city}</strong> | {order.status} | {order.date} | {order.price} | {order.cargo_type}
                        <br />
                        <em>{order.comment}</em>
                    </li>
                ))}
            </ul>
        </div>
    );
}
