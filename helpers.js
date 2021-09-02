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
   const startAngle = parseFloat(el.getAttribute('data-angle')) || 0
   const center = {
      x: parseFloat(el.getAttribute('data-center-x')) || 0,
      y: parseFloat(el.getAttribute('data-center-y')) || 0,
   }
   const angle = Math.atan2(center.y - event.clientY, center.x - event.clientX)
   return angle - startAngle
}

// GET CLOSEST PARENT
export function queryParent(el, cls) {
   let depth = 0
   while (!el?.classList?.contains(cls)) {
      el = el?.parentElement
      depth++
      if (depth >= 12 || (el?.classList?.contains('book') && cls !== 'book')) {
         return null
      }
   }
   return el
}

// GET MIN Z
export function getMinZ(page) {
   const elements = page.querySelectorAll('.element')
   let min = 0
   for (const e of elements) {
      const z = e.style['z-index']
      if (z <= min) min = z
   }
   return min
}

// GET MAX Z
export function getMaxZ(page) {
   const elements = page.querySelectorAll('.element')
   let max = 0
   for (const e of elements) {
      const z = e.style['z-index']
      if (z >= max) max = z
   }
   return max
}

// RAISE ALL
export function raiseAllElements(page, min) {
   const elements = page.querySelectorAll('.element')
   elements.forEach((e) => (e.style['z-index'] += Math.abs(min) + 1))
}

// REGISTER CLICK
export function registerClick(query, handler) {
   document.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('click', handler)
   })
}

// REGISTER CHANGE
export function registerChange(query, handler) {
   document.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('change', handler)
   })
}

// REGISTER INPUT
export function registerInput(query, handler) {
   document.querySelectorAll(query).forEach(function (el) {
      el.addEventListener('input', handler)
   })
}
