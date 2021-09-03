import { setDrag, setDropZone, setResize, setRotate } from './interact.js'

import {
   changeColor,
   changeFontFamily,
   changeFontSize,
   flipBack,
   flipFront,
   flipHorizontal,
   flipVertical,
   toggleToolbar,
   toggleBold,
   toggleItalic,
   toggleStrike,
   setupAlign,
   setupAlpha,
} from './toolbar.js'

import { registerClick, registerChange } from './helpers.js'
import { setupFonts } from './fonts.js'
import keyboard from './keyboard.js'

import { init as initHistory, undo, redo } from './history.js'
import { init as initAudio } from './audio.js'

import { deleteItem } from './controller.js'

// INIT AUDIO
initAudio()

// TOGGLE TOOLBAR
registerClick('#editor .element', toggleToolbar)

// SET PAGE AS DROPZONE
setDropZone('#editor .page')

// SET RESIZABLE ELEMENTS
setResize('#controller.is-resizable')

// SET DRAG OF ELEMENTS
setDrag('#move-handle')

// SET ROTATE OF ELEMENTS
setRotate('#rotate-handle')

// DELETE HANDLE
registerClick('#delete-handle', deleteItem)

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

// HIDE TOOLBAR
registerClick('#editor .page', toggleToolbar)

// REGISTER UNDO REDO
registerClick('#undo', undo)
registerClick('#redo', redo)

// INIT HISTORY
initHistory()
