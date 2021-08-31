export const pointer = 0
export const history = []

const page = document.getElementById('active-page')

export function undo() {
   if (pointer > 0) {
      page.innerHTML = history[pointer - 1]
   }
}

export function redo() {
   if (pointer > history.length) {
      page.innerHTML = history[pointer + 1]
   }
}

export function markState() {
   // if last
   if (pointer === history.length) {
      history.push(page.innerHTML)
      pointer++
   }
   // else
   else {
   }
}
