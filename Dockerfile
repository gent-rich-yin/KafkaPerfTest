FROM nginxinc/nginx-unprivileged

WORKDIR /usr/share/nginx/html

RUN curl -o kafka-perf-test.gz https://storage.googleapis.com/code-richardyin20230422/kafka-perf-test.gz

RUN tar xzf kafka-perf-test.gz
