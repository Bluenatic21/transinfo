import logging
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
import uuid

# Настройка логирования
logging.basicConfig(
    filename="backend_debug.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

# Инициализация приложения
app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    # Замените на список разрешённых источников в продакшене
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модели данных


class Order(BaseModel):
    id: str
    city: str
    status: str
    date: str
    price: str
    cargo_type: str
    comment: Optional[str] = ""


class User(BaseModel):
    id: str
    username: str
    password: str  # В продакшене используйте хеширование паролей
    role: str = "client"


# Временные базы данных
ORDERS_DB = []
USERS_DB = []

# Получение списка заявок с фильтрацией


@app.get("/orders", response_model=List[Order])
def get_orders(
    city: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    date: Optional[str] = Query(None),
    price: Optional[str] = Query(None),
    cargo_type: Optional[str] = Query(None)
):
    logging.info(
        f"Фильтрация: city={city}, status={status}, date={date}, price={price}, cargo_type={cargo_type}")
    filtered_orders = ORDERS_DB
    if city:
        filtered_orders = [
            order for order in filtered_orders if order.city.lower() == city.lower()]
    if status:
        filtered_orders = [
            order for order in filtered_orders if order.status.lower() == status.lower()]
    if date:
        filtered_orders = [
            order for order in filtered_orders if order.date == date]
    if price:
        filtered_orders = [
            order for order in filtered_orders if order.price == price]
    if cargo_type:
        filtered_orders = [
            order for order in filtered_orders if order.cargo_type.lower() == cargo_type.lower()]
    return filtered_orders

# Создание новой заявки


@app.post("/orders", response_model=Order)
def create_order(order: Order):
    order.id = str(uuid.uuid4())
    ORDERS_DB.append(order)
    logging.info(f"Создана заявка: {order}")
    return order

# Регистрация пользователя


@app.post("/register")
def register_user(user: User):
    if any(existing_user.username == user.username for existing_user in USERS_DB):
        raise HTTPException(
            status_code=400, detail="Пользователь уже существует")
    user.id = str(uuid.uuid4())
    USERS_DB.append(user)
    logging.info(f"Зарегистрирован пользователь: {user.username}")
    return {"status": "ok", "id": user.id}

# Авторизация пользователя


@app.post("/login")
def login(user: User):
    for existing_user in USERS_DB:
        if existing_user.username == user.username and existing_user.password == user.password:
            logging.info(f"Вход: {user.username}")
            return {"status": "ok", "id": existing_user.id, "role": existing_user.role}
    raise HTTPException(status_code=401, detail="Неверные учетные данные")
