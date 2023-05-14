FROM ruby:buster
RUN apt-get update \
  && apt-get upgrade -y \
  && apt install curl -y \
  && apt install make -y \
  && gem install bundler \
  && curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
  && apt-get install -y nodejs \
  && apt install openssh-client
RUN npm install -g @shopify/cli @shopify/theme