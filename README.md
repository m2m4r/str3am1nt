# STREAMINT

**- Desarrolladores :**

Martin Martinez Rizzi - María Agustina Cassi

# PLATAFORMA DE EVENTOS VIRTUALES CON FEATURES WEB 3.0

Proyecto y modelo de nogocio desarrollado por Martín Martinez Rizzi y María Agustina Cassi, a partir la reformulación de una propuesta de trabajo de la compañía Tonic-3 en el contexto de Bootcamp de Plataforma-5, cuya versión inicial se realizó en conjunto con los desarrolladores Blas Palukas, Fernando Leonhardt, Ignacio Cavagna.

## Caso de Uso

Plataforma de eventos virtuales que renderiza un contador en la landing-page del usuario hasta la fecha y hora del evento programado, y llegado el contador a cero, renderiza el video del evento al que fue invitado. El usuario puede mintear un POAP (Proof of Atendance Protocol) para certificar su asistencia al evento.

El usuario recibe un correo electrónico con una invitación al evento y un botón que lo redirige al sitio. Si desea asistir, se registra con su nombre, apellido y correo electrónico, como así también puede elegir loguearse mediante la billetera Metamask. El registro dispara el envío de un nuevo correo electrónico con un token de acceso al evento. El usuario se registra con su correo electrónico y el token recibido, y según su time-zone, renderizará un contador hasta la fecha y hora del evento, y al momento de llegar el contador a cero, renderiza el video del evento al que fue invitado.

Cuenta con un módulo de administrador, en el que se crean, modifican y eliminan eventos, y se invitan y eliminan usuarios, como así también un registro de las acciones de los administradores.


## Comandos

### Install dependencies

npm install

### Run the app

npm run client
npm run server 

### Run seed

Dentro de la carpeta Api

node seed.js

### Documentación de la API

https://app.swaggerhub.com/apis/m.agustina.cassi/StreaMint/1.0.0

### Chequeá nuestra metodología de trabajo en Trello

https://trello.com/b/UCocJe29/to-the-moon-wagmi
