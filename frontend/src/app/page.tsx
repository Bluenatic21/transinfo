// frontend/src/app/page.tsx

export default function HomePage() {
  return (
    <div style={{ padding: 32, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>TransInfo — главная страница</h1>
      <p style={{ fontSize: 18, marginBottom: 32 }}>
        Добро пожаловать на платформу TransInfo!
        Здесь вы сможете размещать и находить заявки на перевозки грузов по Грузии, СНГ и Европе.
      </p>
      <a
        href="/auth"
        style={{
          display: "inline-block",
          padding: "12px 32px",
          borderRadius: 8,
          background: "#222",
          color: "#fff",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Войти или зарегистрироваться
      </a>
      <div style={{ marginTop: 64, color: "#aaa" }}>
        <i>Форма заявки будет добавлена здесь на следующем этапе.</i>
      </div>
    </div>
  );
}
