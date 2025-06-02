import { useEffect, useState } from "react";

export default function OrderForm() {
    const [fields, setFields] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/order_fields/")
            .then((r) => r.json())
            .then(setFields);
    }, []);

    return (
        <form>
            {fields.map((f) => (
                <div key={f.name} style={{ marginBottom: 12 }}>
                    <label>{f.label}</label>
                    {f.type === "select" ? (
                        <select required={f.required}>
                            <option value="">Выберите...</option>
                            <option value="general">Генеральный</option>
                            <option value="refrigerator">Рефрижератор</option>
                            <option value="dangerous">Опасный</option>
                        </select>
                    ) : (
                        <input
                            type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                            required={f.required}
                        />
                    )}
                </div>
            ))}
            <button type="submit">Отправить</button>
        </form>
    );
}