import { registerInput } from './helpers.js'

export function create(value) {
   const el = document.createElement('textarea')
   el.value = value
   el.setAttribute('content', value)
   el.classList.add('reactive-text')
   return el.cloneNode(true)
}

export function init() {
   document.querySelectorAll('.reactive-text.item').forEach(function (ta) {
      ta.value = ta.getAttribute('content')
   })
   registerInput('.reactive-text.item', function (event) {
      const ta = event.target
      ta.setAttribute('content', ta.value)
   })
}
