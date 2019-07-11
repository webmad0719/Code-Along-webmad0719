let Game = {
  canvas: undefined,    
  ctx: undefined,
  fps: 60,            
  obstacles: [],      //array de obstaculos
  framesCounter: 0,   //Contador de fps que han transcurido

  //Creamos una funcion init que se lanzara solo una vez al abrirse la pagina. La llamaremos en index.js
  init: function(id) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = window.innerWidth * .96
    this.canvas.height = window.innerHeight * .96
    this.start()  //Llamamos a start en init para que comience automaticamente.
  },

  //Comenzamos el juego con start() aqui ira el intervalo
  start: function() {
    this.restart()  //Restart resetea todo al estado inicial

    this.interval = setInterval(() => {   //Corazon de la aplicacion <3

      this.clear()  
      this.framesCounter ++   //Contamos una vuelta             
      if(this.framesCounter > 1000) {   //Cada 1000 vueltas lo reiniciamos
        this.framesCounter = 0
      }

      if(this.framesCounter % 200 == 0) { //Cada 200 vueltas pintamos un objeto
        this.generateObstacles()       
      }


      this.drawAll()              //Drawall y moveAll gestionan todo el dibujo y movimiento de la aplicacion
      this.moveAll()          
      this.clearObstacles()       //Limpiamos los obstaculos para no crear un array infinito
      if(this.isCollision()) {    //Comprobamos colisiones y gameover
        this.gameOver()
      }

    }, 1000/this.fps)
  },

  restart: function() {
    this.player = new Component(0, (this.canvas.height / 2) - 30, "red", 60, 60 )
    this.obstacles = []
  },

  drawAll: function() {
    this.player.draw()
    this.obstacles.forEach(obstacle => obstacle.draw())  //PIntamos los obstaculos iterando el array
  },
  moveAll: function() {
    this.player.movePlayer()
    this.obstacles.forEach(obstacle => obstacle.moveObstacle()) //Lo mismo para moverlos
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  generateObstacles: function() {
    console.log("se genera obstaculo")
    this.obstacles.push(new Component(this.canvas.width, 0, "green", 30, Math.floor(Math.random() * 100 + 200)))  //Generamos obstaculos en el array. El math.Random sirve para que tengan diferentes tamanios.
  },
  clearObstacles: function() {
    this.obstacles.forEach((obs, idx) => {
      if(obs.x < 0)  {this.obstacles.splice(idx, 1)}  //Limpiamos los obstaculos iterando sobre ellos.
    })
  },

  isCollision: function() {
    return this.obstacles.some(obstacle => {        //Comprobamos si alguno de los obstaculos colisiona.
      return (
        ((this.player.x + this.player.width) >= obstacle.x &&     //Choque con lado izquierdo del obstaculo
          this.player.x < (obstacle.x + obstacle.width) &&        //Choque con lado derecho del obstaculo
          this.player.y < (obstacle.y + obstacle.height)          //Choque con lado de abajo del obstaculo
          )
      )
    })
  },

  gameOver: function() {        //Detenemos el intervalo, gameOver.
    clearInterval(this.interval)
  }






}