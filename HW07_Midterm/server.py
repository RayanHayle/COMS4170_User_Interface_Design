#Rayan Hayle RAH2236
from flask import Flask, request, render_template, redirect, url_for, flash
import requests
from bs4 import BeautifulSoup


# Initialize the Flask application
server = Flask(__name__)
server.secret_key = 'your_secret_key'  #to add new item


# 1. Fetch the books from OpenLibrary API
def fetch_books(query=None):
    if query:
        url = f"https://openlibrary.org/search.json?q={query}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data["docs"] if "docs" in data else []
    return []

#2. extract the data : inspected the website  div,key,class and used it to sparse the data -->more__content,reviews__label
def fetch_book_details(book_url):
    response = requests.get(book_url) #Makes an HTTP GET request
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        title = soup.find('h1', class_='work-title', itemprop='name').get_text(strip=True) #Extracts the book title using the h1 tag with the class work-title.
        author_elements = soup.find_all('a', itemprop='author')
        authors = [author.get_text(strip=True) for author in author_elements if author]
        author = authors[0] if authors else "Unknown Author"

        rating_element = soup.find('span', itemprop='ratingValue')
        rating = rating_element.get_text(strip=True) if rating_element else 'Not rated yet.'

        summary_element = soup.find('div', class_='read-more__content')
        summary = summary_element.get_text(separator="\n", strip=True) if summary_element else 'No summary available.'

        genre_elements = soup.find_all('span', class_='reviews__label')
        genres = [g.get_text(strip=True) for g in genre_elements if 'Genres' in g.get_text()]
        genre_text = ', '.join(genres) if genres else 'No genres available.'

        similar_books = fetch_books(f"subject:{genres[0]}")[:5] if genres else []
        author_books = fetch_books(f"author:{author}")
        more_books_by_author = [
            {
                "title": b["title"],
                "author": b["author_name"][0] if 'author_name' in b else 'N/A',
                "url": f"https://openlibrary.org{b['key']}",
                "cover_image": f"https://covers.openlibrary.org/b/id/{b['cover_i']}-M.jpg" if "cover_i" in b else None
            }
            for b in author_books if 'cover_i' in b
        ][:5]

        return {
            "title": title,
            "author": author,
            "rating": rating,
            "summary": summary,
            "genres": genre_text,
            "similar_books": similar_books,
            "more_books_by_author": more_books_by_author
        }
    return None

@server.route("/add", methods=["GET", "POST"])
#the submit data section  
def add_item():
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        author = request.form.get("author", "").strip()
        rating = request.form.get("rating", "").strip()
        summary = request.form.get("summary", "").strip()

        errors = []
        if not title:
            errors.append("Title is required.")
        if not author:
            errors.append("Author is required.")
        if not rating.isnumeric():
            errors.append("Rating must be a number.")
        if not summary:
            errors.append("Summary is required.")

        if errors:
            return render_template("items/add.html", errors=errors)

        # save database
        flash("New item successfully created.", "success")
        return redirect(url_for('home')) 

    return render_template("items/add.html")

@server.route("/edit/<int:item_id>", methods=["GET", "POST"])
def edit_item(item_id):
    # fetch the existing item data from your database

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        author = request.form.get("author", "").strip()
        rating = request.form.get("rating", "").strip()
        summary = request.form.get("summary", "").strip()

        errors = []
        if not title:
            errors.append("Title is required.")
        if not author:
            errors.append("Author is required.")
        if not rating.isnumeric():
            errors.append("Rating must be a number.")
        if not summary:
            errors.append("Summary is required.")

        if errors:
            return render_template("items/edit.html", errors=errors)

        #  the updated data back to your database
        flash("Item successfully updated.", "success")
        return redirect(url_for('home')) 
    item = {'title': "Sample Title", 'author': "Sample Author", 'rating': "5", 'summary': "Sample Summary"}  # Placeholder for item data
    return render_template("items/edit.html", item=item)


@server.route("/", methods=["GET"])
def home():
    random_books = fetch_books("fiction")[:6]
    return render_template("index.html", books=random_books)

@server.route("/search", methods=["GET", "POST"])
def search_books():
    query = request.args.get('query', '')
    if query:
        books = fetch_books(query)
    else:
        books = []
    message = "No matches found." if not books else f"{len(books)} results found."
    return render_template("search.html", books=books, query=query, message=message)

@server.route("/book/<key>")
def view_book(key):
    book_url = f"https://openlibrary.org/works/{key}"
    book_details = fetch_book_details(book_url)
    if book_details:
        return render_template("book.html",
                               title=book_details['title'],
                               author=book_details['author'],
                               rating=book_details['rating'],
                               summary=book_details['summary'],
                               genres=book_details['genres'],
                               similar_books=book_details['similar_books'],
                               more_books_by_author=book_details['more_books_by_author'])
    return render_template("error.html")

if __name__ == "__main__":
    server.run(port=5001, debug=True)