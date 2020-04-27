from bs4 import BeautifulSoup
import requests


def tag_search(tag):
    source = requests.get(f"https://www.medium.com/tag/{tag}").text
    soup = BeautifulSoup(source, "lxml")
    link = []
    for part in soup.findAll("div", class_="postArticle-readMore"):
        link.append(part.a["href"])
    return link


def search(search, num):
    source = requests.get(f"https://www.medium.com/search?q={search}").text
    soup = BeautifulSoup(source, "lxml")
    i = 0
    link = []
    for part in soup.findAll("div", class_="postArticle-readMore"):
        if i == num:  # Number of articles that need to be fetched
            break
        link.append(part.a["href"])
        # Post to channel
        i = i + 1
    return link
