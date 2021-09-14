export const families = [
   ['Open Sans', '"Open Sans", sans-serif'],
   ['Bungee', '"Bungee", cursive'],
   ['Lilita One', '"Lilita One", cursive'],
   ['Pollar One', '"Pollar One", cursive'],
   ['Courier', '"Courier Prime", monospace'],
   ['Shrikhand', '"Shrikhand", cursive'],
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
      option.label = family[0]
      option.value = family[1]
      option.style.fontFamily = family[1]
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
