import { undo, redo } from './history.js'

import { copy, cut, paste } from './clipboard.js'

export default function init() {
   document.addEventListener('keydown', function (event) {
      // CTRL+Z
      if (event.ctrlKey && event.key === 'z') undo()

      // CTRL+Y
      if (event.ctrlKey && event.key === 'y') redo()

      // CTRL+C
      if (event.ctrlKey && event.key === 'c') copy()

      // CTRL+X
      if (event.ctrlKey && event.key === 'x') cut()

      // CTRL+V
      if (event.ctrlKey && event.key === 'v') paste()
   })
}
