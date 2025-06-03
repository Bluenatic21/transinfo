from fastapi import FastAPI
from pydantic import BaseModel
import logging

# Настройка логирования
logging.basicConfig(
    filename="backend_debug.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    encoding="utf-8",
    filemode="a",
)

app = FastAPI()
ORDERS = []


class Order(BaseModel):
    cargoType: str
    weight: str     # Все поля — строки!
    fromCity: str
    toCity: str
    date: str
    contact: str
    phone: str


@app.post("/api/orders/")
def create_order(order: Order):
    ORDERS.append(order)
    logging.info(f"Добавлена новая заявка: {order}")
    return {"status": "ok", "order": order}


@app.get("/api/orders/")
def get_orders():
    logging.info(f"Запрошен список заявок (всего: {len(ORDERS)})")
    return ORDERS


@app.get("/api/order_fields/")
def get_order_fields():
    return [
        "cargoType", "weight", "fromCity", "toCity", "date", "contact", "phone"
    ]
