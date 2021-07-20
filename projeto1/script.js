document.body.addEventListener('keydown', (event) => {
  //console.log(event.code.toLocaleLowerCase()) //Captura a tecla pressionada pelo usuário (e transforma em minusculo)
  playSound(event.code.toLocaleLowerCase())
})

document.querySelector('.composer button').addEventListener('click', () => {
  let songCompose = document.querySelector('#input').value
  
  if(songCompose !== ''){
    let songComposeArray = songCompose.split('')
    playComposition(songComposeArray)
  }
})

function playSound(keypressed){
  let audioElement = document.querySelector(`#s_${keypressed}`)
  let keyElement = document.querySelector(`div[data-key=${keypressed}]`)
  
  if(audioElement){
    audioElement.currentTime = 0
    audioElement.play()
  }

  if(keyElement){
    keyElement.classList.add('active')
    setTimeout(() =>{
      keyElement.classList.remove('active')
    }, 250)
  }
}

function playComposition(compositionArray){
  let waitForNextSound = 0
  for(let item of compositionArray){
    setTimeout(() => {
      playSound(`key${item}`)
    }, waitForNextSound)
    waitForNextSound += 250
  }
}