# Asteroids

## Descripción

Clone del mítico juego de Atari [Asteroids](https://www.atari.com/arcade#!/arcade/asteroids/play), en el que se controla una nave que aparece en el centro de la pantalla, cuyo objetivo es destruir los asteorides que se le van acercando.

## MVP - Tecnología (DOM - CANVAS)

Se realiza el proyecto con tecnología **Canvas** y utilizando **Javascript** como lenguaje de programación.

### MVP
1. Controlar los *game states* y las transiciones entre ellos.
2. Situar la nave en el centro de la pantalla.
3. Poder rotar la nave sobre ella misma.
4. Poder disparar.
5. Generar un asteroide que aparezca en una posición aleatoria y se mueva en una dirección aleatoria.
6. Controlar las colisiones.
    * nave / asteroide
    * bala / asteroide
7. Controlar la puntuación.

## Backlog
* Controlar las vidas.
* La nave se puede desplazar con inercia.
* Los asteroides al destruirlos se dividen en asteroides más pequeños.
* Teletransporte.
* Super disparo.
* Aleatoriamente puede aparecer un ovni en una dirección también aleatoria. El ovni dispara. Hay que controlar nuevas colisiones.
    * nave / ovni
    * bala nave / ovni
    * bala ovni / nave

## Game States and Transitions
1. (game start) buildSplash
2. (begin play) destroySplash + buidGame
3. (end play) destroyGame + buildGameOver 
4. (back to game start) buildSplash + destroyGameOver

##  Estructuras de Datos
### main.js
* buildSplash
* destroySplash
* buidGame
* destroyGame
* buildGameOver
* destroyGameOver

### Class Game
#### Properties
* Ship ship
* Array asteroids[Asteroid]
* Array bullets[Bullet]
* Number score
* Number lifes
* Frame frame
#### Methods
* checkCollision
* doFrame
* update

### Class Ship
#### Properties
* position {}
* size
#### Methods
* rotateLeft
* rotateRight
* shoot

### Class Asteroid
#### Properties
* position {}
* size
* direction
#### Methods
* move

### Class Bullet
#### Properties
* position {}
* size
* direction
#### Methods
* move

### Class Render
#### Properties
#### Methods
* drawScreen
* drawShip
* drawAsteroid
* drawBullet
* drawScore
* drawLifes

## Task

1. Crear fichero index.html con estructura mínima
2. Crear main.js
3. Crear game.js
4. Crear render.js
5. Crear ship.js
6. Crear asteroid.js
7. Crear bullet.js

## Trello

[Link url](https://trello.com/b/bOzQGdXN/asteroids)

## Git

Especificar las url del proyecto y del deploy

[Link Repositorio](https://github.com/Arkhanne/asteroids)

[Link Deploy](http://github.com)

## Instrucciones del juego 

Al finalizar el juego generar las instrucciones


