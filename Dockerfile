FROM nginxinc/nginx-unprivileged

USER nginx

WORKDIR /var/share/nginx/html

ADD https://storage.googleapis.com/code-richardyin20230422/kafka-perf-test.gz .

RUN tar xzf kafka-perf-test.gz
