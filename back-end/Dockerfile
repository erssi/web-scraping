FROM node:12
WORKDIR /back-end
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]