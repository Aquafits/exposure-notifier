FROM nginx:1.19.1-alpine
COPY ./dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY docker-entrypoint.sh /
# RUN chmod +x docker-entrypoint.sh 
EXPOSE 80

# ENTRYPOINT ["/docker-entrypoint.sh"]