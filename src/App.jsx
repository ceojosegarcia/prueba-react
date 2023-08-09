import './App.css'
import {expresiones} from './components/data/expresiones.js'
import { useState , useRef , useEffect} from 'react'

function App() {

  //const dialogoId = [60,8,3,6,5,11,67,50,37,60,52,8,12,11,5,12,37,55,25,22,60,45,12,52,10,65,35]
  const dialogoId = [6,3,6,5,6,10,4,6,5,14,10,4,8,5,3,14,6,10,12,10,6,2]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPlayDisabled, setPlayDisabled] = useState(false)
  const [rostroY, setRostroY] = useState("0%")
  const [rostroX, setRostroX] = useState("0%")


  useEffect(()=> {
    let interval = null;
    let contIndex = 0;
    let posY = "0%"
    let posX = "0%"
    let indexDialogo = 0
    let indexActual = 0

    if (isRunning) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dialogoId.length)
        indexActual = dialogoId[contIndex]
        posY= `${expresiones[indexActual].y * (-100)}%`
        posX= `${expresiones[indexActual].x * (-100)}%`
        setRostroY((newY) => posY)
        setRostroX((newX) => posX)

        contIndex++
        
        console.log(`index: ${indexActual} top: ${posY} left: ${posX}`)
        if(contIndex > (dialogoId.length-1)){
          posY = "0%"
          posX = "0%"
          setRostroY((newY) => posY)
          setRostroX((newX) => posX)
          clearInterval(interval)
        }else{
          indexDialogo = dialogoId[contIndex]
        }
      }, 250);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning])



  function handleClickPlay(){
    setIsRunning(!isRunning)
    setPlayDisabled(!isPlayDisabled)
    console.log(`da click`)
  }

  return ( 
    <>
      <div className="emoji-container">
      <img src="./src/assets/fondo-emoji.png" alt="Emoji-Moi" className="fondo-emoji"/>
      <div className="emoji-rostro-container">
        <img 
          src="./src/assets/caras-emoji.png" 
          alt="Expresiones del emoji" 
          className="emoji-rostro"
          
          style={{
            top: rostroY,
            left: rostroX
          }}
        />
      </div>
      </div>
      <button 
        onClick={handleClickPlay}
        disabled={isPlayDisabled}
      >Dar Play</button>
    </>
  )
}

export default App
