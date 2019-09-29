FROM nginx:1.17.3-alpine
COPY nginx.conf /etc/nginx
COPY /dist /usr/src/app
EXPOSE 8080