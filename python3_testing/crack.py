    # // 2016 passwords
    # // caesar:50zPJlUFIYY0o - 13 - Time spent: 0:00:00.049747 
    # // eli:50MxVjGD7EfY6 - yale - Time spent: 0:00:18.639414
    # // hdan:50z2Htq2DN2qs - boola - Time spent: 0:04:31.237291
    # // andi:HALRCq0IBXEPM - Berkely
    # // skroob:50Bpa7n/23iug - 12345 - 0 seconds if checking for numbers only
    # // zamyla:HAYRs6vZAb4wo - password - program killed after 4 min 25 sec even using small letters only
    # // jason:50CMVwEqJXRUY - 
    # // john:50TGdEyijNDNY -
    # // levatich:50QykIulIPuKI -
    # // rob:50q.zrL5e0Sak -    
    
    # // 2017 passwords 
    # // 50.jPgLzVirkc - hi
    # // 50YHuxoCN9Jkc - JH
    # // 50QvlJWn2qJGE - NOPE
    # // 50CPlMDLT06yY - ha
    # // 50WUNAFdX/yjA - Yale
    # // 50fkUxYHbnXGw - rolf
    # // 50C6B0oz0HWzo - FTW
    # // 50nq4RV/NVU0I - ABC
    # // 50vtwu4ujL.Dk - haha
    # // 50i2t3sOSAZtk - lol

import datetime
import sys
import crypt
from hmac import compare_digest as compare_hash

symbols = "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
counter = [-1,-1,-1,-1,-1,-1,-1,-1]
counterPosition = 0

def main():

    # If the use didn't provide 1 KEY we stop 
    if len(sys.argv) != 2:
        print("You need to provided encrypted password!")
        return 1
    else:
        salt = sys.argv[1][:2]
        startTime = datetime.datetime.now()
        while True:
            # increment counter
            incrementCounter(counterPosition)
            if sys.argv[1] == crypt.crypt(convertCounterToPass(), salt):
                print("User password cracked: {}".format(convertCounterToPass()))
                print("Time spent: {}".format(datetime.datetime.now() - startTime))
                return 0
    

def convertCounterToPass():

    password = ""
    
    for index in counter:
        if index > -1:
            password+=symbols[index]
    
    return password


    
def incrementCounter(currentCounterPosition):

    if counter[currentCounterPosition] < 0:
        counter[currentCounterPosition] = 0
    
    counter[currentCounterPosition] = counter[currentCounterPosition] + 1
    
    if counter[currentCounterPosition] > (len(symbols)-1):
       counter[currentCounterPosition] = 1
       incrementCounter(currentCounterPosition + 1)
          

if __name__ == "__main__":
    main()
            