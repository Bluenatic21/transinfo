"use client";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: 32 }}>
            <button
                onClick={() => setShowLogin(!showLogin)}
                style={{
                    marginBottom: 16,
                    padding: "8px 24px",
                    borderRadius: 8,
                    background: "#ececec",
                    border: "none",
                }}
            >
                {showLogin ? "Нет аккаунта? Регистрация" : "Уже есть аккаунт? Войти"}
            </button>
            {showLogin ? (
                <LoginForm onLogin={(token) => alert("Вход успешен!")} />
            ) : (
                <RegisterForm onSuccess={() => setShowLogin(true)} />
            )}
        </div>
    );
}
