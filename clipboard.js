import { insertElement, removeElement } from './actions.js'

let copiedElement

export function copy() {
   const element = document.querySelector('#editor .element.is-active')

   if (element) {
      copiedElement = element.cloneNode(true)
   }

   console.log('copy', copiedElement)
}

export function cut() {
   const element = document.querySelector('#editor .element.is-active')

   if (element) {
      copiedElement = element.cloneNode(true)
      removeElement(element)
   }

   console.log('cut', copiedElement)
}

export function paste() {
   if (copiedElement) {
      insertElement(copiedElement)
   }

   console.log('paste', copiedElement)
}
