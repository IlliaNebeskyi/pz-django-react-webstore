FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY ./requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

ENV DJANGO_SETTINGS_MODULE=app.settings

COPY . /code/

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "app.asgi:application"]