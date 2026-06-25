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


name = input('Enter your name: ')

if len(name) <= 3:
    print('Name shall be at least 3 characters long.')
elif len(name) >= 50:
    print('Name can be maximum 50 characters long')
else:
    print('Name looks good')