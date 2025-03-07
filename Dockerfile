FROM node:alpine

#choose the working directory as app inside the container
WORKDIR /app

#copy the package.json to working directory
COPY package*.json ./

RUN npm install

#copy everything from this current directory to container working directory
COPY . .

#inside container where the app will run
EXPOSE 5173

CMD ["npm", "run", "dev"]