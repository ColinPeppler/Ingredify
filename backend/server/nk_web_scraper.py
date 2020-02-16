import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import re

from urllib.request import urlopen
from bs4 import BeautifulSoup

import csv


url = "https://www.healthline.com/health/carcinogenic-ingredients-your-personal-care-products#common-chemicals"
html = urlopen(url)

soup = BeautifulSoup(html, 'lxml')

all_chemicals = str(soup.find_all("h3"))
cleantext = BeautifulSoup(all_chemicals, "lxml").get_text()
output = re.split("[0-9]+\.", cleantext)
finalOutput = {}


# Cleaning data for chemicals

index = 0
for x in output:
    temp = re.sub("[\(\[].*?[\)\]]", "", x)
    temp = re.sub('\[', '', temp)
    temp = re.sub('\]', '', temp)
    temp = re.sub('and', ';', temp)
    temp = re.sub(',', '', temp)
    temp = re.sub(' +', ' ', temp)

    finalOutput[index] = [temp]
    index = index + 1


finalOutput.pop(0, None)  
finalOutput.pop(12, None)    

stuff = str(soup.find_all("li"))
s = BeautifulSoup(stuff, "lxml").get_text()
output = re.split("in: ", s)



# Cleaning data for effects from cosmetic chemicals

index = 1
for s in output:
    start = 'concerns: '
    end = 'found'
    temp = s[s.find(start)+len(start):s.rfind(end)]
    temp = re.sub(',', ';', temp)
    temp = temp[:-2]


    finalOutput[index].append(temp)
    index = index + 1
    if index == 12:
        break


# Creating a CSV from scraped data

with open('cosmetics.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Chemical", "Effects"])

    for x in finalOutput:
        writer.writerow([finalOutput[x][0],finalOutput[x][1]])