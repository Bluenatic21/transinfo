'use client'
import OrderForm from '../../components/OrderForm'; // проверь путь!

export default function Home() {
  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Заявка на перевозку</h1>
      <OrderForm />
    </div>
  );
  <div style={{
    maxWidth: 480,
    margin: "40px auto",
    padding: 24,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px #0001",
    color: "#171717",      // <--- ЯВНЫЙ ТЁМНЫЙ ЦВЕТ
  }}>
    <h1 style={{ textAlign: "center", marginBottom: 24 }}>Заявка на перевозку</h1>
    <OrderForm />
  </div>
}