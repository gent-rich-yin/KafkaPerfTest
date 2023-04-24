FROM nginxinc/nginx-unprivileged

WORKDIR /var/share/nginx/html

ADD https://storage.googleapis.com/code-richardyin20230422/kafka-perf-test.gz .

RUN chown nginx:nginx kafka-perf-test.gz

RUN chmod 644 kafka-perf-test.gz

RUN tar xzf kafka-perf-test.gz

RUN chown nginx:nginx *

RUN chmod 644 *
