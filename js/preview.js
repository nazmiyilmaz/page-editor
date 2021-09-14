import { init as initAudio } from './audio.js'
import { init as initTextAreaElements } from './textarea.js'

export function reload() {
   const previews = document.querySelectorAll('.pe-preview')

   for (const preview of previews) {
      const observer = new MutationObserver(function () {
         // init audio
         initAudio()
         // init textareas
         initTextAreaElements()
      })

      observer.observe(preview, {
         characterData: true,
         childList: true,
         attributes: true,
      })
   }
}

reload()
