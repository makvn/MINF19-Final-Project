#!/bin/bash

if [ ! -f "vendor/autoload.php" ]; then
    echo "Install packages from composer config"
    composer install --no-progress --no-interaction
else
    echo "Vendor directory is existed"
fi

if [ ! -f ".env" ]; then
    echo "Creating env file for env $APP_ENV"
    cp .env.example .env
else
    echo "env file exists."
fi

# php artisan key:genenrate
# php artisan cache:clear
# php artisan config:clear
# php artisan route:clear

exec "$@"