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
         outer: '#editor .page',
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
      // resize from all edges and corners
      edges: {
         top: '.thumb.tl, .thumb.tr',
         left: '.thumb.tl, .thumb.bl',
         bottom: '.thumb.br, .thumb.bl',
         right: '.thumb.br, .thumb.tr',
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
            restriction: '#editor .page',
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

// SETUP DROPZONE
export function setDropZone(selector) {
   interact(selector).dropzone({
      overlap: 0.75,
      ondropactivate: function (event) {
         event.target.classList.add('drop-active')
      },
      ondragenter: function (event) {
         var draggableElement = event.relatedTarget
         var dropzoneElement = event.target
         dropzoneElement.classList.add('drop-target')
         draggableElement.classList.add('can-drop')
      },
      ondragleave: function (event) {
         event.target.classList.remove('drop-target')
         event.relatedTarget.classList.remove('can-drop')
      },
      ondrop: function (event) {
         event.relatedTarget
      },
      ondropdeactivate: function (event) {
         event.target.classList.remove('drop-active')
         event.target.classList.remove('drop-target')
      },
   })
}
