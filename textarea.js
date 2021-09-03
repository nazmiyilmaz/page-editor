import { registerInput, rgbToHex } from './helpers.js'

import { families, sizes } from './fonts.js'

export function create(value) {
   const text = document.createElement('textarea')
   text.value = value
   text.setAttribute('content', value)
   text.classList.add('reactive-text')
   text.style.fontFamily = families[0][1]
   text.style.fontSize = `${sizes.default}${sizes.unit}`
   text.spellcheck = false
   return text.cloneNode(true)
}

// INIT
export function init() {
   document.querySelectorAll('.reactive-text.item').forEach(function (ta) {
      ta.value = ta.getAttribute('content')
   })
   registerInput('.reactive-text.item', function (event) {
      const ta = event.target
      ta.setAttribute('content', ta.value)
   })
}

// INIT PREVIEW
export function initPreview() {
   // find preview page
   const page = document.querySelector('#preview .page')

   // find texts
   const texts = page?.querySelectorAll('.element.is-text .item')

   // load slots
   for (const text of texts) {
      text.innerText = text.getAttribute('content')
      text.readOnly = true
   }
}

export function load() {
   // find element
   const el = document.querySelector('#editor .element.is-active')

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
   updateFontColorIndicator(text.style.color || '#000000')

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

// UPDATE FONT COLOR INDICATOR
export function updateFontColorIndicator(color) {
   const indicator = document.getElementById('color-indicator')
   indicator.style.backgroundColor = color
}
