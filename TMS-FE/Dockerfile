FROM node:18-alpine AS development

WORKDIR /node

COPY package.json ./

ARG NODE_ENV=developement
ENV NODE_ENV=${NODE_ENV}

ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}

ARG SERVER_PORT
ENV VITE_SERVER_PORT=${SERVER_PORT}
ARG CLIENT_HOST
ENV VITE_HOST=${CLIENT_HOST}

# RUN apk add curl
RUN npm install

# Change the workdir to a deeper level to avoid node_modules issues
COPY vite.config.ts .

WORKDIR /node/app

# We do not build the application in development mode, we will use docker-compose volume
# to mount the dev machine to the container. It will allows the development to change the
# code without restarting the container.

CMD ["npm", "run", "start"]