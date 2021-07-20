const digitalClock = document.querySelector('.digital')
const secondPointer = document.querySelector('.p_s')
const minutePointer = document.querySelector('.p_m')
const hourPointer = document.querySelector('.p_h')

function updateClock(){
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()

  digitalClock.innerHTML = `${fixTime(hour)}:${fixTime(minute)}:${fixTime(second)}`

  //Relogio Analógico
  const secToDeg = ((360 / 60) * second) - 90 //360º / 60 minutos * qtd de segundos, -90º pra compensar o posicionamento
  const minToDeg = ((360 / 60) * minute) - 90
  const hrToDeg = ((360 / 12) * hour) - 90
  secondPointer.style.transform = `rotate(${secToDeg}deg)`
  minutePointer.style.transform = `rotate(${minToDeg}deg)`
  hourPointer.style.transform = `rotate(${hrToDeg}deg)`
}

function fixTime(time){
  return time < 10 ? `0${time}` : time //Ternário (Condição antes de ?, retorna true após o ? e false após o :)
}

setInterval(updateClock, 1000)
updateClock()