from bs4 import BeautifulSoup
import requests


def tag_search_scrape(tag):
    source = requests.get(f"https://www.medium.com/tag/{tag}").text
    soup = BeautifulSoup(source, "lxml")

    data = []
    id = 1
    iter = 0

    for content, author_con, part in zip(soup.findAll("div", class_="section-content"), soup.findAll("div", class_="postMetaInline-authorLockup"), soup.findAll("div", class_="postArticle-readMore"),):
        if iter == 3:
            break
        try:
            title = content.find("h3", class_="graf").text
        except Exception:
            title = content.find("h2", class_="graf").text
        try:
            img = content.find("img")["src"]

        except Exception:
            img = None
        link = part.a["href"]
        author = author_con.find("a", class_="ds-link").text
        read_time = author_con.find("span", class_="readingTime")["title"]

        data.append(
            {"id": id, "title": title, "img": img, "link": link, "author": author, "read_time": read_time,}
        )

        id += 1

    return data


def search_scrape(search, num):
    source = requests.get(f"https://www.medium.com/search?q={search}").text
    soup = BeautifulSoup(source, "lxml")

    data = []
    id = 1

    for content, author_con, part in zip(soup.findAll("div", class_="section-content"), soup.findAll("div", class_="postMetaInline-authorLockup"), soup.findAll("div", class_="postArticle-readMore"),):
        if id == (int(num) + 1):
            break
        try:
            title = content.find("h3", class_="graf").text
        except Exception:
            title = content.find("h2", class_="graf").text
        try:
            img = content.find("img")["src"]

        except Exception:
            img = None
        link = part.a["href"]
        author = author_con.find("a", class_="ds-link").text
        read_time = author_con.find("span", class_="readingTime")["title"]

        data.append(
            {"id": id, "title": title, "img": img, "link": link, "author": author, "read_time": read_time,}
        )
        id += 1

    return data
