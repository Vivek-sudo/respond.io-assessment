# Dockerfile

# base image forNode.js application
FROM node:14

#environment variables with default values
ENV DB_HOST=""
ENV DB_USERNAME=""
ENV DB_PASSWORD="password"
ENV DB_NAME=""
ENV DB_DIALECT=""
ENV REDIS_HOST=""
ENV REDIS_PORT=""
ENV REDIS_PASSWORD=""
ENV JWT_SECRET=""
ENV MYSQL_ROOT_PASSWORD=""

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
