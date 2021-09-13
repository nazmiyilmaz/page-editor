import { registerClick, registerChange } from './helpers.js'

import { setDrag, setResize, setRotate } from './interact.js'

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

import { deleteItem } from './controller.js'

import { init as initFonts } from './fonts.js'
import { init as initHistory, undoListener, redoListener } from './history.js'
import { init as initKeyboard } from './keyboard.js'
import { init as initAudio } from './audio.js'
import { init as initTextAreaElements } from './textarea.js'

export function reload() {
   // CONTROLLER
   // delete-handle
   registerClick('.pe-delete-handle', deleteItem)
   // drag listener
   setDrag('.pe-move-handle')
   // rotate listener
   setRotate('.pe-rotate-handle')
   // resize listener
   setResize('.pe-controller.is-resizable')

   // TOOLBAR
   // setup align
   setupAlign()
   // setup alpha
   setupAlpha()
   // change font
   registerChange('.pe-change-font-select', changeFontFamily)
   // change size
   registerChange('.pe-change-font-size-select', changeFontSize)
   // change color
   registerChange('.pe-change-color-picker', changeColor)
   // toggle bold
   registerClick('.pe-toggle-bold', toggleBold)
   // toggle italic
   registerClick('.pe-toggle-italic', toggleItalic)
   // toggle strike
   registerClick('.pe-toggle-strike', toggleStrike)
   // flip horizontal
   registerClick('.pe-flip-horizontal', flipHorizontal)
   // flip vertical
   registerClick('.pe-flip-vertical', flipVertical)
   // flip front
   registerClick('.pe-flip-front', flipFront)
   // flip back
   registerClick('.pe-flip-back', flipBack)

   // TOOLBAR TOGGLE
   // toggle toolbar
   registerClick('.pe-editor .element', toggleToolbar)
   // hide toolbar
   registerClick('.pe-editor .pe-page', toggleToolbar)

   // INIT AUDIO
   initAudio()

   // INIT TEXT AREAS
   initTextAreaElements()

   // INIT FONTS
   initFonts()

   // INIT KEYBOARD
   initKeyboard()

   // INIT HISTORY
   initHistory()
   registerClick('.pe-undo', undoListener)
   registerClick('.pe-redo', redoListener)
}

window.onload = () => reload()
