FROM node:20 AS base

# This will come from Compose
ARG JWT_SECRET_ENV=""
ARG MONGO_HOST_ENV="mongo"
ARG ORIGIN_ENV="http://localhost:3000"

# Install & cache layer of dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS development
ARG ORIGIN_ENV="http://localhost:5173"
ENV ORIGIN=${ORIGIN_ENV}
CMD npm run dev -- --host


######################
##  LOCAL TESTING   ##
######################
# FROM base AS testing
# ARG ORIGIN_ENV="http://localhost:5173"
# ENV ORIGIN=${ORIGIN_ENV}

# RUN apt-get update && apt-get install -y netcat-openbsd
# CMD stty columns 168 && ./wait-for.sh tester_mongo 27017 npm run test


######################
##  CI/CD TESTING   ##
######################
# FROM base AS testing-ci
# ARG ARTIFACTS_DIR="/tmp/chilotiene_artifacts"
# ARG ORIGIN_ENV="http://localhost:5173"
# ENV ORIGIN=${ORIGIN_ENV}

# # Source code build
# COPY . /app
# RUN rm /app/.env.development || true
# RUN rm /app/.env.test || true

# WORKDIR /app


# RUN apt-get update && apt-get install -y netcat-openbsd
# RUN mkdir -p /app/data
# RUN JWT_SECRET=${JWT_SECRET_ENV} MONGO_HOST=${MONGO_HOST_ENV} HOST_DATA_PATH=${HOST_DATA_PATH} CONTAINER_DATA_VOLUME=${CONTAINER_DATA_VOLUME} node ./configurator.js test
# RUN JWT_SECRET=${JWT_SECRET_ENV} MONGO_HOST=${MONGO_HOST_ENV} HOST_DATA_PATH=${HOST_DATA_PATH} CONTAINER_DATA_VOLUME=${CONTAINER_DATA_VOLUME} node ./configurator.js development
# CMD stty columns 168 && ./wait-for.sh tester_mongo 27017 npm run test:coverage; (mv ./junit-report.xml /app/artifacts/junit-report.xml; mv ./coverage /app/artifacts/coverage); ((ls /app) && (ls /app/artifacts) && (ls /app/artifacts/coverage) && (ls /app/artifacts/junit-report.xml))


######################
##  LOCAL COVERAGE  ##
######################
# FROM base AS testing-coverage
# ARG ORIGIN_ENV="http://localhost:5173"
# ENV ORIGIN=${ORIGIN_ENV}

# RUN apt-get update && apt-get install -y netcat-openbsd
# CMD stty columns 168 && ./wait-for.sh tester_mongo 27017 npm run test:coverage


######################
##  PROD DEPLOYMENT ##
######################
FROM base AS production
# Source code build
COPY . /app
RUN rm /app/.env.development || true
RUN rm /app/.env.test || true

WORKDIR /app

# Web app start
RUN JWT_SECRET=${JWT_SECRET_ENV} MONGO_HOST=${MONGO_HOST_ENV} node ./configurator.js production
RUN NODE_OPTIONS="--max-old-space-size=3072" npm run build

ENV ORIGIN=${ORIGIN_ENV}
CMD BODY_SIZE_LIMIT=4294967296 node --experimental-vm-modules build
