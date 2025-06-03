from fastapi import FastAPI, Query
from typing import Optional, List
from models import Order  # Предполагается, что модель Order определена в models.py
import logging

app = FastAPI()

# Настройка логирования
logging.basicConfig(filename='backend_debug.log', level=logging.INFO)


@app.get("/orders", response_model=List[Order])
def get_orders(
    city: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    date: Optional[str] = Query(None),
):
    # Предполагается, что у вас есть функция get_all_orders() для получения всех заявок
    orders = get_all_orders()  # Замените на вашу реальную функцию получения заявок

    # Фильтрация
    if city:
        orders = [order for order in orders if order.city == city]
    if status:
        orders = [order for order in orders if order.status == status]
    if date:
        orders = [order for order in orders if order.date == date]

    logging.info(
        f"Фильтрация заявок: city={city}, status={status}, date={date}, найдено: {len(orders)}")
    return orders
