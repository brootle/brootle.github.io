
########### print all command line arguments

import sys

for i in range(len(sys.argv)):
    print(sys.argv[i])

########## end of printing all arguments


########### get value from command line arguments

# import sys

# if len(sys.argv) == 2:
#     print("hello, {}".format(sys.argv[1]))
# else:
#     print("hello, world")

########### end of command line arguments

########### print all char codes

# for i in range(65,65+26):
#     print("{} is {}".format(chr(i),i))

########### end of char codes

########### cough 3 times

# def main():
#     cough(3)

# def cough(n):
#     for i in range(n):
#         print("cough")

# if __name__ == "__main__":
#     main()

########### end of cough

########### get positive number
# import cs50

# def main():
#     i = get_positive_int()
#     print("{} is a positive integer".format(i))

# def get_positive_int():
#     while True:
#         print("n is ", end = "")
#         n = cs50.get_int()
#         if n >= 1:
#             break
#     return n

# if __name__ == "__main__":
#     main()

########### end of get positive number


########### temp converter
# import cs50

# f = cs50.get_float()
# c = 5 / 9 * (f - 32)
# print("{:.1f}".format(c))
##### end of temp converter


#print("{}".format(1/10))
# print("{:.55f}".format(1/10))
# print(1/10,end="") # this will post line without \n

# import cs50

# s = cs50.get_string()

# for i in range(3):
#     print("hello, {}".format(s))

# s = input("name: ")
# print("hello, {}".format(s))