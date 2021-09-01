import { setDrag, setDropZone, setResize, setRotate } from './interact.js'

import {
   changeColor,
   changeFontFamily,
   changeFontSize,
   deleteItem,
   flipBack,
   flipFront,
   flipHorizontal,
   flipVertical,
   switchController,
   toggleBold,
   toggleItalic,
   toggleStrike,
   setupAlign,
   setupAlpha,
} from './controls.js'

import { registerClick, registerChange } from './helpers.js'
import { setupFonts } from './fonts.js'
import keyboard from './keyboard.js'

import { init as initHistory, undo, redo } from './history.js'

// SWITCH CONTROLLER
registerClick('.element', switchController)

// DELETE HANDLE
registerClick('.delete-handle', deleteItem)

// SET PAGE AS DROPZONE
setDropZone('#active-page')

// SET RESIZABLE ELEMENTS
setResize('.element.is-image')
setResize('.element.is-text')

// SET DRAG OF ELEMENTS
setDrag('.move-handle')

// SET ROTATE OF ELEMENTS
setRotate('.rotation-handle')

// SETUP ALIGN DROPDOWN
setupAlign()

// SETUP ALPHA
setupAlpha()

// SETUP FONTS
setupFonts()

// INIT KEYBOARD EVENTS
keyboard()

// CHANGE FONT
registerChange('#change-font', changeFontFamily)

// CHANGE FONT SIZE
registerChange('#change-font-size', changeFontSize)

// CHANGE COLOR
registerChange('#change-color', changeColor)

// TOGGLE BOLD TEXT
registerChange('#toggle-bold', toggleBold)

// TOGGLE ITALIC TEXT
registerChange('#toggle-italic', toggleItalic)

// TOGGLE STRIKE TEXT
registerChange('#toggle-strike', toggleStrike)

// FLIP HORIZONTAL
registerClick('#flip-horizontal', flipHorizontal)

// FLIP VERTICAL
registerClick('#flip-vertical', flipVertical)

// FLIP FRONT
registerClick('#flip-front', flipFront)

// FLIP BACK
registerClick('#flip-back', flipBack)

// HIDE CONTROLLER
registerClick('#active-page', switchController)

// REGISTER UNDO REDO
registerClick('#undo', undo)
registerClick('#redo', redo)

// INIT HISTORY
initHistory()
