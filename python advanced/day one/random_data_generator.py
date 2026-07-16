import json
import random
import string

NUM_RECORDS = 1000

data = []

for i in range(NUM_RECORDS):
    data.append({
        "id": i + 1,
        "name": ''.join(random.choices(string.ascii_letters, k=12)),
        "age": random.randint(18, 70),
        "city": random.choice([
            "Lahore",
            "Karachi",
            "Islamabad",
            "Peshawar",
            "Quetta",
            "Faisalabad"
        ]),
        "salary": random.randint(30000, 200000),
        "department": random.choice([
            "IT",
            "HR",
            "Finance",
            "Sales",
            "Marketing"
        ]),
        "active": random.choice([True, False])
    })

with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print(f"{NUM_RECORDS:,} records written to data.json")