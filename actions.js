import { getMaxZ, getBasicControls } from './helpers.js'

// INSERT TEXT
export function insertText(value) {
   // create text
   const text = document.createElement('textarea')
   text.value = value
   text.style.fontFamily = 'Open Sans, sans-serif'
   text.style.fontSize = '16px'
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

function insertElement(item, type) {
   // find page
   const page = document.querySelector('.page.is-current-page')
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
   // append to the page
   page.appendChild(node)

   // dispatch click
   node.click()
}
