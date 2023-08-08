FROM alpine:latest
RUN apk update && apk upgrade \
  && apk add curl gcc g++ make ruby-full ruby-dev git \
  && apk add --update nodejs npm
RUN npm install -g @shopify/cli @shopify/theme