// GENERATE CONTROLLER
export function create(opts = { rotate: true, move: true, del: true }) {
   // controls
   const controls = document.createElement('div')
   controls.classList.add('controls')

   if (opts.rotate) {
      // rotation handle
      const rotHandle = document.createElement('span')
      rotHandle.classList.add('rotation-handle')
      const rotIcon = document.createElement('img')
      rotIcon.src = 'icos/rotation.svg'
      rotHandle.appendChild(rotIcon.cloneNode(true))
      // append
      controls.appendChild(rotHandle)
   }

   if (opts.move) {
      // move handle
      const movHandle = document.createElement('span')
      movHandle.classList.add('move-handle')
      const movIcon = document.createElement('img')
      movIcon.src = 'icos/move.svg'
      movHandle.appendChild(movIcon.cloneNode(true))
      // append
      controls.appendChild(movHandle)
   }

   if (opts.del) {
      // delete handle
      const delHandle = document.createElement('span')
      delHandle.classList.add('delete-handle')
      const delIcon = document.createElement('img')
      delIcon.src = 'icos/delete.svg'
      delHandle.appendChild(delIcon.cloneNode(true))
      // append
      controls.appendChild(delHandle)
   }

   // return clone
   return controls.cloneNode(true)
}
