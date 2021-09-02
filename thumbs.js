export function create() {
   // tl
   const tl = document.createElement('span')
   tl.classList.add('tl', 'thumb')

   // tr
   const tr = document.createElement('span')
   tr.classList.add('tr', 'thumb')

   // bl
   const bl = document.createElement('span')
   bl.classList.add('bl', 'thumb')

   // br
   const br = document.createElement('span')
   br.classList.add('br', 'thumb')

   return [
      tl.cloneNode(true),
      tr.cloneNode(true),
      bl.cloneNode(true),
      br.cloneNode(true),
   ]
}
