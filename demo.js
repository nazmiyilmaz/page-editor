import {
   insertImage,
   insertText,
   changeBackground,
   insertAudio,
   insertVideo,
   getNonFunctionalPage,
} from './actions.js'

// DEMO
setTimeout(() => {
   // insertAudio('assets/sample.mp3')
   // insertAudio('assets/sample2.mp3')
   // insertImage('assets/bird.png')
   // insertImage('assets/pineapple.png')
   // insertText('Lorem Ipsum is simply dummy text')
   // insertText('Lorem Ipsum is simply dummy text. Lorem Ipsum is simply')
   insertVideo('assets/sample.mp4')
   changeBackground('assets/page.jpg')

   const preview = document.querySelector('.non-func')

   preview.innerHTML = getNonFunctionalPage()

   console.log(preview)
}, 1000)
