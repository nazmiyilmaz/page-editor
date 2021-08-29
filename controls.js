// controls
const controls = {
   image: ['flip-horizontal', 'flip-vertical', 'flip-back', 'flip-front'],
   text: [
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

import {
   queryParent,
   toggleFlipH,
   toggleFlipV,
   getMinZ,
   raiseAllElements,
   getMaxZ,
} from './helpers.js'

// FLIP FRONT
export function flipFront() {
   const el = document.querySelector('.element.is-active')
   const page = queryParent(el, 'page')
   const max = getMaxZ(page)
   el.style['z-index'] = max + 1
}

// FLIP BACK
export function flipBack() {
   const el = document.querySelector('.element.is-active')
   const page = queryParent(el, 'page')
   const min = getMinZ(page)
   if (min <= 0) {
      raiseAllElements(page, min)
      el.style['z-index'] = 0
   } else {
      el.style['z-index'] = min - 1
   }
}

// FLIP HORIZONTAL
export function flipHorizontal() {
   const el = document.querySelector('.element.is-active')
   const target = el.querySelector('.item')
   target.style.transform = toggleFlipH(target?.style?.transform)
}

// FLIP VERTICAL
export function flipVertical() {
   const el = document.querySelector('.element.is-active')
   const target = el.querySelector('.item')
   target.style.transform = toggleFlipV(target?.style?.transform)
}

// BOLD
export function toggleBold() {
   const el = document.querySelector('.element.is-active')
   const text = el.querySelector('.item')
   text.classList.toggle('is-bold')
}

// ITALIC
export function toggleItalic() {
   const el = document.querySelector('.element.is-active')
   const text = el.querySelector('.item')
   text.classList.toggle('is-italic')
}

// STRIKE
export function toggleStrike() {
   const el = document.querySelector('.element.is-active')
   const text = el.querySelector('.item')
   text.classList.toggle('is-strike')
}

// FONT FAMILY
export function changeFontFamily(event) {
   const el = document.querySelector('.element.is-active')
   const text = el.querySelector('.item')
   text.style.fontFamily = event.target.value
}

// FONT SIZE
export function changeFontSize(event) {
   const el = document.querySelector('.element.is-active')
   const text = el.querySelector('.item')
   text.style.fontSize = event.target.value
}

// COLOR
export function changeColor(event) {
   const el = document.querySelector('.element.is-active')
   const text = el.querySelector('.item')
   text.style.color = event.target.value
}

// SETUP ALIGN
export function setupAlign() {
   const alignPicker = document.getElementById('change-align')
   const selected = alignPicker.querySelector('.selected')
   const menu = alignPicker.querySelector('.menu')
   const rightAlg = menu.querySelector('.right-alg')
   const centerAlg = menu.querySelector('.center-alg')
   const leftAlg = menu.querySelector('.left-alg')

   alignPicker.addEventListener('click', function (event) {
      menu.classList.toggle('has-display-none')
   })

   rightAlg?.addEventListener('click', function (event) {
      selected.src = 'align-right.svg'
      alignText('right')
   })

   leftAlg?.addEventListener('click', function (event) {
      selected.src = 'align-left.svg'
      alignText('left')
   })

   centerAlg?.addEventListener('click', function (event) {
      selected.src = 'align-center.svg'
      alignText('center')
   })
}

// ALIGN TEXT
export function alignText(orientation) {
   const el = document.querySelector('.element.is-active')
   if (el) {
      const text = el.querySelector('.item')
      text.style.textAlign = orientation
   }
}

// DELETE
export function deleteItem(event) {
   const el = queryParent(event.target, 'element')
   if (el) {
      el.remove()
      hideAll()
   }
}

// SWITCH CONTROLLER
export function switchController(event) {
   const isDel = queryParent(event.target, 'delete-handle')

   if (isDel) {
      return
   }

   const el = queryParent(event.target, 'element')
   const page = queryParent(event.target, 'page')

   if (page) {
      page.querySelectorAll('.element').forEach(function (e) {
         e.classList.remove('is-active')
      })
   }

   if (el) {
      el.classList.add('is-active')

      if (el.classList.contains('is-image')) {
         openMenu('image')
      }

      if (el.classList.contains('is-text')) {
         openMenu('text')
         loadTextController()
      }
   } else {
      openMenu()
   }
}

function openMenu(type) {
   hideAll()
   let items = controls[type]
   if (items) {
      for (const item of items) {
         document.getElementById(item).style.display = 'unset'
      }
   }
}

function hideAll() {
   controller = document.getElementById('controller')
   controller.querySelectorAll('.el').forEach(function (el) {
      el.style.display = 'none'
   })
}

function loadTextController() {
   const el = document.querySelector('.element.is-active')

   const fontPicker = document.getElementById('change-font-select')
   const sizePicker = document.getElementById('change-font-size-select')
   const colorPicker = document.getElementById('change-color-picker')
   const boldToggle = document.getElementById('toggle-bold-btn')
   const italicToggle = document.getElementById('toggle-italic-btn')
   const strikeToggle = document.getElementById('toggle-strike-btn')
   const alignSelected = document
      .getElementById('change-align')
      .querySelector('.selected')

   const text = el.querySelector('.item')

   // load font family
   fontPicker.value = text.style.fontFamily

   // load font size
   sizePicker.value = text.style.fontSize

   // load color
   colorPicker.value = text.style.color

   // load bold
   boldToggle.checked = text.classList.contains('is-bold')

   // load italic
   italicToggle.checked = text.classList.contains('is-italic')

   // load strike
   strikeToggle.checked = text.classList.contains('is-strike')

   // load align
   alignSelected.src = `align-${text.style.textAlign || 'left'}.svg`
}
