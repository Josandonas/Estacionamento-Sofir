# Bem Vindo ao :city_sunset: Estacionamento Sofir :ticket:

```bash
cd backend
composer install
php artisan key:generate

Adicione as credenciais de seu banco mysql

php artisan jwt:secret
php artisan migrate
php artisan db:seed
php artisan serve


cd frontend
npm install
npm run dev
```

## Pacotes back-end:

* reliese/laravel para facilitar a criação das models baseado nos controllers criados

* laravel/jwt com o intuito de validar o token de login

## Pacotes front-end
* react-fontawesome para os icones do projeto
* bootstrap responsividade e fácil criação de layouts por meio de classes
* axios foi usado por dar suporte nativo para json e com ele é mais fácil realizar requisições http usando os metodos: get, post, put, delete e outros

## Autor

* **José Sandonas** - *Developer Full Stack* - [git Josandonas](https://github.com/Josandonas)