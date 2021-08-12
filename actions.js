import { getMaxZ } from './helpers.js'

// INSERT TEXT
export function insertText(value) {
   // create text
   const text = document.createElement('textarea')
   text.value = value
   // insert to the page
   insertElement(text, 'text', ['basic', 'text'])
}

// INSERT IMAGE
export function insertImage(src) {
   // create image
   const image = document.createElement('img')
   image.src = src
   // insert to the page
   insertElement(image, 'image', ['basic', 'image'])
}

function insertElement(item, type, controllers = []) {
   // find page
   const page = document.querySelector('.page.is-current-page')
   // create node
   const node = document.createElement('div')
   node.classList.add('element', 'is-active', `is-${type}`)
   // set z-index
   node.style['z-index'] = getMaxZ(page) + 1
   // attach controllers
   controllers.forEach((c) => node.appendChild(getController(c)))
   // attach item
   item.classList.add('item')
   node.appendChild(item)
   // append to the page
   page.appendChild(node)
}

// GENERATE CONTROLLER
function getController(type) {
   const controller = document.querySelector(`.controller.is-${type}`)
   controller.classList.remove('is-hidden')
   return controller.cloneNode(true)
}
