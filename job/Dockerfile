FROM python:3.8
WORKDIR /job/venv/bin/activate
RUN python3 -m venv /opt/venv
COPY . .
RUN /opt/venv/bin/pip install -r requirements.txt
EXPOSE 4000
CMD ["/opt/venv/bin/python", "./app.py"]
