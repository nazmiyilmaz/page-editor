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

// INIT PREVIEW
export function init() {
   // find items
   const elements = document.querySelectorAll('.element.is-audio')
   // add listeners
   for (const element of elements) {
      element.addEventListener('click', function (event) {
         const current = queryParent(event.target, 'element')
         const item = current.querySelector('.item')
         // stop others
         if (active) {
            const audio = active.querySelector('audio')
            const icon = active.querySelector('img')
            audio.pause()
            audio.currentTime = 0
            icon.src = 'icos/audio.svg'
         }
         // play
         if (active !== item) {
            active = item
            const audio = item.querySelector('audio')
            const icon = item.querySelector('img')
            audio.currentTime = 0
            icon.src = 'icos/audio-active.svg'
            audio.play()
            audio.addEventListener('ended', function (event) {
               icon.src = 'icos/audio.svg'
            })
         } else {
            active = null
         }
      })
   }
}

// LOAD FUNCTION
export function load(editor) {}
