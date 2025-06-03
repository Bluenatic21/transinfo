import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);
    const [token, setToken] = useState("");

    if (token) {
        return <div>Welcome! You are logged in.</div>;
    }

    return (
        <div>
            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? "No account? Register" : "Already registered? Login"}
            </button>
            {showLogin ? (
                <LoginForm onLogin={setToken} />
            ) : (
                <RegisterForm onSuccess={() => setShowLogin(true)} />
            )}
        </div>
    );
}
