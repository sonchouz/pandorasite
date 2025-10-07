from flask import Flask, send_from_directory, redirect, url_for, Response
from slugify import slugify
import os

# Создаём приложение Flask
app = Flask(
    __name__,
    static_folder="public",      # где искать статические файлы
    static_url_path=""           # чтобы Flask их видел как /scripts/, /styles/, /images/
)

# Папка с HTML-страницами
site_dir = os.path.join(os.path.dirname(__file__), "public")

# Словарь slug → имя файла
page_map = {}

# Собираем карту сайта
for filename in os.listdir(site_dir):
    if filename.endswith(".html"):
        name = os.path.splitext(filename)[0]
        if name != "index":  # исключаем index.html
            slug = slugify(name)
            page_map[slug] = filename

# Главная страница
@app.route("/")
def index():
    return send_from_directory(site_dir, "index.html")

# Человекочитаемый URL (например /coaches)
@app.route("/<slug>")
def serve_page(slug):
    if slug in page_map:
        return send_from_directory(site_dir, page_map[slug])
    return "Страница не найдена 😢", 404

# Редирект с .html на “чистый” адрес
@app.route("/<slug>.html")
def redirect_html(slug):
    if slug in page_map:
        return redirect(url_for("serve_page", slug=slug), code=301)
    return "Страница не найдена 😢", 404



@app.route("/<path:filename>")
def serve_static(filename):
    file_path = os.path.join(site_dir, filename)
    if os.path.exists(file_path):
        return send_from_directory(site_dir, filename)
    return "Файл не найден", 404


if __name__ == "__main__":
    print("✅ Сгенерированные человекочитаемые URL:")
    for url, file in page_map.items():
        print(f"/{url} → {file}")
    print(f"\n📂 Папка сайта: {site_dir}\n")
    app.run(debug=True)
