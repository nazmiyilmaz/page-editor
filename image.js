import { getEditor } from './helpers.js'

export function create(src) {
   const image = document.createElement('img')
   image.src = src
   return image.cloneNode(true)
}

export function init() {}

export function load(event) {
   // get editor
   const editor = getEditor(event.target)

   // find element
   const el = editor.querySelector('.element.is-active')

   // find item
   const image = el.querySelector('.item')

   // load alpha
   const alphaSlider = editor.querySelector('.pe-alpha-slider')
   const alpha = isNaN(parseFloat(image.style.opacity))
      ? 1
      : parseFloat(image.style.opacity)
   alphaSlider.value = alpha * 100
}
