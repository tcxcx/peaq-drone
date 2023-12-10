FROM node:18

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of your application's code
COPY . .

# Build the project
RUN yarn build

EXPOSE 3000

ENV NODE_ENV production

CMD ["yarn", "start"]