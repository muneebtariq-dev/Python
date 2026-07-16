# for loop

# for item in range(10):
#        print(item)

# for loop practice question:

# price = [100,30]
# total = 0

# for price in price:
#     total += price

# print(f'Total: {total}')

# for loop same output 2 methods

# 1
# for a in [5,2,5,2,2]:
#     print('x' * a)

# 2
# number = [5,2,5,2,2]
# for x_count in number:
#     output = ''
#     for count in range(x_count):
#         output += 'x'
# print(output)

# Lists

# names = ['mosh', 'google', 'mobs']
# print(names[:])

# finding largest number from list

# list = [1038328, 8, 7976, 452545,2392]
# largest_number = max(list)
# print(largest_number)

# # finding smallest number from list

# list = [1038328, 8, 7976, 452545,4309]
# largest_number = min(list)
# print(largest_number)

# 2D lists
# Used IN ML and similar to nested lists

# matrix = [
#     [1,2,3],
#     [4,5,6],
#     [7,8,9]
# ]
# for row in matrix:
#     for item in row:
#         print(item)

# List methods

# numbers = [2,8,9,6,3,7,4]
# numbers.pop()
# numbers.remove(6)
# numbers.append(10)
# numbers.insert(3,1)
# numbers.clear()
# numbers.index(2)
# numbers.copy()
# numbers.reverse()

# print(numbers)



# Program to remove duplicates numbers

# numbers = [4,7,4,2,3,4,6,2,1,3,3,3]
# unique_numbers = []

# for number in numbers:
#     if number not in unique_numbers:
#        unique_numbers.append(number)
        
# print(unique_numbers)

# Program to get duplicate numbers only

# numbers = [4,7,4,2,3,4,6,2,1,3,3,3]
# unique_numbers = []
# duplicate_numbers = []

# for number in numbers:
#     if number in unique_numbers and number not in duplicate_numbers:
#         duplicate_numbers.append(number)
#     else:
#         unique_numbers.append(number)

# print(duplicate_numbers)        
# print(unique_numbers)

# Tuples

# number = (1,2,3,4)
# print(number)

# Dictionaries
'''
customer = {
    "name": "Mosh",
    "age": 30,
    "is_verified": True
}
customer ["name"] = "Muneeb"
customer ["birthday"] = "2010-10-26"

print(f"What's the Vibe today '{customer.get('name')}'. I guess your age is {customer.get("birthday")}")
'''

# Practice for dictionary
'''
numbers = input("Enter a number : ")

digit_mapping = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
}

for ch in numbers:
    print(digit_mapping.get(int(ch), "invalid"), end = " ") '''

# functions in python:
# login form logic in python:
'''
user_name = input("Enter your name: ")
user_email = input("Enter your email: ")
password = int(input("Enter new password (only use numbers): "))

if user_email != "" and str(password).isdigit():
    account_created = True
elif user_email != "" and not str(password).isdigit():
    account_created = False
else:
    account_created = False 
    print("Warning: Invalid email and password")

support_team_number = "123-456-7890"

def greet_user():
    print("Hi there! " + user_name)
    print("Your account has been created successfully with password: " + str(password))

if account_created == True:
    print("Start")
    greet_user()
    print("Finish")
else:
    print("Account not created, please try again or contact support team: " + support_team_number)
    '''

# Parameters and argumaents in python functions
'''def greet_user(name):
    print(f"Hi {name}")

greet_user("Muneeb")
greet_user("Mosh")'''

# Hacker Rank conditional statements test.
'''
number = 24
num_odd = False
num_even = False

if number % 2 == 0:
    num_even = True
else:
    num_odd = True


if num_odd:  
    print("Weird")

elif num_even and number in range(2, 6): 
    print("Not Weird")

elif num_even and number in range(6, 21): 
    print("Weird") 

elif num_even and number > 20:
    print("Not Weird")

else:
    print('bug detected')'''

# one more from hacker rank
'''
if __name__ == '__main__':
    a = int(input())
    b = int(input())
    
    sum_number = a + b
    sub_number = a - b
    prod_number = a * b
    
print(sum_number)
print(sub_number)
print(prod_number)
'''

# Sets in Python:

# numbers = [1,2,3,4,5,6]
# unique_numbers = set(numbers)

# print(numbers)
# print(unique_numbers)

# Modules in Python:

import convertor
# All rounded convertor module
import math
#  Math operations module


# Packages in Python:

