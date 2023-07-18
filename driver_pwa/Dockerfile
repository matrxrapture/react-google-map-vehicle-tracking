FROM node:16.15.1 as build

WORKDIR /app

# COPY package*.json .
COPY . .

RUN pwd
RUN ls
# RUN npm run build


FROM nginx:1.19
COPY ngnix.conf /etc/nginx/nginx.conf
COPY --from=build /app /usr/share/nginx/html