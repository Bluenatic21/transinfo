from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from config.fields import ORDER_FIELDS
from pydantic import BaseModel
from typing import List
import time

import logging

logging.basicConfig(
    filename="backend_debug.log",
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(message)s",
    encoding="utf-8",
    filemode="w",  # <-- всегда перезаписывать при запуске!
)

app = FastAPI()


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000

    logging.info(
        f"{request.method} {request.url.path} | Status: {response.status_code} | "
        f"Time: {process_time:.2f} ms | From: {request.client.host}"
    )
    return response

# Для работы с фронтом (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно ограничить только своим доменом
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/order_fields/")
def get_order_fields():
    return ORDER_FIELDS


class Order(BaseModel):
    cargo_type: str
    weight: float
    volume: float = None
    from_city: str
    to_city: str
    date_from: str
    date_to: str = None
    contact: str
    phone: str


# временное "хранилище" заявок
ORDERS: List[Order] = []


@app.post("/api/orders/")
def create_order(order: Order):
    ORDERS.append(order)
    return {"status": "ok", "order": order}


@app.get("/api/orders/")
def get_orders():
    return ORDERS
