FROM node:12.18.3

WORKDIR /app

CMD ["npm", "run", "test"]
# CMD ["npm", "run", "build"]