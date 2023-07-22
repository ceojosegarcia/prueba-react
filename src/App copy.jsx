import './App.css'
import {expresiones} from './components/data/expresiones.js'
import { useState , useRef , useEffect} from 'react'
import { useInterval } from './components/useInterval';

function App() {
  const [playExpresiones,setPlayExpresiones] = useState({
    x:0,
    y:0,
    id:0,
    play:false
  });
  const emojiCara = useRef(null);
  const dialogoId = [60,8,3,6,5,11,67,50,37,60,52,8,12,11,5,12,37,55,25,22,60,45,12,52,10,65,35]
  let dialogo = []
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
  

  function tiempoRostro (){
    return new Promise ((resolve, reject) => {
      setTimeout(()=>{
        resolve(true)
      },1000)
    })
  }

  function handleClickPlay(){
    
    let cont = 0;
    let sizeDialogo = dialogo.length
    let stopDelay=false
    let elemDialogo

    const intervaloRostros = setInterval(()=>{
      setPlayExpresiones({
        x: (dialogo[cont].x * -100),
        y: (dialogo[cont].y * -100),
        id: dialogo[cont].id,
        play: true
      })
      cont++
      if(cont >= sizeDialogo)stopDelay=true
    }
    ,stopDelay ? null : 500)
    if(stopDelay)clearInterval(intervaloRostros) 
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
        {console.log("renderiza")}
        <img 
          src="./src/assets/caras-emoji.png" 
          alt="Expresiones del emoji" 
          className="emoji-rostro"
          ref={emojiCara}
          style={{
            top:`${playExpresiones.y}%`,
            left:`${playExpresiones.y}%`
          }}
        />
      </div>
      </div>
      <button onClick={handleClickPlay}>Dar Play</button>
    </>
  )
}

export default App
