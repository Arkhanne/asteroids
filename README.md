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
5. Generar asterorides que se acerquen a la nave desde direcciones aleatorias.
6. Controlar las colisiones.
    * nave / asteroide
    * bala / asteroide
7. Controlar la puntuación.
8. Controlar las vidas.

## Backlog
* Los asteroides pueden tener diferentes tamaños. Al destruirlos se dividen en asteroides más pequeños.
* La nave se puede desplazar con inercia.
* Super disparo.
* Aleatoriamente puede aparecer un ovni en una dirección también aleatoria. El ovni dispara a la nave. Hay que controlar nuevas colisiones.
    * nave / ovni
    * bala nave / ovni
    * bala ovni / nave

## Game States and Transitions
1. (game start) buildSplash
2. (begin play) destroySplash + buidGame
3. (end play) destroySplash + buildGameOver
4. (back to game start) buildSplash + destroyGameOver

##  Estructuras de Datos

Definicion de clases y métodos.

## Task

Definicion de las tareas por orden de prioridad

## Trello

[Link url](https://trello.com)

## Git

Especificar las url del proyecto y del deploy

[Link Repositorio](http://github.com)

[Link Deploy](http://github.com)

## Instrucciones del juego 

Al finalizar el juego generar las instrucciones


