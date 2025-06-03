import logging
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
import uuid

# Логирование
logging.basicConfig(
    filename="backend_debug.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

# Демо "база" в памяти (замените на свою при необходимости)
ORDERS_DB = []
USERS_DB = []

# Модели


class Order(BaseModel):
    id: str
    city: str
    status: str
    date: str
    price: str
    cargo_type: str
    comment: str = ""
    # Добавляйте тут все остальные поля, которые были у вас в старой версии


class User(BaseModel):
    id: str
    username: str
    password: str  # Только для примера! В реале хешируйте!
    role: str = "client"


# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить всё для теста, на проде указать фронтенд!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Получить все заявки с фильтрацией


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
    filtered = ORDERS_DB
    if city:
        filtered = [o for o in filtered if o.city.lower() == city.lower()]
    if status:
        filtered = [o for o in filtered if o.status.lower() == status.lower()]
    if date:
        filtered = [o for o in filtered if o.date == date]
    if price:
        filtered = [o for o in filtered if o.price == price]
    if cargo_type:
        filtered = [o for o in filtered if o.cargo_type.lower() ==
                    cargo_type.lower()]
    return filtered

# Добавить заявку


@app.post("/orders", response_model=Order)
def create_order(order: Order):
    order.id = str(uuid.uuid4())
    ORDERS_DB.append(order)
    logging.info(f"Создана заявка: {order}")
    return order

# Пример регистрации


@app.post("/register")
def register_user(user: User):
    if any(u.username == user.username for u in USERS_DB):
        raise HTTPException(status_code=400, detail="User already exists")
    user.id = str(uuid.uuid4())
    USERS_DB.append(user)
    logging.info(f"Зарегистрирован пользователь: {user.username}")
    return {"status": "ok", "id": user.id}

# Пример авторизации


@app.post("/login")
def login(user: User):
    for u in USERS_DB:
        if u.username == user.username and u.password == user.password:
            logging.info(f"Вход: {user.username}")
            return {"status": "ok", "id": u.id, "role": u.role}
    raise HTTPException(status_code=401, detail="Invalid credentials")
