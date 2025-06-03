"use client";
import { useState } from 'react';

export default function OrderFilter({ onFilter }) {
    const [city, setCity] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [cargoType, setCargoType] = useState('');

    const handleFilter = () => {
        onFilter({
            city,
            status,
            date,
            price,
            cargo_type: cargoType,
        });
    };

    return (
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
            <input placeholder="Город" value={city} onChange={e => setCity(e.target.value)} />
            <input placeholder="Статус" value={status} onChange={e => setStatus(e.target.value)} />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <input placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} />
            <input placeholder="Тип груза" value={cargoType} onChange={e => setCargoType(e.target.value)} />
            <button onClick={handleFilter}>Фильтровать</button>
        </div>
    );
}
