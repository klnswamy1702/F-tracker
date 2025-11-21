from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas
from datetime import timedelta

def get_transactions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Transaction).offset(skip).limit(limit).all()

def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_weekly_report(db: Session):
    # This is a simplified weekly report, aggregating all time for now or last 7 days
    # For a real app, we might want to filter by specific weeks.
    # Here we will return the total credit and debit for the last 7 days.
    
    # Find the date 7 days ago
    # Note: In a real scenario, we'd need to handle date logic more robustly
    # For this MVP, let's just return total sums grouped by type for simplicity in the first pass,
    # or we can try to do the date filter if we import datetime.
    
    from datetime import date, timedelta
    today = date.today()
    start_date = today - timedelta(days=7)
    
    results = db.query(
        models.Transaction.type, 
        func.sum(models.Transaction.amount)
    ).filter(
        models.Transaction.date >= start_date
    ).group_by(
        models.Transaction.type
    ).all()
    
    report = {"credit": 0, "debit": 0}
    for type_, total in results:
        report[type_] = total
        
    return report
