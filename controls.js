// CONTROLLER LIST FOR DIFFERENT TYPE OF ELEMETS
const controls = {
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
}

import { markState } from './history.js'
import {
   queryParent,
   toggleFlipH,
   toggleFlipV,
   getMinZ,
   raiseAllElements,
   getMaxZ,
   rgbToHex,
} from './helpers.js'

// FLIP FRONT
export function flipFront() {
   // find element
   const el = document.querySelector('.element.is-active')

   // find page
   const page = document.getElementById('active-page')

   // get max index
   const max = getMaxZ(page)

   // set a value more than max
   el.style['z-index'] = max + 1

   // mark state
   markState()
}

// FLIP BACK
export function flipBack() {
   // find element
   const el = document.querySelector('.element.is-active')

   // find page
   const page = document.getElementById('active-page')

   // find minimum index
   const min = getMinZ(page)

   // if index is negative
   if (min <= 0) {
      // raise others
      raiseAllElements(page, min)
      // put current below
      el.style['z-index'] = 0
   }
   // else
   else {
      // decrease z to a value less than minimum
      el.style['z-index'] = min - 1
   }

   // mark state
   markState()
}

// FLIP HORIZONTAL
export function flipHorizontal() {
   // find element
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

   // find item
   const text = el.querySelector('.item')

   // change color
   text.style.color = `${event.target.value}`

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
   const el = document.querySelector('.element.is-active')

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
   const el = document.querySelector('.element.is-active')

   // find item
   const item = el.querySelector('.item')

   // change opacity
   item.style.opacity = val / 100

   // mark state
   markState()
}

// DELETE
export function deleteItem(event) {
   // find element
   const el = queryParent(event.target, 'element')

   // check if element exists
   if (el) {
      // remove element
      el.remove()
      // hide control components
      hideAll()
   }

   // mark state
   markState()
}

// SWITCH CONTROLLER
export function switchController(event) {
   // de-activate all elements at first
   const page = document.getElementById('active-page')
   page.querySelectorAll('.element').forEach(function (e) {
      e.classList.remove('is-active')
   })

   // check if click origin is delete button
   const isDel = queryParent(event.target, 'delete-handle')

   // if origin is delete button then return
   if (isDel) {
      hideAll()
      return
   }

   // check if click origin is page
   const isPage = event.target.id === 'active-page'

   // if origin is page then de activate all elements and return
   if (isPage) {
      hideAll()
      return
   }

   // set active class
   const el = queryParent(event.target, 'element')
   el.classList.add('is-active')

   // open menu
   openMenu()
}

// OPEN MENU FOR SPECIFIC TYPE OF ELEMENT
export function openMenu() {
   // hide all at first
   hideAll()

   // find element
   const el = document.querySelector('.element.is-active')

   // if no element is active return
   if (!el) {
      return
   }

   // init type
   let type

   // assign type
   if (el.classList.contains('is-image')) type = 'image'
   if (el.classList.contains('is-text')) type = 'text'

   // get controller based on type
   const items = controls[type]
   if (items) {
      // show all related controllers
      for (const item of items) {
         document.getElementById(item).style.display = 'unset'
      }
   }

   // load settings of item
   loadController(type)
}

// HIDE ALL CONTROLLER ITEMS
function hideAll() {
   // find controller
   const controller = document.getElementById('element-controller')

   // set display none to all controller components
   controller?.querySelectorAll('.el').forEach(function (el) {
      el.style.display = 'none'
   })
}

// SET VALUES OF ELEMENT IN THE CONTROLLER
function loadController(type) {
   // LOAD TEXT CONTROLLER
   if (type === 'text') {
      // find element
      const el = document.querySelector('.element.is-active')

      // find item
      const text = el.querySelector('.item')

      // load font family
      const fontPicker = document.getElementById('change-font-select')
      fontPicker.value = text.style.fontFamily

      // load font size
      const sizePicker = document.getElementById('change-font-size-select')
      sizePicker.value = text.style.fontSize

      // load color
      const colorPicker = document.getElementById('change-color-picker')
      colorPicker.value = rgbToHex(text.style.color) || '#000000'

      // load bold
      const boldToggle = document.getElementById('toggle-bold-btn')
      boldToggle.checked = text.classList.contains('is-bold')

      // load italic
      const italicToggle = document.getElementById('toggle-italic-btn')
      italicToggle.checked = text.classList.contains('is-italic')

      // load strike
      const strikeToggle = document.getElementById('toggle-strike-btn')
      strikeToggle.checked = text.classList.contains('is-strike')

      // load align
      const alignSelected = document
         .getElementById('change-align')
         .querySelector('.selected')
      alignSelected.src = `icos/align-${text.style.textAlign || 'left'}.svg`

      // load alpha
      const alphaSlider = document.getElementById('alpha-slider')
      const alpha = isNaN(parseFloat(text.style.opacity))
         ? 1
         : parseFloat(text.style.opacity)
      alphaSlider.value = alpha * 100
   }
   // LOAD IMAGE CONTROLLER
   if (type === 'image') {
      // find element
      const el = document.querySelector('.element.is-active')

      // find item
      const image = el.querySelector('.item')

      // load alpha
      const alphaSlider = document.getElementById('alpha-slider')
      const alpha = isNaN(parseFloat(image.style.opacity))
         ? 1
         : parseFloat(image.style.opacity)
      alphaSlider.value = alpha * 100
   }
}
