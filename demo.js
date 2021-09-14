import {
   insertImage,
   insertText,
   changeBackground,
   insertAudio,
   insertVideo,
   getNonFunctionalPage,
   getPreviewPage,
} from './actions.js'

import { reload } from './editor.js'

// DEMO
setTimeout(() => {
   reload()
   const editor = document.querySelector('.pe-editor')

   // insertAudio(editor, 'assets/sample.mp3')
   // insertAudio(editor, 'assets/sample2.mp3')
   insertImage(editor, 'assets/bird.png')
   insertImage(editor, 'assets/pineapple.png')
   insertText(editor, 'Lorem Ipsum is simply dummy text')
   // insertText(editor, 'Lorem Ipsum is simply dummy text. Lorem Ipsum is simply')
   // insertVideo(editor, 'assets/sample.mp4')
   // changeBackground(editor, 'assets/page.jpg')

   //setTimeout(() => {
   //   const preview = document.querySelector('.pe-preview')
   //   preview.innerHTML = getPreviewPage(editor)
   //}, 10000)

   reload()
}, 1000)
