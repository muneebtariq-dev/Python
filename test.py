# house_price = 1000000 
# good_credit = False

# if good_credit :
#     down_payment = 0.1 * house_price
# else:
#     down_payment = 0.2 * house_price

# print(f' Down-Payment is ${down_payment}')


# high_income = False
# criminal_record = False

# if high_income and not criminal_record:
#     print('Eligable for loan')
# else:
#     print('Not eligable for loan')


# temperature = 1

# if temperature >= 30:
#     print('Hot')
# elif temperature <= 10:
#     print('Cold')
# else:
#     print("It's not Hot nor Cold.")        


# name = input('Enter your name: ')

# if len(name) <= 3:
#     print('Name shall be at least 3 characters long.')
# elif len(name) >= 50:
#     print('Name can be maximum 50 characters long')
# else:
#     print('Name looks good')

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
