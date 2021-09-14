import { queryParent } from './helpers.js'

// GLOBAL VARIABLE TO KEEP CURRENT AUDIO
let active = null

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
   audioIcon.src = 'icons/audio.svg'
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

// INIT PREVIEW
export function init() {
   // find items
   const elements = document.querySelectorAll('.pe-element.pe-is-element-audio')
   // add listeners
   for (const element of elements) {
      element.addEventListener('click', play)
   }
}

// play listener
function play(event) {
   const current = queryParent(event.target, 'pe-element')
   const item = current.querySelector('.pe-item')
   // stop others
   if (active) {
      const audio = active.querySelector('audio')
      const icon = active.querySelector('img')
      audio.pause()
      audio.currentTime = 0
      icon.src = 'icons/audio.svg'
   }
   // play
   if (active !== item) {
      active = item
      const audio = item.querySelector('audio')
      const icon = item.querySelector('img')
      audio.currentTime = 0
      icon.src = 'icons/audio-active.svg'
      audio.play()
      audio.addEventListener('ended', ended)
   } else {
      active = null
   }
}

// ended listener
function ended(event) {
   const current = queryParent(event.target, 'pe-element')
   const item = current.querySelector('.pe-item')
   const icon = item.querySelector('img')
   icon.src = 'icons/audio.svg'
   if (active === item) {
      active = null
   }
}

// LOAD FUNCTION
export function load(editor) {}
