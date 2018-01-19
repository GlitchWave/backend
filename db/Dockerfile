FROM postgres:9.5
ENV POSTGRES_USER dockerperson
ENV POSTGRES_PASSWORD docker
RUN echo "host all all 0.0.0.0/0 trust" >> /etc/postgresql/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/postgresql.conf
EXPOSE 5432
COPY tasks.sql /docker-entrypoint-initdb.d/