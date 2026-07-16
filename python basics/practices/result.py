# 
def calculate_result(mark1, mark2, mark3):
    total_marks = mark1 + mark2 + mark3
    percentage = (total_marks / 300) * 100  
    return total_marks, percentage

# 
def student_report(name, roll_number, department, total_marks, percentage, grade, status):
    print("\n" + "="*30)
    print("      STUDENT REPORT CARD      ")
    print("="*30)
    print(f"Name:        {name}")
    print(f"Roll Number: {roll_number}")
    print(f"Department:  {department}")
    print(f"Total Marks: {total_marks}")
    print(f"Percentage:  {percentage:.2f}%")
    print(f"Grade:       {grade}")
    print(f"Status:      {status}")
    print("="*30)


# Task 1 - Receive Input
print("--- Enter Student Details ---")
f_name = input("First Name: ")
l_name = input("Last Name: ")
roll_no_input = input("Roll Number: ")
dept_input = input("Department: ")
sub1_input = input("Subject 1 Marks: ")
sub2_input = input("Subject 2 Marks: ")
sub3_input = input("Subject 3 Marks: ")

# Task 3 - String Methods
# Removing extra spaces, Title Casing the full name, Uppercasing department
full_name = f"{f_name.strip()} {l_name.strip()}".title()
department = dept_input.strip().upper()

# Task 2 - Type Conversion
# Converting string inputs to integers
roll_number = int(roll_no_input)
sub1 = int(sub1_input)
sub2 = int(sub2_input)
sub3 = int(sub3_input)

# Task 4 & 7 - Arithmetic Operations (Calling Function)
total, percent = calculate_result(sub1, sub2, sub3)

# Task 5 - If Statements + Logical Operators
if percent >= 80:
    grade = 'A'
elif percent >= 70:
    grade = 'B'
elif percent >= 60:
    grade = 'C'
elif percent >= 50:
    grade = 'D'
else:
    grade = 'Fail'

# Checking Promotion Status (Assuming passing criteria is 50%)
if percent >= 50:
    status = "Promoted"
else:
    status = "Not Promoted"

# Task 8 - Keyword Arguments
print("\n[Calling Function using Positional Arguments]")
student_report(full_name, roll_number, department, total, percent, grade, status)

print("\n[Calling Function using Keyword Arguments]")
student_report(status=status, percentage=percent, roll_number=roll_number, name=full_name, department=department, grade=grade, total_marks=total)

subjects = ["Programming", "Mathematics", "English"]
print("\n--- Subjects List ---")
for subject in subjects:
    print(f"- {subject}")

student_dict = {
    "Name": full_name,
    "Roll Number": roll_number,
    "Department": department,
    "Grade": grade
}

print("\n--- Student Dictionary Values ---")

for key, value in student_dict.items():
    print(f"{key}: {value}")