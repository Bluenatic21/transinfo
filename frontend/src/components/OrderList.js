"use client";
import { useState, useEffect } from 'react';
import OrderFilter from './OrderFilter';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchOrders = async (filterObj = {}) => {
        const params = new URLSearchParams();
        Object.entries(filterObj).forEach(([key, value]) => {
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
                        <b>{order.city}</b> | {order.status} | {order.date} | {order.price} | {order.cargo_type}
                        <br />
                        <i>{order.comment}</i>
                    </li>
                ))}
            </ul>
        </div>
    );
}
