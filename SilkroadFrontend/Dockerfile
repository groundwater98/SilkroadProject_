FROM node:18.18.2-slim
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
ARG API_URL
ENV REACT_APP_API_URL=${API_URL}
EXPOSE 3000
CMD ["yarn", "start"]