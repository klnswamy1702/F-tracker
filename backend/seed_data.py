from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend import models, schemas
import datetime
import random

# Ensure tables exist
models.Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    try:
        today = datetime.date.today()
        
        transactions = [
            # Credits
            {"amount": 5000, "type": "credit", "category": "Salary", "description": "Monthly Salary", "days_ago": 1},
            {"amount": 200, "type": "credit", "category": "Refund", "description": "Tax Refund", "days_ago": 3},
            {"amount": 150, "type": "credit", "category": "Freelance", "description": "Logo Design", "days_ago": 5},
            {"amount": 1000, "type": "credit", "category": "Bonus", "description": "Performance Bonus", "days_ago": 8},
            {"amount": 50, "type": "credit", "category": "Gift", "description": "Birthday Gift", "days_ago": 9},
            
            # Debits
            {"amount": 50, "type": "debit", "category": "Food", "description": "Lunch", "days_ago": 0},
            {"amount": 120, "type": "debit", "category": "Utilities", "description": "Electric Bill", "days_ago": 2},
            {"amount": 300, "type": "debit", "category": "Rent", "description": "Partial Rent", "days_ago": 4},
            {"amount": 60, "type": "debit", "category": "Transport", "description": "Gas", "days_ago": 6},
            {"amount": 200, "type": "debit", "category": "Shopping", "description": "Groceries", "days_ago": 10},
        ]

        for tx in transactions:
            date = today - datetime.timedelta(days=tx["days_ago"])
            db_transaction = models.Transaction(
                amount=tx["amount"],
                type=tx["type"],
                category=tx["category"],
                description=tx["description"],
                date=date
            )
            db.add(db_transaction)
        
        db.commit()
        print("Successfully added 10 sample transactions.")
        
    except Exception as e:
        print(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
