import re

import string

from dictionary import Dictionary

# make variable of Dictionary object
dic = Dictionary()
# load dictionay
dic.load("large")

# itterate over words in text file encoding='latin-1'

counter = 0

#pattern = re.compile("^[a-z']*$", re.IGNORECASE)
pattern = re.compile("^[^0-9-&]*$", re.IGNORECASE) # this will ignore numbers and words with numbers
translator = str.maketrans('', '', string.punctuation)

# print("Swap vowels for numbers.".translate(str.maketrans('aeiou', '12345')))
wordsCounter = 0
#sentence=re.sub(ur"[^\P{P}'|-]+",'',sentence)
# austinpowers.txt
with open('austinpowers.txt','r', encoding='latin-1') as f:
    for line in f:
        for word in line.split():
            wordsCounter+=1
            # remove all punctuation in the word
            # word = word.translate(translator)
            if pattern.match(word) != None:
                # remove punctuation . ? ! : ( )
                #word = word.translate(translator)
                word = word.replace(".", "").replace(",", "").replace("!", "").replace("?", "").replace("(", "").replace(")", "").replace(":", "").replace("\"", "").replace(";", "")
                if dic.check(word) == False:
                    print(word)  
                    counter += 1    
                    # if counter == 100:
                    #     break
print()
print("WORDS MISSPELLED:     ",counter)     
print("WORDS IN DICTIONARY:  ",dic.size())      
print("WORDS IN TEXT:        ",wordsCounter)               

# WORDS MISSPELLED:     644
# WORDS IN DICTIONARY:  143091
# WORDS IN TEXT:        19190

# print(counter)

# print("Swap vowels for numbers.".translate(str.maketrans('aeiou', '     ')))

# print("it is (fdf) icy".replace("(", ""))