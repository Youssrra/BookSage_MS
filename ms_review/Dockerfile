FROM node:18
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
ENV DATABASE_URL=mongodb+srv://yousra:yousra@cluster0.nxwu1do.mongodb.net/?retryWrites=true&w=majority
CMD ["node", "app.js"]