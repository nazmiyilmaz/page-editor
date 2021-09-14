export function create(src) {
   const video = document.createElement('video')
   video.controls = true

   // create source
   const source = document.createElement('source')
   source.src = src
   source.classList.add('video')

   // create icon
   const videoIcon = document.createElement('img')
   videoIcon.src = 'icons/video.svg'

   // create link
   const link = document.createElement('a')
   link.href = src
   link.target = '_blank'
   link.innerText = src

   // create link source
   const linkView = document.createElement('span')
   linkView.appendChild(videoIcon.cloneNode(true))
   linkView.appendChild(link.cloneNode(true))
   linkView.classList.add('pe-link')

   // append source
   video.appendChild(source.cloneNode(true))
   video.appendChild(linkView.cloneNode(true))

   // return
   return video.cloneNode(true)
}

export function init() {}

export function load() {}
