FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY build /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]