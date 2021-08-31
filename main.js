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

import { insertImage, insertText, changeBackground } from './actions.js'

import { registerClick, registerChange } from './helpers.js'

import { setupFonts } from './fonts.js'

// SET PAGES AS DROPZONES
setDropZone('#active-page')

// SET RESIZABLE ELEMENTS
setResize('.element.is-image', {
   top: '.thumb.tl, .thumb.tr',
   left: '.thumb.tl, .thumb.bl',
   bottom: '.thumb.br, .thumb.bl',
   right: '.thumb.br, .thumb.tr',
})

setResize('.element.is-text', {
   top: '.thumb.tl, .thumb.tr',
   left: '.thumb.tl, .thumb.bl',
   bottom: '.thumb.br, .thumb.bl',
   right: '.thumb.br, .thumb.tr',
})

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

// REFRESH PAGE
function refresh() {
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

   // DELETE HANDLE
   registerClick('.delete-handle', deleteItem)

   // SWITCH CONTROLLER
   registerClick('.element', switchController)

   // HIDE CONTROLLER
   registerClick('#active-page', switchController)
}

setTimeout(() => {
   insertImage('assets/bird.png')

   insertImage('assets/pineapple.png')

   //insertText(`Lorem Ipsum is simply dummy text`)

   insertText(
      `Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text`
   )

   changeBackground('assets/page.jpg')

   refresh()
}, 1000)
