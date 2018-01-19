create database tasks;
\c tasks

create table todo (
    task text,
    completed boolean
);

insert into todo values ('make some', false),
                        ('another staff', false);

GRANT ALL PRIVILEGES ON DATABASE tasks TO dockerperson;