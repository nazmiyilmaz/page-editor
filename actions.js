import { getMaxZ, getBasicControls, getThumbs } from './helpers.js'

import { families, sizes } from './fonts.js'

import { markState } from './history.js'

// INSERT TEXT
export function insertText(value) {
   // create text
   const text = document.createElement('textarea')
   text.value = value
   text.style.fontFamily = families[0][1]
   text.style.fontSize = `${sizes.default}${sizes.unit}`
   text.spellcheck = false
   // insert to the page
   insertElement(text, 'text')
}

// INSERT IMAGE
export function insertImage(src) {
   // create image
   const image = document.createElement('img')
   image.src = src
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
function insertElement(item, type) {
   // find page
   const page = document.getElementById('active-page')

   // create node
   const node = document.createElement('div')
   node.classList.add('element', `is-${type}`)

   // set z-index
   node.style['z-index'] = getMaxZ(page) + 1

   // attach item
   item.classList.add('item')
   node.appendChild(item)

   // attach controllers
   node.appendChild(getBasicControls())

   // attach thumbs
   getThumbs().forEach((t) => {
      node.appendChild(t)
   })

   // append to the page
   page.appendChild(node)

   // dispatch click
   node.click()

   // mark state
   markState()
}
