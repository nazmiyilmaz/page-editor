// RGB TO HEX
export function rgbToHex(rgb) {
   if (!rgb) {
      return null
   }
   const rgbRegex = /rgb\((.*?), (.*?), (.*?)\)/

   const match = rgbRegex.exec(rgb)

   const r = match[1]
   const g = match[2]
   const b = match[3]

   const componentToHex = (c) => {
      const hex = parseInt(c, 10).toString(16)
      return hex.length == 1 ? `0${hex}` : hex
   }
   return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

// REPLACE TRANSLATE VALUE
export function replaceTranslate(str, x, y) {
   if (!str) {
      return `translate(${x}px,${y}px)`
   }
   const translateRegex = /translate\(.*px,.*px\)/
   if (!translateRegex.exec(str)?.length) {
      return `${str} translate(${x}px,${y}px)`
   }
   return `${str}`.replace(translateRegex, `translate(${x}px,${y}px)`)
}

// REPLACE ROTATE VALUE
export function replaceRotate(str, rad) {
   if (!str) {
      return `rotate(${rad}rad)`
   }
   const rotateRegex = /rotate\(.*rad\)/
   if (!rotateRegex.exec(str)?.length) {
      return `${str} rotate(${rad}rad)`
   }
   return `${str}`.replace(rotateRegex, `rotate(${rad}rad)`)
}

// TOGGLE FLIP HORIZONTAL
export function toggleFlipH(str) {
   if (!str) {
      return `scaleX(-1)`
   }
   const flipRegex = /scaleX\(-1\)/
   if (!flipRegex.exec(str)?.length) {
      return `${str} scaleX(-1)`
   }
   return `${str}`.replace(flipRegex, '')
}

// TOGGLE FLIP VERTICAL
export function toggleFlipV(str) {
   if (!str) {
      return `scaleY(-1)`
   }
   const flipRegex = /scaleY\(-1\)/
   if (!flipRegex.exec(str)?.length) {
      return `${str} scaleY(-1)`
   }
   return `${str}`.replace(flipRegex, '')
}

// GET DRAG ANGLE
export function getDragAngle(event, el) {
   // start value
   const startAngle = parseFloat(el.getAttribute('data-angle')) || 0

   // find center
   const x = parseFloat(el.getAttribute('data-center-x')) || 0
   const y = parseFloat(el.getAttribute('data-center-y')) || 0

   // calc angle
   const angle = Math.atan2(y - event.clientY, x - event.clientX)

   // return difference
   return angle - startAngle
}

// GET EDITOR
export function getEditor(el) {
   let depth = 0
   while (!el?.classList?.contains('pe-editor')) {
      el = el?.parentElement
      depth++
      if (depth >= 30) {
         return null
      }
   }
   return el
}

// GET CLOSEST PARENT
export function queryParent(el, cls) {
   let depth = 0
   while (!el?.classList?.contains(cls)) {
      el = el?.parentElement
      depth++
      if (depth >= 12 || el?.id === 'editor') {
         return null
      }
   }
   return el
}

// QUERY PARENT BY ID
export function queryParentById(el, id) {
   let depth = 0
   while (el?.id !== id) {
      el = el?.parentElement
      depth++
      if (depth >= 12 || el?.id === 'editor') {
         return null
      }
   }
   return el
}

// GET MIN Z
export function getMinZ(page) {
   const elements = page.querySelectorAll('.element')
   let min = 0
   for (const element of elements) {
      const z = parseInt(element.style['z-index']) || 0
      if (z <= min) min = z
   }
   return parseInt(min)
}

// GET MAX Z
export function getMaxZ(page) {
   const elements = page.querySelectorAll('.element')
   let max = 0
   for (const element of elements) {
      const z = parseInt(element.style['z-index']) || 0
      if (z >= max) max = z
   }
   return parseInt(max)
}

// RAISE ALL
export function raiseAllElements(page) {
   const elements = page.querySelectorAll('.element')
   elements.forEach(function (element) {
      const fixed = (parseInt(element.style['z-index']) || 0) + 1
      element.style['z-index'] = fixed
   })
}

// REGISTER CLICK
export function registerClick(query, handler, parent = document) {
   parent.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('click', handler)
   })
}

// REGISTER CHANGE
export function registerChange(query, handler, parent = document) {
   parent.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('change', handler)
   })
}

// REGISTER INPUT
export function registerInput(query, handler, parent = document) {
   parent.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('input', handler)
   })
}

// REGISTER HOVER
export function registerHover(query, start, end, parent = document) {
   parent.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('mouseenter', start)
   })
   parent.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('mouseleave', end)
   })
}

// RESOLVE TYPE
export function resolveType(element) {
   if (element?.classList.contains('is-image')) return 'image'
   if (element?.classList.contains('is-text')) return 'text'
   if (element?.classList.contains('is-audio')) return 'audio'
   if (element?.classList.contains('is-video')) return 'video'
}

// COPY ATTR
export function copyAttribute(from, to, attrName, fallback) {
   if (!from || !to) {
      return
   }
   to.setAttribute(attrName, from.getAttribute(attrName) || fallback)
}
