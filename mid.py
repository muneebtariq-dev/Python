# Mid Problem 1

"""
item = input("Name your item: ")
item_price = input("Enter the price of your item: ")
total_price = float(item_price) * 3

output = f' You are buying 3 {item}s for a total price of {total_price}$'

print(output)
"""

# Mid Problem 2

"""
item_name = input("Name your item: ")
num_item = input("Enter Quantity: ")
item_price = input("Enter the price: ")
num_item = int(num_item)
item_price = float(item_price)

total_cost = num_item * item_price
total_dis = total_cost * 0.9

output = f' You are buying {item_name} at a price of {item_price}$ with 10% OFF from {total_cost}$ to only {total_dis}$'

print(output)
"""

# Problem 3:
import math
x1 = 13.4
y1 = 5.01
x2 = 3.1
y2 = 8.9

raw_distance = math.sqrt((x2 - x1) * (x2 - x1))
clean_distance = math.floor(raw_distance)

print(clean_distance)