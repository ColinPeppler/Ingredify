import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline
import re
import time
from datetime import datetime
import matplotlib.dates as mdates
import matplotlib.ticker as ticker
from urllib.request import urlopen
from bs4 import BeautifulSoup

url = "http://www.safecosmetics.org/get-the-facts/chem-of-concern/"
html = urlopen(url)
soup = BeautifulSoup(html, 'html')

pages = [i.text for i in soup.find_all('a') if 'community/tutorials?page=' in str(i)]
lastpage = pages[-1]

description=[]
upvote=[]
author=[]
publishdate=[]
title=[]

description.append([i.text for i in soup.find_all(
    class_='jsx-379356511 blocText description')])
upvote.append([i.text for i in soup.find_all(class_='jsx-4192737526 voted')])
author.append([i.text for i in soup.find_all(class_='jsx-566588255 name')])
publishdate.append(
    [i.text for i in soup.find_all(class_='jsx-566588255 date')])
title.append([i.text for i in soup.find_all(class_='jsx-379356511 blue')])
time.sleep(3)
