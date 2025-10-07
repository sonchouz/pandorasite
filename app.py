from flask import Flask, send_from_directory, redirect
from slugify import slugify
import os

app = Flask(__name__)

# Определяем папку сайта
site_dir = os.path.join(os.path.dirname(__file__), "public")

@app.route("/")
def index():
    return send_from_directory(site_dir, "index.html")

@app.route("/<path:page>")
def page(page):
    # убираем лишние слеши в конце и делаем slug
    clean_name = slugify(page.strip("/"))
    filename = f"{clean_name}.html"
    filepath = os.path.join(site_dir, filename)

    if os.path.exists(filepath):
        return send_from_directory(site_dir, filename)
    # если в конце был "/", пробуем без него
    elif os.path.exists(os.path.join(site_dir, clean_name, "index.html")):
        return send_from_directory(os.path.join(site_dir, clean_name), "index.html")
    else:
        return "Страница не найдена 😢", 404

if __name__ == "__main__":
    print(f"Сервер запущен. Папка сайта: {site_dir}")
    app.run(debug=True)
