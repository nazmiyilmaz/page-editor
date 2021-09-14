import { getEditor, registerInput, rgbToHex } from './helpers.js'

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
   // find texts
   const texts = document.querySelectorAll(
      '.pe-preview .pe-element.is-text .item'
   )
   // load slots
   for (const text of texts) {
      text.innerText = text.getAttribute('content')
      text.readOnly = true
   }
   // sync value with content attr
   document.querySelectorAll('.reactive-text.item').forEach(function (ta) {
      ta.value = ta.getAttribute('content')
   })
   // sync value with content attr
   registerInput('.reactive-text.item', function (event) {
      const ta = event.target
      ta.setAttribute('content', ta.value)
   })
}

export function load(editor) {
   // find element
   const el = editor.querySelector('.pe-element.is-active')

   // find item
   const text = el.querySelector('.item')

   // load font family
   const fontPicker = editor.querySelector('.pe-change-font-select')
   fontPicker.value = text.style.fontFamily

   // load font size
   const sizePicker = editor.querySelector('.pe-change-font-size-select')
   sizePicker.value = text.style.fontSize

   // load color
   const colorPicker = editor.querySelector('.pe-change-color-picker')
   colorPicker.value = rgbToHex(text.style.color) || '#000000'
   updateFontColorIndicator(editor, text.style.color || '#000000')

   // load bold
   const boldToggle = editor.querySelector('.pe-toggle-bold-btn')
   boldToggle.checked = text.classList.contains('is-bold')

   // load italic
   const italicToggle = editor.querySelector('.pe-toggle-italic-btn')
   italicToggle.checked = text.classList.contains('is-italic')

   // load strike
   const strikeToggle = editor.querySelector('.pe-toggle-strike-btn')
   strikeToggle.checked = text.classList.contains('is-strike')

   // load align
   const alignSelected = editor.querySelector('.pe-change-align .selected')
   alignSelected.src = `icos/align-${text.style.textAlign || 'left'}.svg`

   // load alpha
   const alphaSlider = editor.querySelector('.pe-alpha-slider')
   const alpha = isNaN(parseFloat(text.style.opacity))
      ? 1
      : parseFloat(text.style.opacity)
   alphaSlider.value = alpha * 100
}

// UPDATE FONT COLOR INDICATOR
export function updateFontColorIndicator(editor, color) {
   const indicator = editor.querySelector('.pe-color-indicator')
   indicator.style.backgroundColor = color
}
