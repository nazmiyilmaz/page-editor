import { getMaxZ } from './helpers.js'

import { deActivateAll } from './toolbar.js'

import { markState } from './history.js'

import { create as createText } from './textarea.js'
import { create as createAudio } from './audio.js'
import { create as createImage } from './image.js'
import { create as createVideo } from './video.js'

// GET PREVIEW PAGE
export function getPreviewPage(editor) {
   // get page
   const page = editor.querySelector('.pe-page')
   // deactivate all elements
   deActivateAll(page)
   // return html
   return page.outerHTML
}

// GET NON FUNCTIONAL PAGE
export function getNonFunctionalPage(editor) {
   // get page
   const page = editor.querySelector('.pe-page')
   // deactivate all elements
   deActivateAll(page)
   // clone page
   const temp = page.cloneNode(true)
   // place audio links
   temp.querySelectorAll('.element.is-audio').forEach((el) => {
      el.classList.remove('hide-links')
   })
   // place video links
   temp.querySelectorAll('.element.is-video').forEach((el) => {
      const item = el.querySelector('.item')
      const link = item.querySelector('span.link').cloneNode(true)
      link.classList.add('item')
      link.style = item.style
      item.remove()
      el.appendChild(link)
   })
   // return html
   return temp.outerHTML
}

// INSERT VIDEO
export function insertVideo(editor, src) {
   // create
   const video = createVideo(src)
   // insert to the page
   insertItem(editor, video, 'video', ['hide-links'])
}

// INSERT AUDIO
export function insertAudio(editor, src) {
   // create
   const audio = createAudio(src)
   // insert to the page
   insertItem(editor, audio, 'audio', ['hide-links'])
}

// INSERT TEXT
export function insertText(editor, value) {
   // create text
   const text = createText(value)
   // insert to the page
   insertItem(editor, text, 'text')
}

// INSERT IMAGE
export function insertImage(editor, src) {
   // create image
   const image = createImage(src)
   // insert to the page
   insertItem(editor, image, 'image')
}

// CHANGE BACKGROUND
export function changeBackground(editor, src) {
   // find page
   const page = editor.querySelector('.pe-page')
   page.style.backgroundImage = `url(${src})`
   // mark state
   markState(editor)
}

// INSERT HTML
export function insertElement(editor, element) {
   // find page
   const page = editor.querySelector('.pe-page')

   // set z-index
   element.style['z-index'] = getMaxZ(page) + 1

   // append to the page
   page.appendChild(element)

   // dispatch click
   page.click()
   element.click()

   // mark state
   markState(editor)
}

// REMOVE ELEMENT
export function removeElement(editor, element) {
   // find page
   const page = editor.querySelector('.pe-page')

   // remove
   element?.remove()

   // dispatch click
   page?.click()
   element?.click()

   // mark state
   markState(editor)
}

// GENERAL FUNCTION FOR INSERTING ELEMENT
function insertItem(editor, item, type, bind = []) {
   // find page
   const page = editor.querySelector('.pe-page')

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

   // append to the page
   page.appendChild(node)

   // dispatch click
   page.click()
   node.click()

   // mark state
   markState(editor)
}
