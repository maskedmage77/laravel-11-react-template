FROM php:8.2-fpm-alpine

# installs the necessary packages for the application
RUN apk add --update \
  git \
  curl \
  libpng-dev \
  oniguruma-dev \
  libxml2-dev \
  zip \
  unzip \
  npm \
  supervisor \
  shadow \
  nano \
  libzip-dev \
  bash \
  && docker-php-ext-install zip

  # Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Use the default production configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Set up supervisor
COPY ./docker/app/supervisord.conf /etc/supervisord.conf

# Set up the application directory
WORKDIR /var/www/html/

# Set up the application user
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install composer
RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer
