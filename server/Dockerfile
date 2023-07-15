FROM python:3.8

WORKDIR /app

COPY . ./
# Install any needed packages specified in requirements.txt
ENV PYTHONUNBUFFERED True
RUN chmod 444 app.py
RUN chmod 444 requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN curl -sSL https://sdk.cloud.google.com | bash

RUN gcloud auth configure-docker
ENV PATH $PATH:/root/google-cloud-sdk/bin

CMD exec gunicorn --workers 1 --threads 8 --timeout 3600 app:app