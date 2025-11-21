from pydantic import BaseModel
from datetime import date
from typing import Optional

class TransactionBase(BaseModel):
    amount: float
    type: str
    category: Optional[str] = None
    date: date
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int

    class Config:
        orm_mode = True
