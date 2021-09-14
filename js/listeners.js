import {
   replaceTranslate,
   replaceRotate,
   getDragAngle,
   getEditor,
} from './helpers.js'
import { markState } from './history.js'

// DRAG LISTENER
export const dragListeners = {
   move: function (event) {
      const editor = getEditor(event.target)
      const controller = editor.querySelector('.pe-controller')
      const target = editor.querySelector('.pe-element.is-active')

      drag(event, controller)
      drag(event, target)
   },
   end: function (event) {
      const editor = getEditor(event.target)
      markState(editor)
   },
}

// RESIZE LISTENER
export const resizeListeners = {
   move: function (event) {
      const editor = getEditor(event.target)
      const controller = editor.querySelector('.pe-controller')
      const target = editor.querySelector('.pe-element.is-active')

      resize(event, controller)
      resize(event, target)
   },
   end: function (event) {
      const editor = getEditor(event.target)
      markState(editor)
   },
}

// ROTATE LISTENER
export const rotateListeners = {
   onstart: function (event) {
      const editor = getEditor(event.target)
      const target = editor.querySelector('.pe-element.is-active .item')

      const rect = target.getBoundingClientRect()

      target.setAttribute('data-center-x', rect.left + rect.width / 2)
      target.setAttribute('data-center-y', rect.top + rect.height / 2)
      target.setAttribute('data-angle', getDragAngle(event, target))
   },
   onmove: function (event) {
      const editor = getEditor(event.target)
      const target = editor.querySelector('.pe-element.is-active .item')
      const angle = getDragAngle(event, target)
      rotate(angle, target)
   },
   onend: function (event) {
      const editor = getEditor(event.target)
      const target = editor.querySelector('.pe-element.is-active .item')
      const angle = getDragAngle(event, target)
      target.setAttribute('data-angle', angle)
      // mark state
      markState(editor)
   },
}

// DRAG ELEMENT
function drag(event, target) {
   // find position
   const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
   const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

   // move
   target.style.transform = replaceTranslate(target.style.transform, x, y)

   // update data-x data-y
   target.setAttribute('data-x', x)
   target.setAttribute('data-y', y)
}

// RESIZE ELEMENT
function resize(event, target) {
   // get rect
   const rect = event.rect
   const deltaRect = event.deltaRect

   // set size
   target.style.width = `${rect.width}px`
   target.style.height = `${rect.height}px`

   // get position
   let x = parseFloat(target.getAttribute('data-x')) || 0
   let y = parseFloat(target.getAttribute('data-y')) || 0

   // move
   x += deltaRect.left
   y += deltaRect.top
   target.style.transform = replaceTranslate(target.style.transform, x, y)

   // set data-x data-y
   target.setAttribute('data-x', x)
   target.setAttribute('data-y', y)
}

// ROTATE ELEMENT
function rotate(angle, target) {
   // find position
   let x = parseFloat(target.getAttribute('data-x')) || 0
   let y = parseFloat(target.getAttribute('data-y')) || 0

   // rotate
   target.style.transform = replaceRotate(
      replaceTranslate(target.style.transform, x, y),
      angle
   )
}
