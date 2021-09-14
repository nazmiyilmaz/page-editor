export const families = [
   'Abril Fat Face',
   'Anton',
   'Bevan',
   'Grandstander Regular',
   'Grandstander Bold',
   'Grenze Gotisch',
   'Josefin Sans Regular',
   'Josefin Sans Bold',
   'Lobster',
   'Open Sans Regular',
   'Open Sans Bold',
   'Paytone One',
]

export const sizes = {
   pace: 2,
   unit: 'px',
   min: 12,
   max: 102,
   default: 18,
}

export function init() {
   // setup fonts
   const fontPickers = document.querySelectorAll('.pe-change-font-select')
   for (const fpicker of fontPickers) {
      // remove all first
      clearSelect(fpicker)
      // insert options
      insertFontOptions(fpicker)
   }

   // setup sizes
   const sizePickers = document.querySelectorAll('.pe-change-font-size-select')
   for (const spicker of sizePickers) {
      // remove all first
      clearSelect(spicker)
      // insert options
      insertSizeOptions(spicker)
   }
}

function clearSelect(select) {
   const options = select.querySelectorAll('option')
   for (const opt of options) {
      opt?.remove()
   }
}

function insertFontOptions(picker) {
   for (const family of families) {
      const option = document.createElement('option')
      option.label = family
      option.value = family
      option.style.fontFamily = family
      picker.appendChild(option.cloneNode(true))
   }
}

function insertSizeOptions(picker) {
   for (let size = sizes.min; size < sizes.max; size += sizes.pace) {
      const option = document.createElement('option')
      option.label = size
      option.value = `${size}${sizes.unit}`
      picker.appendChild(option.cloneNode(true))
   }
}
