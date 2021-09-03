import {
   insertImage,
   insertText,
   changeBackground,
   insertAudio,
   insertVideo,
   getNonFunctionalPage,
   getPreviewPage,
} from './actions.js'

// DEMO
setTimeout(() => {
   insertAudio('assets/sample.mp3')
   // insertAudio('assets/sample2.mp3')
   // insertImage('assets/bird.png')
   // insertImage('assets/pineapple.png')
   // insertText('Lorem Ipsum is simply dummy text')
   // insertText('Lorem Ipsum is simply dummy text. Lorem Ipsum is simply')
   // insertVideo('assets/sample.mp4')
   // changeBackground('assets/page.jpg')
}, 1000)

/*
setTimeout(() => {
   const preview = document.getElementById('preview')
   preview.innerHTML = getPreviewPage()
}, 10000)
*/
