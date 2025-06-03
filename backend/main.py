import logging
import time
from fastapi import FastAPI, Query, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

# Централизованное логирование всех запросов и ошибок


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        log_message = (
            f"{request.method} {request.url.path} "
            f"Status {response.status_code} "
            f"Query {dict(request.query_params)} "
            f"Process {process_time:.2f}ms"
        )
        logging.info(log_message)
        return response
    except Exception as e:
        logging.exception(
            f"Exception for {request.method} {request.url.path}: {e}")
        raise


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"UNHANDLED EXCEPTION at {request.url.path}: {repr(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"},
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
    return order

# Регистрация пользователя


@app.post("/register")
def register_user(user: User):
    if any(existing_user.username == user.username for existing_user in USERS_DB):
        raise HTTPException(
            status_code=400, detail="Пользователь уже существует")
    user.id = str(uuid.uuid4())
    USERS_DB.append(user)
    return {"status": "ok", "id": user.id}

# Авторизация пользователя


@app.post("/login")
def login(user: User):
    for existing_user in USERS_DB:
        if existing_user.username == user.username and existing_user.password == user.password:
            return {"status": "ok", "id": existing_user.id, "role": existing_user.role}
    raise HTTPException(status_code=401, detail="Неверные учетные данные")
