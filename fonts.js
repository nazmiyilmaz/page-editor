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

export function setupFonts() {
   // setup families
   const fontPicker = document.getElementById('change-font-select')
   for (const family of families) {
      const option = document.createElement('option')
      option.label = family[0]
      option.value = family[1]
      fontPicker.appendChild(option.cloneNode(true))
   }

   // setup sizes
   const sizePicker = document.getElementById('change-font-size-select')
   for (let size = sizes.min; size < sizes.max; size += sizes.pace) {
      const option = document.createElement('option')
      option.label = size
      option.value = `${size}${sizes.unit}`
      sizePicker.appendChild(option.cloneNode(true))
   }
}
