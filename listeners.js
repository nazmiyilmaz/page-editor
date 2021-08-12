import {
   replaceTranslate,
   replaceRotate,
   getDragAngle,
   queryParent,
   toggleFlipH,
   toggleFlipV,
   getMinZ,
   raiseAllElements,
   getMaxZ,
} from './helpers.js'

// DRAG MOVE LISTENER
export function dragMoveListener(event) {
   const target = event.target
   const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
   const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

   target.style.transform = replaceTranslate(target.style.transform, x, y)

   target.setAttribute('data-x', x)
   target.setAttribute('data-y', y)
}

// ROTATE LISTENER
export const rotateListeners = {
   onstart(event) {
      const el = queryParent(event.target, 'element')
      const target = el.querySelector('.item')
      const rect = target.getBoundingClientRect()
      target.setAttribute('data-center-x', rect.left + rect.width / 2)
      target.setAttribute('data-center-y', rect.top + rect.height / 2)
      target.setAttribute('data-angle', getDragAngle(event, target))
   },
   onmove(event) {
      const el = queryParent(event.target, 'element')
      const target = el.querySelector('.item')
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
   onend(event) {
      const el = queryParent(event.target, 'element')
      const target = el.querySelector('.item')
      target.setAttribute('data-angle', getDragAngle(event, target))
   },
}

// FLIP FRONT
export function flipFrontListener(event) {
   const el = queryParent(event.target, 'element')
   const page = queryParent(el, 'page')
   const max = getMaxZ(page)
   el.style['z-index'] = max + 1
}

// FLIP BACK
export function flipBackListener(event) {
   const el = queryParent(event.target, 'element')
   const page = queryParent(el, 'page')
   const min = getMinZ(page)
   if (min <= 0) {
      raiseAllElements(page, min)
      el.style['z-index'] = 0
   } else {
      el.style['z-index'] = min - 1
   }
}

// RESIZE LISTENER
export function resizeListener(event) {
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
}

// FLIP HORIZONTAL LISTENER
export function flipHListener(event) {
   const el = queryParent(event.target, 'element')
   const target = el.querySelector('.item')
   target.style.transform = toggleFlipH(target?.style?.transform)
}

// FLIP VERTICAL LISTENER
export function flipVListener(event) {
   const el = queryParent(event.target, 'element')
   const target = el.querySelector('.item')
   target.style.transform = toggleFlipV(target?.style?.transform)
}

// DELETE LISTENER
export function deleteListener(event) {
   const el = queryParent(event.target, 'element')
   el.remove()
}

// HIDE CONTROLLER LISTENER
export function toggleControllerListener(event) {
   const el = queryParent(event.target, 'element')
   const page = queryParent(event.target, 'page')

   if (page) {
      page.querySelectorAll('.element').forEach(function (e) {
         e.classList.remove('is-active')
      })
   }

   if (el) {
      el.classList.add('is-active')
   }
}
