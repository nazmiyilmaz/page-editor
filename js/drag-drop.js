import { getEditor, resolveDropType } from './helpers.js'

import { insert } from './actions.js'

function onDragStart(event) {
   // find props
   const type = resolveDropType(event.target)
   const src = event.target.src

   // pass data as json string
   event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
         type,
         src,
      })
   )

   // add active class to drop element
   event.currentTarget.classList.add('pe-active-drop-item')
}

function onDragEnd(event) {
   // add active class to drop element
   event.currentTarget.classList.remove('pe-active-drop-item')
}

function onDragOver(event) {
   // prevent default action
   event.preventDefault()

   // add active class to drop element
   event.currentTarget.classList.add('pe-page-can-drop')
}

function onDragLeave(event) {
   // add active class to drop element
   event.currentTarget.classList.remove('pe-page-can-drop')
}

function onDrop(event) {
   // get editor
   const editor = getEditor(event.target)
   // raw json
   const rawJson = event.dataTransfer.getData('text')
   // parse props
   const props = JSON.parse(rawJson)
   // extract fields
   const { type, src } = props
   // insert element
   insert(editor, type, src)
   // empty dta transfer
   event.dataTransfer.clearData()
   // add active class to drop element
   event.currentTarget.classList.remove('pe-page-can-drop')
}

export function init() {
   document.querySelectorAll('.pe-drop-item').forEach(function (material) {
      material.addEventListener('dragstart', onDragStart)
      material.addEventListener('dragend', onDragEnd)
   })

   document.querySelectorAll('.pe-editor .pe-page').forEach(function (page) {
      page.addEventListener('dragover', onDragOver)
      page.addEventListener('dragleave', onDragLeave)
      page.addEventListener('drop', onDrop)
   })
}
