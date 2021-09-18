import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/resize/index.js'
import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js'
import 'https://cdn.interactjs.io/v1.9.20/dev-tools/index.js'
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'

import { rotateListeners, dragListeners, resizeListeners } from './listeners.js'

// MAKE RESIZABLE
export function setResize(selector, preserveRatio = false) {
   const modifiers = [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
         outer: '.pe-editor .pe-page',
      }),
   ]
   if (preserveRatio) {
      modifiers.push(
         interact.modifiers.aspectRatio({
            ratio: 'preserve',
            modifiers: [interact.modifiers.restrictSize({ max: 'parent' })],
         })
      )
   }
   interact(selector).resizable({
      // thumb selectors
      edges: {
         top: '.pe-thumb.pe-thumb-tl, .pe-thumb.pe-thumb-tr',
         left: '.pe-thumb.pe-thumb-tl, .pe-thumb.pe-thumb-bl',
         bottom: '.pe-thumb.pe-thumb-br, .pe-thumb.pe-thumb-bl',
         right: '.pe-thumb.pe-thumb-br, .pe-thumb.pe-thumb-tr',
      },
      listeners: resizeListeners,
      modifiers,
      inertia: true,
   })
}

// MAKE DRAGGABLE
export function setDrag(selector) {
   interact(selector).draggable({
      inertia: true,
      modifiers: [
         interact.modifiers.restrictRect({
            restriction: '.pe-editor .pe-page',
            endOnly: true,
         }),
      ],
      autoScroll: false,
      listeners: dragListeners,
   })
}

// MAKE ROTATABLE
export function setRotate(handleSelector) {
   interact(handleSelector).draggable(rotateListeners)
}
