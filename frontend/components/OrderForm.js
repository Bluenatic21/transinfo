import { useEffect, useState } from "react";

export default function OrderForm() {
    const [fields, setFields] = useState([]);
    const [form, setForm] = useState({});
    const [orders, setOrders] = useState([]);

    // Загружаем поля
    useEffect(() => {
        fetch("http://localhost:8000/api/order_fields/")
            .then((r) => r.json())
            .then(setFields);
        // Загружаем заявки
        fetchOrders();
    }, []);

    // Функция для загрузки заявок
    const fetchOrders = () => {
        fetch("http://localhost:8000/api/orders/")
            .then((r) => r.json())
            .then(setOrders);
    };

    const handleChange = (e, name) => {
        setForm({ ...form, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/api/orders/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((r) => r.json())
            .then((res) => {
                if (res.status === "ok") {
                    alert("Заявка отправлена!");
                    setForm({});       // Очистить форму
                    fetchOrders();     // Перезагрузить список заявок
                } else {
                    alert("Ошибка: " + JSON.stringify(res));
                }
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {fields.map((f) => (
                    <div key={f.name} style={{ marginBottom: 12 }}>
                        <label style={{ display: "block", marginBottom: 6 }}>{f.label}</label>
                        {f.type === "select" ? (
                            <select
                                required={f.required}
                                value={form[f.name] || ""}
                                onChange={e => handleChange(e, f.name)}
                            >
                                <option value="">Выберите...</option>
                                <option value="general">Генеральный</option>
                                <option value="refrigerator">Рефрижератор</option>
                                <option value="dangerous">Опасный</option>
                            </select>
                        ) : (
                            <input
                                type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                                required={f.required}
                                value={form[f.name] || ""}
                                onChange={e => handleChange(e, f.name)}
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Отправить</button>
            </form>

            <hr style={{ margin: "24px 0" }} />

            <h2>Отправленные заявки:</h2>
            {orders.length === 0 && <div>Пока нет заявок.</div>}
            <ul>
                {orders.map((order, i) => (
                    <li key={i} style={{ marginBottom: 12, borderBottom: '1px solid #eee', padding: 8 }}>
                        <b>{order.cargo_type}</b> из <b>{order.from_city}</b> в <b>{order.to_city}</b>
                        <br />Вес: {order.weight} кг, Контакт: {order.contact}, Телефон: {order.phone}
                        {/* добавь другие поля по желанию */}
                    </li>
                ))}
            </ul>
        </>
    );
}
