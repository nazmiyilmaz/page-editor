import { initPreview as initAudioPreview } from './audio.js'
import { initPreview as initTextPreview } from './textarea.js'

export function init() {
   const preview = document.getElementById('preview')

   const observer = new MutationObserver(function (mutations, obs) {
      console.log(mutations)

      // INIT AUDIO PREVIEW
      initAudioPreview()

      // INIT TEXT PREVIEW
      initTextPreview()
   })

   observer.observe(preview, {
      characterData: true,
      childList: true,
      attributes: true,
   })
}

init()
