import {
   insert,
   changeBackground,
   getNonFunctionalPage,
   getPreviewPage,
} from './actions.js'

import { reload } from './editor.js'

// DEMO
setTimeout(() => {
   reload()
   const editor = document.querySelector('.pe-editor')

   insert(editor, 'audio', 'assets/sample.mp3')
   // insert(editor,'audio', 'assets/sample2.mp3')
   insert(editor, 'image', 'assets/bird.png')
   // insert(editor,'image', 'assets/pineapple.png')
   insert(editor, 'text', 'Lorem Ipsum is simply dummy text')
   // insert(editor,'text', 'Lorem Ipsum is simply dummy text. Lorem Ipsum is simply')
   // insert(editor,'video', 'assets/sample.mp4')

   // changeBackground(editor, 'assets/page.jpg')

   reload()
}, 1000)
