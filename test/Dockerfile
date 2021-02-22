FROM python:3.7-slim
RUN pip install flask
WORKDIR /test/app
COPY app.py /test/app/app.py
ENTRYPOINT ["python"]
CMD ["/test/app/app.py"]
