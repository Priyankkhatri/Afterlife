import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()



client = MongoClient(MONGODB_URI)
db = client[DATABASE_NAME]


def connect_to_mongo() -> None:
    client.admin.command("ping")
