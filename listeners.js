import {
   replaceTranslate,
   replaceRotate,
   getDragAngle,
   queryParent,
} from './helpers.js'
import { markState } from './history.js'

// DRAG LISTENER
export const dragListeners = {
   move: function (event) {
      const target = queryParent(event.target, 'element')
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      target.style.transform = replaceTranslate(target.style.transform, x, y)

      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
   },
   end: function (event) {
      markState()
   },
}

// RESIZE LISTENER
export const resizeListeners = {
   move: function (event) {
      const target = event.target
      let x = parseFloat(target.getAttribute('data-x')) || 0
      let y = parseFloat(target.getAttribute('data-y')) || 0
      target.style.width = event.rect.width + 'px'
      target.style.height = event.rect.height + 'px'
      x += event.deltaRect.left
      y += event.deltaRect.top
      target.style.transform = replaceTranslate(target.style.transform, x, y)
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
   },
   end: function (event) {
      markState()
   },
}

// ROTATE LISTENER
export const rotateListeners = {
   onstart: function (event) {
      const target = queryParent(event.target, 'element')
      const rect = target.getBoundingClientRect()
      target.setAttribute('data-center-x', rect.left + rect.width / 2)
      target.setAttribute('data-center-y', rect.top + rect.height / 2)
      target.setAttribute('data-angle', getDragAngle(event, target))
   },
   onmove: function (event) {
      const target = queryParent(event.target, 'element')
      const pos = {
         x: parseFloat(target.getAttribute('data-x')) || 0,
         y: parseFloat(target.getAttribute('data-y')) || 0,
      }
      const angle = getDragAngle(event, target)
      target.style.transform = replaceRotate(
         replaceTranslate(target.style.transform, pos.x, pos.y),
         angle
      )
   },
   onend: function (event) {
      const target = queryParent(event.target, 'element')
      target.setAttribute('data-angle', getDragAngle(event, target))

      // mark state
      markState()
   },
}
