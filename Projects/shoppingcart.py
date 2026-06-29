# 1. Setup the store inventory (Tuple) and an empty shopping cart (List)
inventory = ("apple", "banana", "milk")
cart = []

print("Welcome to the Mini-Market!")
print(f"Today we have: {inventory[0]}, {inventory[1]}, and {inventory[2]}.")
print("-" * 30)

while True:
    print("\n--- MENU ---")
    print("1. Add an item")
    print("2. View cart")
    print("3. Checkout and Exit")
    
    # Receive user input for the menu choice
    choice = input("Please choose an option (1-3): ")
    
    if choice == "1":
        item_to_add = input("What item would you like to add? ").lower()
        
        # Check if the item is in our inventory tuple
        if item_to_add in inventory:
            cart.append(item_to_add)
            print(f"🛒 Added {item_to_add} to your cart!")
        else:
            print("❌ Sorry, we don't sell that item here.")
            
    elif choice == "2":
        if len(cart) == 0:
            print("Your cart is currently empty.")
        else:
            print("\nItems in your cart:")
            
            for item in cart:
                print(f"- {item}")
                
    elif choice == "3":
        print("\n--- Checking Out ---")
        if len(cart) == 0:
            print("You didn't buy anything today! Have a nice day.")
        else:
            print(f"You purchased a total of {len(cart)} item(s).")
            print("Your final items:")
            for item in cart:
                print(f"- {item}")
                
            # Bonus item count logic
            print("\nReceipt Breakdown:")
            for product in inventory:
                count = cart.count(product)
                if count > 0:
                    print(f"{product.capitalize()}: {count}")
                    
        print("\nThank you for shopping with us! Goodbye.")
        break  

    else:
        print("⚠️ Invalid choice. Please enter 1, 2, or 3.")
