# Netler - Социальная сеть | Очная смена ITBootCamp 2023

## Состав Команды
|Role           |Name                       |
|---------------|---------------------------|
|Менеджер        |Кривошапкин Виталий        |
|Дизайнер  |Дыдырова Татьяна           |
|Дизайнер  |Таркова Ангелина           |
|Фронтенд разработчик | Коротких Алексей |
|Бэкенд разработчик| Габышев Николай   |

## Технологии:
### Языки
- JavaScript
- JSX
- HTML
- CSS
- Python 3.10.11
### Фреймворки
- Django
#### Библиотека Frontend
- ReactJS
#### Билиотеки Python
- Rest Framework
- django-taggit
### База данных
- PostgreSQL
### Пакеты Node.js
- react
- reactDOM
- react-router

## 
## Установка Frontend части:
Напишите в терминале
- `cd Frontend` (Переход в директорию)
- `npm install` или `npm i` (Установка зависимостей)
- `npm start` (Запуск сервера)
## Установка Backend части:
1. Скачайте и установите [python 3.10](https://www.python.org/downloads/release/python-31011/). Во время установки вам будет предложено добавить python в PATH, согласитесь.
2. Скопируйте репозиторий (Если уже не сделали этого)
```
git clone https://github.com/JustAlexeyDev/Netler.git
```
4. Переместитесь в папку *backend*:
```
cd backend
```
5. Пропишите следующие команды
```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
