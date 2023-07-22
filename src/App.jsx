import './App.css'
import {expresiones} from './components/data/expresiones.js'
import { useState , useRef , useEffect} from 'react'

function App() {
  const [playExpresiones,setPlayExpresiones] = useState({
    x:0,
    y:0,
    id:0,
    play:false
  });
  const [caraEmoji, setCaraEmoji] = useState(0)
  const dialogoId = [60,8,3,6,5,11,67,50,37,60,52,8,12,11,5,12,37,55,25,22,60,45,12,52,10,65,35]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let dialogo = [{
    x:0,
    y:0,
    id:0
  }]
  let indiceActual = 0

  function conversacion(){
    dialogo = []
    dialogoId.forEach( idDialogo => {
      indiceActual = expresiones.findIndex(indice => indice.id == idDialogo)
      if(indiceActual >= 0 ){
        dialogo.push({
          y:expresiones[indiceActual].y,
          x:expresiones[indiceActual].x,
          id:expresiones[indiceActual].id
        })

      // console.log(dialogo)
      }
      }
    )
  }
  useEffect(()=>{
    conversacion()  
  },[])

  useEffect(()=> {
    let interval = null;
    let contIndex = 0;

    if (isRunning) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dialogoId.length)
        
        contIndex++
        if(contIndex >= dialogoId.length){
          clearInterval(interval)
        }
      }, 400);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning])

  function tiempoRostro (){
    
  }

  function handleClickPlay(){
    setIsRunning(!isRunning);
    console.log(`Array dialogo ${dialogo.length}`)
  }


  function cambiaExpresion(xE, yE, idE){
    return new Promise ((resolve, reject) => {
      setTimeout(
       () =>{
        setPlayExpresiones({
          x: (xE * -100),
          y: (yE * -100),
          id: idE,
          play: true
        })
        resolve(true)
       }
      , 400)
        
    })
    //console.log(`left: ${xE * -100}, top: ${yE * -100}, id: ${playExpresiones.id}`)
  }

  return ( 
    <>
      <div className="emoji-container">
      <img src="./src/assets/fondo-emoji.png" alt="Emoji-Moi" className="fondo-emoji"/>
      <div className="emoji-rostro-container">
        {console.log(dialogoId[currentIndex])}
        <img 
          src="./src/assets/caras-emoji.png" 
          alt="Expresiones del emoji" 
          className="emoji-rostro"
          
          style={{
            top:`0%`,
            left:`0%`
          }}
        />
      </div>
      </div>
      <button onClick={handleClickPlay}>Dar Play</button>
    </>
  )
}

export default App
