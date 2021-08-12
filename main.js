import { setDrag, setDropZone, setResize, setRotate } from './interact.js'

import {
   deleteListener,
   toggleControllerListener,
   flipHListener,
   flipVListener,
   flipFrontListener,
   flipBackListener,
} from './listeners.js'

import { insertImage, insertText } from './actions.js'

// SET PAGES AS DROPZONES
setDropZone('.page')

// SET RESIZABLE ELEMENTS
setResize('.element.is-image')

// SET DRAG OF ELEMENTS
setDrag('.element.is-image')
setDrag('.element.is-text:not(.is-active)')

// SET ROTATE OF ELEMENTS
setRotate('.rotation-handle')

// REFRESH PAGE
function refresh() {
   // FLIP HORIZONTAL
   document
      .querySelectorAll('.fliph')
      .forEach((d) => d.addEventListener('click', flipHListener))
   // FLIP VERTICAL
   document
      .querySelectorAll('.flipv')
      .forEach((d) => d.addEventListener('click', flipVListener))
   // FLIP FRONT
   document
      .querySelectorAll('.flipf')
      .forEach((f) => f.addEventListener('click', flipFrontListener))
   // FLIP FRONT
   document
      .querySelectorAll('.flipb')
      .forEach((f) => f.addEventListener('click', flipBackListener))
   // DELETE HANDLE
   document
      .querySelectorAll('.delete-handle')
      .forEach((d) => d.addEventListener('click', deleteListener))
   // SHOW CONTROLLER LISTENERS
   document
      .querySelectorAll('.element')
      .forEach((e) => e.addEventListener('click', toggleControllerListener))

   // HIDE CONTROLLER LISTENERS
   document
      .querySelectorAll('.page')
      .forEach((p) => p.addEventListener('click', toggleControllerListener))
}

insertImage('assets/bird.png')

insertText(
   `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
)

refresh()
