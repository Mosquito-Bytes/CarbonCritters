FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY ./packages/app/dist/* ./
ENTRYPOINT ["nginx", "-g", "daemon off;"]
