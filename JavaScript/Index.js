localStorage.removeItem("questions");
(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();


  }); // end of document ready
})(jQuery); // end of jQuery name space

// (function () {

//   var bv = new Bideo();
//   bv.init({
//     // Video element
//     videoEl: document.querySelector('#background_video'),

//     // Container element
//     container: document.querySelector('body'),

//     // Resize
//     resize: true,

//     // autoplay: false,

//     isMobile: window.matchMedia('(max-width: 768px)').matches,

//     // playButton: document.querySelector('#play'),
//     // pauseButton: document.querySelector('#pause'),

//     // Array of objects containing the src and type
//     // of different video formats to add
//     src: [
//       {
//         src: 'Images/night.mp4',
//         type: 'video/mp4'
//       },
//       // {
//       //   src: 'night.webm',
//       //   type: 'video/webm;codecs="vp8, vorbis"'
//       // }
//     ],

//     // What to do once video loads (initial frame)
//     onLoad: function () {
//       document.querySelector('#video_cover').style.display = 'none';
//     }
//   });
// }());
// localStorage.removeItem("questions");

// let lastPassword = localStorage.getItem("lastPassword");
// lastPassword = JSON.parse(lastPassword);
// if (lastPassword !== null) {
//   let d = new Date();
//   let day = d.getDate();
//   let year = d.getUTCFullYear();
//   let month = parseInt(d.getMonth());
//   month = month + 1;
//   let today = new Date(month + "/" + day + "/" + year).getTime();
//   today = Math.floor(today / 1000 / 60 / 60 / 24);

//   let newP =[];
//   let deleteQuiz = [];

//   for(let i = 0; i < lastPassword.length; i++){
//     let checkD = lastPassword[i].time + 10;
//     if(checkD < today){
//       deleteQuiz.push(lastPassword[i].pWord);
//     }else{
//       newP.push(lastPassword[i]);
//     }
//   }
//   for(let i =0; i < deleteQuiz.length; i++){
//     localStorage.remove(deleteQuiz[i]);
//   }
//   let json = JSON.stringify(newP);
//   localStorage.setItem("lastPassword",json);
// }