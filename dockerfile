FROM node:latest
RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app
COPY dist  /usr/src/app/dist
RUN npm install http-server -g
CMD ["http-server", "dist/tecloapp"].
EXPOSE 4200
