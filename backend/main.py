from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.fields import ORDER_FIELDS

app = FastAPI()

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
