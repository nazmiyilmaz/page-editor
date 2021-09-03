import { copyAttribute } from './helpers.js'
import { markState } from './history.js'
import { hideAll as hideToolbar } from './toolbar.js'

const options = {
   image: {
      thumbs: true,
      controls: { move: true, del: true, rotate: true },
   },
   text: {
      thumbs: true,
      controls: { move: true, del: true, rotate: true },
   },
   audio: {
      thumbs: false,
      controls: { move: true, del: true, rotate: false },
   },
   video: {
      thumbs: true,
      controls: { move: true, del: true, rotate: false },
   },
}

export function locate(type) {
   // find element
   const el = document.querySelector('#editor .element.is-active')
   if (!el) {
      return
   }

   // find controller
   const controller = document.getElementById('controller')

   // resolve options
   const { thumbs, controls } = options[type]
   const { move, del, rotate } = controls

   // set move
   document.getElementById('move-handle').style.display = move
      ? 'unset'
      : 'none'

   // set delete
   document.getElementById('delete-handle').style.display = del
      ? 'unset'
      : 'none'

   // set rotate
   document.getElementById('rotate-handle').style.display = rotate
      ? 'unset'
      : 'none'

   // set thumbs
   if (thumbs) controller.classList.add('is-resizable')

   // get rect
   const rect = el.getBoundingClientRect()

   // activate
   controller.classList.add('is-active')
   controller.style['z-index'] = 99999999

   // copy style
   controller.style.transform = el?.style?.transform
   controller.style.width = el?.style?.width || `${rect.width}px`
   controller.style.height = el?.style?.height || `${rect.height}px`
   copyAttribute(el, controller, 'data-x', 0)
   copyAttribute(el, controller, 'data-y', 0)
}

export function hide() {
   const controller = document.getElementById('controller')
   controller.classList.remove('is-active')
}

// DELETE
export function deleteItem(event) {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // check if element exists
   if (el) {
      // remove element
      el.remove()
      // hide toolbar components
      hideToolbar()
   }

   // mark state
   markState()
}
