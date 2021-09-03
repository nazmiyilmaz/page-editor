// TOOL LIST FOR DIFFERENT TYPE OF ELEMETS
const tools = {
   image: [
      'flip-horizontal',
      'flip-vertical',
      'flip-back',
      'flip-front',
      'change-alpha',
   ],
   text: [
      'change-alpha',
      'change-font',
      'change-font-size',
      'change-color',
      'change-align',
      'toggle-bold',
      'toggle-italic',
      'toggle-strike',
      'flip-back',
      'flip-front',
   ],
   audio: ['audio-playback', 'flip-back', 'flip-front'],
}

import { markState } from './history.js'
import {
   queryParent,
   toggleFlipH,
   toggleFlipV,
   getMinZ,
   raiseAllElements,
   getMaxZ,
   resolveType,
   queryParentById,
} from './helpers.js'

import { load as loadAudio, resetPlayback } from './audio.js'
import { load as loadText, updateFontColorIndicator } from './textarea.js'
import { load as loadImage } from './image.js'

import {
   locate as locateController,
   hide as hideController,
} from './controller.js'

// FLIP FRONT
export function flipFront() {
   // find element
   const element = document.querySelector('#editor .element.is-active')

   // find page
   const page = document.querySelector('#editor .page')

   // get max index
   const max = getMaxZ(page)

   // set a value more than max
   element.style['z-index'] = max + 1

   // mark state
   markState()
}

// FLIP BACK
export function flipBack() {
   // find element
   const element = document.querySelector('#editor .element.is-active')

   // find page
   const page = document.querySelector('#editor .page')

   // find minimum index
   const min = getMinZ(page)

   // if index is negative
   if (min <= 0) {
      // raise others
      raiseAllElements(page)
      // put current below
      element.style['z-index'] = 0
   }
   // else
   else {
      // decrease z to a value less than minimum
      element.style['z-index'] = min - 1
   }

   // mark state
   markState()
}

// FLIP HORIZONTAL
export function flipHorizontal() {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const target = el.querySelector('.item')

   // flip item horizontally
   target.style.transform = toggleFlipH(target?.style?.transform)

   // mark state
   markState()
}

// FLIP VERTICAL
export function flipVertical() {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const target = el.querySelector('.item')

   // flip item vertically
   target.style.transform = toggleFlipV(target?.style?.transform)

   // mark state
   markState()
}

// BOLD
export function toggleBold() {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const text = el.querySelector('.item')

   // toggle bold
   text.classList.toggle('is-bold')

   // mark state
   markState()
}

// ITALIC
export function toggleItalic() {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const text = el.querySelector('.item')

   // toggle bold
   text.classList.toggle('is-italic')

   // mark state
   markState()
}

// STRIKE
export function toggleStrike() {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const text = el.querySelector('.item')

   // toggle bold
   text.classList.toggle('is-strike')

   // mark state
   markState()
}

// FONT FAMILY
export function changeFontFamily(event) {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const text = el.querySelector('.item')

   // change font
   text.style.fontFamily = event.target.value

   // mark state
   markState()
}

// FONT SIZE
export function changeFontSize(event) {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const text = el.querySelector('.item')

   // change font size
   text.style.fontSize = event.target.value

   // mark state
   markState()
}

// COLOR
export function changeColor(event) {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const text = el.querySelector('.item')

   // change color
   text.style.color = `${event.target.value}`

   // update indicator
   updateFontColorIndicator(text.style.color)

   // mark state
   markState()
}

// SETUP ALIGN
export function setupAlign() {
   // find related components
   const alignPicker = document.getElementById('change-align')
   const selected = alignPicker.querySelector('.selected')
   const menu = alignPicker.querySelector('.menu')
   const rightAlg = menu.querySelector('.right-alg')
   const centerAlg = menu.querySelector('.center-alg')
   const leftAlg = menu.querySelector('.left-alg')

   // show menu when clicked to the align picker
   alignPicker.addEventListener('click', function (event) {
      menu.classList.toggle('has-display-none')
   })

   // right align item
   rightAlg?.addEventListener('click', function (event) {
      selected.src = 'icos/align-right.svg'
      alignText('right')
   })

   // left align item
   leftAlg?.addEventListener('click', function (event) {
      selected.src = 'icos/align-left.svg'
      alignText('left')
   })

   // center align item
   centerAlg?.addEventListener('click', function (event) {
      selected.src = 'icos/align-center.svg'
      alignText('center')
   })
}

// ALIGN TEXT
export function alignText(orientation) {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const text = el.querySelector('.item')

   // change align
   text.style.textAlign = orientation

   // mark state
   markState()
}

// SETUP ALPHA
export function setupAlpha() {
   // find related components
   const alphaPicker = document.getElementById('change-alpha')
   const menu = alphaPicker.querySelector('.menu')
   const alphaSlider = document.getElementById('alpha-slider')

   // show slider when clicked to the alpha picker
   alphaPicker.addEventListener('click', function (event) {
      menu.classList.toggle('has-display-none')
   })

   // update opacity when there is a change
   alphaSlider.addEventListener('change', function (event) {
      setAlpha(event.target.value)
   })
}

// SET ALPHA
export function setAlpha(val) {
   // find element
   const el = document.querySelector('#editor .element.is-active')

   // find item
   const item = el.querySelector('.item')

   // change opacity
   item.style.opacity = val / 100

   // mark state
   markState()
}

// DE ACTIVATE ALL ELEMENTS
export function deActivateAll() {
   const page = document.querySelector('#editor .page')
   page.querySelectorAll('.element').forEach(function (e) {
      e.classList.remove('is-active')
   })
}

// TOGGLE TOOLBAR
export function toggleToolbar(event) {
   // check if origin is delete button
   const isControl = queryParentById(event.target, 'controller')
   // check if click origin is delete button
   const isDel = queryParentById(event.target, 'delete-handle')

   // ignore if the origin is controller
   if (isControl && !isDel) {
      return
   }

   // hide controller
   hideController()
   // reset audio playback
   resetPlayback()

   // de-activate all elements at first
   deActivateAll()

   // if origin is delete button then return
   if (isDel) {
      hideAll()
      return
   }

   // check if click origin is page
   const isPage = event.target.classList.contains('page')

   // if origin is page then de activate all elements and return
   if (isPage) {
      hideAll()
      return
   }

   // set active class
   const el = queryParent(event.target, 'element')
   const type = resolveType(el)
   el?.classList.add('is-active')
   locateController(type)

   // open menu
   openMenu()
}

// OPEN MENU FOR SPECIFIC TYPE OF ELEMENT
export function openMenu() {
   // hide all at first
   hideAll()

   // find element
   const el = document.querySelector('#editor .element.is-active')

   // if no element is active return
   if (!el) {
      return
   }

   // init type
   const type = resolveType(el)

   // get tool list based on type
   const items = tools[type]
   if (items) {
      // show all related tools
      for (const item of items) {
         document.getElementById(item).style.display = 'unset'
      }
   }

   // load settings of item
   loadToolbar(type)
}

// HIDE ALL TOOLBAR ITEMS
export function hideAll() {
   // find toolbar
   const toolbar = document.getElementById('options-toolbar')

   // set display none to all toolbar components
   toolbar?.querySelectorAll('.tool').forEach(function (el) {
      el.style.display = 'none'
   })
}

// SET VALUES OF ELEMENT IN THE TOOLBAR
function loadToolbar(type) {
   // LOAD TEXT TOOLBAR
   if (type === 'text') {
      loadText()
   }
   // LOAD IMAGE TOOLBAR
   if (type === 'image') {
      loadImage()
   }
   // LOAD AUDIO TOOLBAR
   if (type === 'audio') {
      loadAudio()
   }
}
