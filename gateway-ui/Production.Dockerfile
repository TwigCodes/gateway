FROM node:11.1.0 as npm_builder
# Set the entrypoint as bin bash incase we want to inspect the container
ENTRYPOINT ["/bin/bash"]
# Manually copy the package.json
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
# Set the work directory to where we copied our source files
WORKDIR /usr/src/app
# Install all of our dependencies
RUN npm install

FROM npm_builder as builder
# Copy the app excluding everything in the .dockerignore
COPY . /usr/src/app
# Put node_modules into the path, this will purely be used for accessing the angular cli
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Set the work directory to where we copied our source files
WORKDIR /usr/src/app
# Build our distributable
RUN npm run build:prod

FROM nginx:1.13.8-alpine

## Copy our default nginx config
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
# Copy the dist folder from builder
COPY --from=builder /usr/src/app/dist/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
