FROM node:18.12.1 as node
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=node /app/dist/shipconsole-ui /usr/share/nginx/html