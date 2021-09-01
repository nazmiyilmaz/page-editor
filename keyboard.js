import { undo, redo } from './history.js'

export default function init() {
   document.addEventListener('keydown', function (event) {
      // CTRL+Z
      if (event.ctrlKey && event.key === 'z') undo()

      // CTRL+Y
      if (event.ctrlKey && event.key === 'y') redo()
   })
}
