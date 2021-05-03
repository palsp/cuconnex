FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN apt-get -y update && apt-get install -y libzbar-dev
RUN pip3 install -r requirements.txt
COPY . .

CMD [ "python3", "get-recommendation.py"]
