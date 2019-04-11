FROM node:10
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
