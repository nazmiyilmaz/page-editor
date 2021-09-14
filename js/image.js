export function create(src) {
   const image = document.createElement('img')
   image.src = src
   return image.cloneNode(true)
}

export function init() {}

export function load(editor) {
   // find element
   const el = editor.querySelector('.pe-element.pe-is-active')

   // find item
   const image = el.querySelector('.pe-item')

   // load alpha
   const alphaSlider = editor.querySelector('.pe-alpha-slider')
   const alpha = isNaN(parseFloat(image.style.opacity))
      ? 1
      : parseFloat(image.style.opacity)
   alphaSlider.value = alpha * 100
}
