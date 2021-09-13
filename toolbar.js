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
   audio: ['flip-back', 'flip-front'],
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
   getEditor,
} from './helpers.js'

import { load as loadAudio } from './audio.js'
import { load as loadText, updateFontColorIndicator } from './textarea.js'
import { load as loadImage } from './image.js'

import {
   locate as locateController,
   hide as hideController,
} from './controller.js'

// FLIP FRONT
export function flipFront(event) {
   // get editor
   const editor = getEditor(event.target)
   // find element
   const element = editor.querySelector('.element.is-active')
   // find page
   const page = editor.querySelector('.pe-page')
   // get max index
   const max = getMaxZ(page)
   // set a value more than max
   element.style['z-index'] = max + 1
   // mark state
   markState(editor)
}

// FLIP BACK
export function flipBack(event) {
   // get editor
   const editor = getEditor(event.target)
   // find element
   const element = editor.querySelector('.element.is-active')
   // find page
   const page = editor.querySelector('.pe-page')
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
   markState(editor)
}

// FLIP HORIZONTAL
export function flipHorizontal(event) {
   // get editor
   const editor = getEditor(event.target)
   // find target
   const target = editor.querySelector('.element.is-active .item')
   // flip item horizontally
   target.style.transform = toggleFlipH(target?.style?.transform)
   // mark state
   markState(editor)
}

// FLIP VERTICAL
export function flipVertical() {
   // get editor
   const editor = getEditor(event.target)
   // find target
   const target = editor.querySelector('.element.is-active .item')
   // flip item vertically
   target.style.transform = toggleFlipV(target?.style?.transform)
   // mark state
   markState(editor)
}

// BOLD
export function toggleBold(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.element.is-active .item')
   // toggle bold
   text.classList.toggle('is-bold')
   // update checkbox value
   const cb = editor.querySelector('.pe-toggle-bold-btn')
   cb.checked = !cb.checked
   // mark state
   markState(editor)
}

// ITALIC
export function toggleItalic(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.element.is-active .item')
   // toggle italic
   text.classList.toggle('is-italic')
   // update checkbox value
   const cb = editor.querySelector('.pe-toggle-italic-btn')
   cb.checked = !cb.checked
   // mark state
   markState(editor)
}

// STRIKE
export function toggleStrike(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.element.is-active .item')
   // toggle strike
   text.classList.toggle('is-strike')
   // update checkbox value
   const cb = editor.querySelector('.pe-toggle-strike-btn')
   cb.checked = !cb.checked
   // mark state
   markState(editor)
}

// FONT FAMILY
export function changeFontFamily(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.element.is-active .item')
   // change font
   text.style.fontFamily = event.target.value
   // mark state
   markState(editor)
}

// FONT SIZE
export function changeFontSize(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.element.is-active .item')
   // change font size
   text.style.fontSize = event.target.value
   // mark state
   markState(editor)
}

// COLOR
export function changeColor(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.element.is-active .item')
   // change color
   text.style.color = `${event.target.value}`
   // update indicator
   updateFontColorIndicator(event, text.style.color)
   // mark state
   markState(editor)
}

// SETUP ALIGN
export function setupAlign() {
   // find related components
   const pickers = document.querySelectorAll('.tool.pe-change-align')

   for (const alg of pickers) {
      // show menu when clicked to the align picker
      alg.addEventListener('click', function (event) {
         // register toggle menu
         const current = queryParent(event.target, 'pe-change-align')
         const menu = current.querySelector('.menu')
         menu.classList.toggle('has-display-none')
      })
      // right
      const right = alg.querySelector('.right-alg')
      right?.addEventListener('click', function (event) {
         const current = queryParent(event.target, 'pe-change-align')
         const selected = current.querySelector('.selected')
         selected.src = 'icos/align-right.svg'
         alignText(event, 'right')
      })
      // left
      const left = alg.querySelector('.left-alg')
      left?.addEventListener('click', function (event) {
         const current = queryParent(event.target, 'pe-change-align')
         const selected = current.querySelector('.selected')
         selected.src = 'icos/align-left.svg'
         alignText(event, 'left')
      })
      // center
      const center = alg.querySelector('.center-alg')
      center?.addEventListener('click', function (event) {
         const current = queryParent(event.target, 'pe-change-align')
         const selected = current.querySelector('.selected')
         selected.src = 'icos/align-center.svg'
         alignText(event, 'center')
      })
   }
}

// ALIGN TEXT
export function alignText(event, orientation) {
   // get editor
   const editor = getEditor(event.target)
   // find element
   const text = editor.querySelector('.element.is-active .item')
   // change align
   text.style.textAlign = orientation
   // mark state
   markState(editor)
}

// SETUP ALPHA
export function setupAlpha() {
   const pickers = document.querySelectorAll('.pe-change-alpha')

   for (const alp of pickers) {
      // show slider when clicked to the alpha picker
      alp.addEventListener('click', function (event) {
         const current = queryParent(event.target, 'pe-change-alpha')
         const menu = current.querySelector('.menu')
         menu.classList.toggle('has-display-none')
      })

      // slider
      const slider = alp.querySelector('.pe-alpha-slider')
      slider?.addEventListener('change', function (event) {
         setAlpha(event, event.target.value)
      })
   }
}

// SET ALPHA
export function setAlpha(event, val) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const item = editor.querySelector('.element.is-active .item')
   // change opacity
   item.style.opacity = val / 100
   // mark state
   markState(editor)
}

// TOGGLE TOOLBAR
export function toggleToolbar(event) {
   // check if origin is delete button
   const isControl = queryParent(event.target, 'pe-controller')
   // check if click origin is delete button
   const isDel = queryParent(event.target, 'pe-delete-handle')
   // ignore if the origin is controller
   if (isControl && !isDel) {
      return
   }
   // hide controller
   hideController(event)
   // de-activate all elements at first
   deActivateAll(event)
   // if origin is delete button then return
   if (isDel) {
      hideAll(event)
      return
   }
   // check if click origin is page
   const isPage = event.target.classList.contains('pe-page')
   // if origin is page then de activate all elements and return
   if (isPage) {
      hideAll(event)
      return
   }
   // set active class
   const el = queryParent(event.target, 'element')
   const type = resolveType(el)
   el?.classList.add('is-active')
   locateController(event, type)
   // open menu
   openMenu(event)
}

// OPEN MENU FOR SPECIFIC TYPE OF ELEMENT
export function openMenu(event) {
   // hide all at first
   hideAll(event)
   // get editor
   const editor = getEditor(event.target)
   // find element
   const el = editor.querySelector('.element.is-active')
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
         editor.querySelector(`.pe-${item}`).style.display = 'unset'
      }
   }
   // load settings of item
   loadToolbar(event, type)
}

// HIDE ALL TOOLBAR ITEMS
export function hideAll(event) {
   // get editor
   const editor = getEditor(event?.target || event)
   // find toolbar
   const toolbar = editor.querySelector('.pe-options-toolbar')
   // set display none to all toolbar components
   toolbar?.querySelectorAll('.tool').forEach(function (el) {
      el.style.display = 'none'
   })
}

// DE ACTIVATE ALL ELEMENTS
export function deActivateAll(event) {
   // get editor
   const editor = getEditor(event?.target || event)
   // get page
   const page = editor.querySelector('.pe-page')
   page.querySelectorAll('.element').forEach(function (e) {
      e.classList.remove('is-active')
   })
}

// SET VALUES OF ELEMENT IN THE TOOLBAR
function loadToolbar(event, type) {
   // LOAD TEXT TOOLBAR
   if (type === 'text') {
      loadText(event)
   }
   // LOAD IMAGE TOOLBAR
   if (type === 'image') {
      loadImage(event)
   }
   // LOAD AUDIO TOOLBAR
   if (type === 'audio') {
      loadAudio(event)
   }
}
