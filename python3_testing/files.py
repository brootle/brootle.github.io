try:
    newFile = open("testing.txt","w")
    newFile.write("hello world!")
finally:
    newFile.close()

try:
    readingFile = open("testing.txt","r")
    content = readingFile.read()
    print(content)
finally:
    readingFile.close()

# file will always be closed even if there was some error
with open("testing.txt") as f:
   print(f.read())    

# open file in binary mode
# open("test.txt", "wb")
