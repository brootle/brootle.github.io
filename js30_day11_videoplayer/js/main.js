

// for full screen
// https://github.com/sindresorhus/screenfull.js/
// https://www.sitepoint.com/use-html5-full-screen-api/
// http://blogs.sitepointstatic.com/examples/tech/full-screen/index.html
// https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    // 1st we get all elements

    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');

    const toggle = player.querySelector('.toggle');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const ranges = player.querySelectorAll('.player__slider');

    const fullscreenButton = player.querySelector('.fullscreen');

    // 2nd we build functions

    function toggleFullScreen() {
      console.log("make full screen using styles");
    }

    function togglePlay(){
      // use ternary operator
      const method = video.paused ? 'play' : 'pause';
      video[method]();

      // traditional syle below
      // if(video.paused){
      //   video.play();
      // } else{
      //   video.pause();
      // }
    }

    function updateButton(){
      const icon = this.paused ? 'play' : 'pause';
      toggle.textContent = icon;
      console.log('Update the button');
    }

    function skip(){
      // we get value from this [data-skip]
      video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleRangeUpdate(){
      // access the property of the video and update it
      video[this.name] = this.value;
    }

    function handleProgress(){
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.flexBasis = `${percent}%`;
    }

    // this will work with progress bar update
    function scrub(e){
      // we get mouse position inside the progrss bar
      // and calculate the timeupdate
      const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }

    // 3rd we hook up event listners

    video.addEventListener('click', togglePlay);
    
    // listen to the video and update text in play button
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggle.addEventListener('click', togglePlay);

    skipButtons.forEach(button => button.addEventListener('click',skip));

    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

    let mousedown = false;
    progress.addEventListener('click',scrub);
    // only if mousedown = true it will run scrub and we send e to it
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);

    // toggle fullscreen
    fullscreenButton.addEventListener('click',toggleFullScreen);

});