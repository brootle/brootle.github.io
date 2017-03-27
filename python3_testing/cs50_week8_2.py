########### working with classes imported from modules ##################
########### and writing data to a file ##################################

import cs50
import csv
from student import Student

students = []

for i in range(2):
    print("name: ", end="")
    name = cs50.get_string()

    print("dorm: ", end="")
    dorm = cs50.get_string()    

    students.append(Student(name,dorm))

for student in students:
    print("{} lives in {}".format(student.name,student.dorm))

file = open("students.csv","w")
writer = csv.writer(file)
for student in students:
    writer.writerow((student.name,student.dorm))
file.close()

########### end of example ##############################################


########### make function that returns multiple values

# def main():
#     x,y,z = returnSomeData(1,2,3)
#     print("x={}".format(x))
#     print("y={}".format(y))
#     print("z={}".format(z))

# def returnSomeData(a,b,c):
#     return (a*2, b*3, c*4)

# if __name__ == "__main__":
#     main()    

########### end of example


########### swapping variables

# x = 3
# y = 0

# print("x={}".format(x))
# print("y={}".format(y))

# x, y = y, x

# print("x={}".format(x))
#print("y={}".format(y))

########### end example


########### compare strings

# import cs50

# print("s: ", end="")
# s = cs50.get_string()

# print("t: ", end="")
# t = cs50.get_string()

# if s != None and t != None:
#     if s == t:
#         print("same")
#     else:
#         print("different")

########### end of example


########### check for number of command-line arguments

# import cs50
# import sys

# if len(sys.argv) != 2:
#     print("missing command-line argument")
#     exit(1)

# print("hello, {}".format(sys.argv[1]))
# exit(0)

# run in command line: echo $? 
# that will show exit code

########### end of example

########### print all letters of command line arguments ####

# import sys

# for s in sys.argv:
#     for c in s:
#         print(c)
#     print()

########### end of example #################################

######## len vs strlen ###########

# import cs50

# s = cs50.get_string()
# print(len(s))

########### end of example ############