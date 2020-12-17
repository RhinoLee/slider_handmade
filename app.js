;(function() {
 
  const prevBtn = document.querySelector('.slider-arrow > .prev')
  const nextBtn = document.querySelector('.slider-arrow > .next')
  const sliderItems = document.querySelectorAll('.slider-container .slide-item')
  const slideCount = sliderItems.length
  let windowWidth = window.innerWidth
  let activeIdx = 0
  let position = 0

  // activeIdx => 0 ~ 5 循環

  const setActiveIdx = (num) => {
    switch(true){
      case (num < 0) : 
        activeIdx = slideCount - 1
        break;
      case (num > slideCount - 1) : 
        activeIdx = 0
        break;
      default : 
        activeIdx = num
    }
    return activeIdx
  }


  const setSlidePosition = () => {
    
    sliderItems.forEach( (item, idx) => {
      switch(true){

        case idx === activeIdx : 
          item.classList.add('active')
          
          position = 0 - (windowWidth * idx)
          item.style.transform = `translate(${position}px, 0%)`
          break;

        case idx < activeIdx : 
        case idx > activeIdx : 
          item.classList.remove('active')

          position = 0 - windowWidth * activeIdx
          item.style.transform = `translate(${position}px, 0%)`
          break;

      }

    })
  }
  

  prevBtn.addEventListener('click', function(){
    activeIdx -= 1
    setActiveIdx(activeIdx)
    setSlidePosition()
  })

  nextBtn.addEventListener('click', function(){
    activeIdx += 1
    setActiveIdx(activeIdx)
    setSlidePosition()
  })

  setSlidePosition()

  window.addEventListener('resize', function(){
    windowWidth = window.innerWidth
    setSlidePosition()
  })




})();