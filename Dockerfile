FROM nginxinc/nginx-unprivileged

USER root

WORKDIR /usr/share/nginx/html

RUN curl -o kafka-perf-test.gz https://storage.googleapis.com/code-richardyin20230422/kafka-perf-test.gz

RUN tar xzf kafka-perf-test.gz

ENTRYPOINT ["/docker-entrypoint.sh"]

USER 101

CMD ["nginx" "-g" "daemon off;"]
