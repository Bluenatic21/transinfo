import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

export default function Home() {
    return (
        <div style={{
            maxWidth: 520,
            margin: "40px auto",
            background: "#222",
            borderRadius: 14,
            padding: 28,
            boxShadow: "0 8px 32px #0003"
        }}>
            <h1 style={{
                textAlign: "center",
                color: "#fff",
                marginBottom: 28,
                fontWeight: 700
            }}>
                Заявки на перевозку
            </h1>
            <OrderForm />
            <OrderList />
        </div>
    );
}
