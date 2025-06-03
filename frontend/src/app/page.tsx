'use client';

import React, { useState, useEffect } from 'react';

type Order = {
  id: string;
  city: string;
  status: string;
  date: string;
  // Добавьте другие поля заявки, если необходимо
};

const OrderFilter: React.FC<{ onFilterChange: (filters: { city?: string; status?: string; date?: string }) => void }> = ({ onFilterChange }) => {
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      city: city || undefined,
      status: status || undefined,
      date: date || undefined,
    });
  };

  return (
    <div>
      <h2>Фильтрация заявок</h2>
      <input
        type="text"
        placeholder="Город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Статус"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input
        type="date"
        placeholder="Дата"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleFilterChange}>Применить фильтр</button>
    </div>
  );
};

const OrderList: React.FC<{ filters: { city?: string; status?: string; date?: string } }> = ({ filters }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const queryParams = new URLSearchParams();
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.date) queryParams.append('date', filters.date);

      const response = await fetch(`/orders?${queryParams.toString()}`);
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, [filters]);

  return (
    <div>
      <h2>Список заявок</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.city}</strong> - {order.status} - {order.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Page: React.FC = () => {
  const [filters, setFilters] = useState<{ city?: string; status?: string; date?: string }>({});

  return (
    <div>
      <h1>TransInfo</h1>
      <OrderFilter onFilterChange={setFilters} />
      <OrderList filters={filters} />
    </div>
  );
};

export default Page;
