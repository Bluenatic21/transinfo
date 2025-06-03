"use client";
import OrderForm from "@/components/OrderForm";
import OrderList from "@/components/OrderList";
import { useState } from "react";

export default function HomePage() {
  const [refresh, setRefresh] = useState(0);

  // Когда заявка добавлена — обновить список
  function handleOrderAdded() {
    setRefresh((r) => r + 1);
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "48px 12px",
      fontFamily: "Arial, Helvetica, sans-serif",
      background: "var(--background)",
      color: "var(--foreground)",
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 24, fontWeight: 700 }}>Заявки на перевозку</h1>
      <div style={{ maxWidth: 480, width: "100%", marginBottom: 36 }}>
        <OrderForm onOrderAdded={handleOrderAdded} />
      </div>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <OrderList refresh={refresh} />
      </div>
    </main>
  );
}
