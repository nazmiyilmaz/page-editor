import { insertElement, removeElement } from './actions.js'

let copiedElement = null

export function copy(editor) {
   const element = editor.querySelector('.pe-element.pe-is-active')
   if (element) {
      copiedElement = element.cloneNode(true)
   }
}

export function cut(editor) {
   const element = editor.querySelector('.pe-element.pe-is-active')
   if (element) {
      copiedElement = element.cloneNode(true)
      removeElement(editor, element)
   }
}

export function paste(editor) {
   if (copiedElement) {
      insertElement(editor, copiedElement.cloneNode(true))
   }
}
