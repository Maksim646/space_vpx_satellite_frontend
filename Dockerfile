FROM nginx:latest

# Удаляем стандартный файл default.conf
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш файл конфигурации
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем файлы веб-приложения
COPY ./src/pages/login.html /usr/share/nginx/html/login.html
COPY ./src/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]