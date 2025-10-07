from flask import Flask, send_from_directory
from slugify import slugify
import os

app = Flask(__name__)
site_dir = os.path.join(os.path.dirname(__file__), "public")

# Соберём все HTML-файлы и создадим slug-версии
page_map = {}
for filename in os.listdir(site_dir):
    if filename.endswith(".html") and filename != "index.html":
        name = os.path.splitext(filename)[0]
        page_map[slugify(name)] = filename

@app.route("/")
def index():
    return send_from_directory(site_dir, "index.html")

@app.route("/<slug>")
def serve_page(slug):
    if slug in page_map:
        return send_from_directory(site_dir, page_map[slug])
    return "Страница не найдена", 404

if __name__ == "__main__":
    print("Сгенерированные человекочитаемые URL:")
    for url, file in page_map.items():
        print(f"/{url} → {file}")
    app.run(debug=True)
