import { refresh } from './main.js'

export let pointer = 0
export let history = []

export function undo() {
   const page = document.getElementById('active-page')
   console.log(pointer)
   console.log(history)
   const previousIndex = pointer - 1
   if (previousIndex >= 0) {
      page.outerHTML = history[previousIndex]
      pointer--
   }

   // refresh page
   refresh()
}

export function redo() {
   const page = document.getElementById('active-page')
   console.log(pointer)
   console.log(history)
   const nextIndex = pointer + 1
   if (nextIndex <= history.length) {
      page.outerHTML = history[nextIndex]
      pointer++
   }

   // refresh page
   refresh()
}

export function markState() {
   const page = document.getElementById('active-page')
   // if last
   if (pointer === history.length) {
      history.push(page.outerHTML)
      pointer++
   }
   // else
   else {
   }

   // refresh page
   refresh()
}
