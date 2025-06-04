"use client";
import { useState } from "react";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import FlashMessage from "./components/FlashMessage";

export default function Home() {
    const [message, setMessage] = useState("");
    const [reload, setReload] = useState(false);

    return (
        <div style={{
            maxWidth: 650, margin: "40px auto",
            background: "#21222b", borderRadius: 16,
            padding: 36, boxShadow: "0 6px 40px #0003"
        }}>
            <h1 style={{ textAlign: "center", color: "#6cf", marginBottom: 24 }}>Транспортные заявки</h1>
            <FlashMessage message={message} setMessage={setMessage} />
            <OrderForm onCreated={() => { setMessage("Заявка создана!"); setReload(!reload); }} />
            <OrderList reload={reload} setMessage={setMessage} />
        </div>
    );
}
