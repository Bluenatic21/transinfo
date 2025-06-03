import logging
import time
from fastapi import FastAPI, Query, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional
from pydantic import BaseModel
import uuid

logging.basicConfig(
    filename="backend_debug.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware и error handler


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

# Модели


class Order(BaseModel):
    id: str
    city: str
    status: str
    date: str
    price: str
    cargo_type: str
    comment: Optional[str] = ""
    username: Optional[str] = ""  # автор заявки


class User(BaseModel):
    id: str
    username: str
    password: str  # не хешируется для демо!
    role: str = "client"


ORDERS_DB = []
USERS_DB = [
    User(id=str(uuid.uuid4()), username="admin", password="admin", role="admin")
]


def get_user(username: str):
    return next((u for u in USERS_DB if u.username == username), None)

# Заказы с фильтрацией


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


@app.post("/orders", response_model=Order)
def create_order(order: Order):
    order.id = str(uuid.uuid4())
    ORDERS_DB.append(order)
    return order


@app.delete("/orders/{order_id}")
def delete_order(order_id: str):
    global ORDERS_DB
    ORDERS_DB = [o for o in ORDERS_DB if o.id != order_id]
    return {"status": "deleted"}


@app.post("/register")
def register_user(user: User):
    if any(existing_user.username == user.username for existing_user in USERS_DB):
        raise HTTPException(
            status_code=400, detail="Пользователь уже существует")
    user.id = str(uuid.uuid4())
    USERS_DB.append(user)
    return {"status": "ok", "id": user.id, "role": user.role}


@app.post("/login")
def login(user: User):
    for existing_user in USERS_DB:
        if existing_user.username == user.username and existing_user.password == user.password:
            return {"status": "ok", "id": existing_user.id, "role": existing_user.role}
    raise HTTPException(status_code=401, detail="Неверные учетные данные")


@app.get("/profile/{username}", response_model=User)
def profile(username: str):
    u = get_user(username)
    if not u:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return u


@app.get("/users", response_model=List[User])
def users():
    return USERS_DB
