CREATE DATABASE "authorization";
CREATE USER "maxilog-authorization-user" WITH PASSWORD 'maxilog-authorization-password';
GRANT ALL PRIVILEGES ON DATABASE "authorization" TO "maxilog-authorization-user";