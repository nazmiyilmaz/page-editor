import { getMaxZ } from './helpers.js'

import { deActivateAll } from './controls.js'

import { markState } from './history.js'

import { create as createText } from './textarea.js'
import { create as createAudio } from './audio.js'
import { create as createImage } from './image.js'
import { create as createVideo } from './video.js'

import { create as createBasicControls } from './basic-controls.js'
import { create as createThumbs } from './thumbs.js'

// GET NON FUNCTIONAL PAGE
export function getNonFunctionalPage() {
   // deactivate all
   deActivateAll()

   // get page
   const page = document.getElementById('active-page')

   const temp = page.cloneNode(true)

   temp.querySelectorAll('.element.is-audio').forEach((el) => {
      el.classList.remove('hide-links')
   })

   temp.querySelectorAll('.element.is-video').forEach((el) => {
      const item = el.querySelector('.item')

      const link = item.querySelector('span.link').cloneNode(true)
      link.classList.add('item')
      link.style = item.style

      item.remove()
      el.appendChild(link)
   })

   return temp.outerHTML
}

// INSERT VIDEO
export function insertVideo(src) {
   // create
   const video = createVideo(src)
   // insert to the page
   insertElement(
      video,
      'video',
      {
         rotate: false,
         move: true,
         del: true,
      },
      true,
      ['hide-links']
   )
}

// INSERT AUDIO
export function insertAudio(src) {
   // create
   const audio = createAudio(src)
   // insert to the page
   insertElement(
      audio,
      'audio',
      { rotate: false, move: true, del: true },
      false,
      ['hide-links']
   )
}

// INSERT TEXT
export function insertText(value) {
   // create text
   const text = createText(value)
   // insert to the page
   insertElement(text, 'text')
}

// INSERT IMAGE
export function insertImage(src) {
   // create image
   const image = createImage(src)
   // insert to the page
   insertElement(image, 'image')
}

// CHANGE BACKGROUND
export function changeBackground(src) {
   // find page
   const page = document.getElementById('active-page')
   page.style.backgroundImage = `url(${src})`

   // mark state
   markState()
}

// GENERAL FUNCTION FOR INSERTING ELEMENT
function insertElement(
   item,
   type,
   controls = { rotate: true, move: true, del: true },
   thumbs = true,
   bind = []
) {
   // find page
   const page = document.getElementById('active-page')

   // create node
   const node = document.createElement('div')
   node.classList.add('element', `is-${type}`)

   // bind optional classes
   if (bind.length) {
      node.classList.add(...bind)
   }

   // set z-index
   node.style['z-index'] = getMaxZ(page) + 1

   // attach item
   item.classList.add('item')
   node.appendChild(item)

   // attach controllers
   node.appendChild(createBasicControls(controls))

   // attach thumbs
   if (thumbs) {
      createThumbs().forEach((t) => {
         node.appendChild(t)
      })
   }

   // append to the page
   page.appendChild(node)

   // dispatch click
   node.click()

   // mark state
   markState()
}
