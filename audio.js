// SLIDER ELEMENT
const slider = document.getElementById('audio-playback-slider')

// PLAY BUTTON
const playButton = document.getElementById('audio-play-button')

// GLOBAL VARIABLE TO POINT THE INTERVAL
let syncInterval

// CREATE
export function create(src) {
   // create item
   const item = document.createElement('div')

   // create audio
   const audio = document.createElement('audio')

   // create source
   const source = document.createElement('source')
   source.src = src

   // append source
   audio.appendChild(source.cloneNode(true))

   // create icon
   const audioIcon = document.createElement('img')
   audioIcon.src = 'icos/audio.svg'

   // create link
   const link = document.createElement('a')
   link.href = src
   link.target = '_blank'
   link.innerText = src

   // append icon
   item.appendChild(audio.cloneNode(true))
   item.appendChild(audioIcon.cloneNode(true))
   item.appendChild(link.cloneNode(true))

   return item.cloneNode(true)
}

// INITIALIZE FUNCTIONALITY OF PLAYBACK ELEMENTS
export function init() {
   playButton.addEventListener('click', togglePlay)
   slider.addEventListener('change', seek)
}

// LOAD AUDIO TO PLAYBACK
export function load() {
   const audio = getAudio()

   if (audio) {
      audio.addEventListener('durationchange', syncDuration)

      audio.addEventListener('abort', pauseSync)
      audio.addEventListener('error', pauseSync)
      audio.addEventListener('ended', pauseSync)
      audio.addEventListener('pause', pauseSync)

      audio.addEventListener('play', startSync)
   }
   init()
   playButton.click()
}

// RESET PLAYBACK
export function resetPlayback() {
   // puse sync
   pauseSync()

   // pause all audio tracks
   const elements = document.querySelectorAll('.element.is-audio')
   for (const el of elements) {
      const audio = el.querySelector('audio')
      audio.currentTime = 0
      audio.pause()
   }

   // change slider value to 0
   slider.value = 0
}

// GET ACTIVE AUDIO ELEMENT
function getAudio() {
   return document
      ?.querySelector('.element.is-active.is-audio')
      ?.querySelector('audio')
}

// PAUSE SYNCING CURRENT TIME VALUE
function pauseSync() {
   playButton.src = 'icos/play.svg'
   clearInterval(syncInterval)
}

// START SYNCING CURRENT TIME VALUE
function startSync() {
   const audio = getAudio()

   playButton.src = 'icos/pause.svg'

   slider.value = audio?.currentTime

   syncInterval = setInterval(function () {
      slider.value = audio?.currentTime
   }, 1000)
}

// SYNC DURATION VALUE
function syncDuration() {
   const audio = getAudio()
   slider.max = audio?.duration
}

// TOGGLE PLAY
function togglePlay() {
   syncDuration()
   const audio = getAudio()
   if (audio.paused) {
      audio.play()
   } else {
      audio.pause()
   }
}

// SEEK
function seek() {
   const audio = getAudio()
   audio.currentTime = slider.value
}
