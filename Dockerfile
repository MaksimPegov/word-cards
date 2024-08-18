# Multi-stage build

FROM node:lts-alpine as build

WORKDIR /word-cards

# Assuming you've already copied package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

RUN yarn build


FROM nginx:latest as prod

COPY --from=build /word-cards/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]