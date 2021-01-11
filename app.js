;(function() {
 
  const slider = document.querySelector('.slider-container')
  const prevBtn = document.querySelector('.slider-arrow > .prev')
  const nextBtn = document.querySelector('.slider-arrow > .next')
  const sliderWrapper = document.querySelector('.slider-wrapper')
  const sliderItems = document.querySelectorAll('.slider-container .slide-item')
  const slideCount = sliderItems.length
  let windowWidth = window.innerWidth
  let activeIdx = 0
  let position = 0

  // activeIdx => 0 ~ 5 循環
  const setBulletsTemplate = () => {
    let bullet = ''
    slider.insertAdjacentHTML('beforeend', '<div class="slide-bullets-bar"></div>')
    
    for(let i = 0; i < slideCount; i++){
      bullet += '<div class="slide-bullet"></div>'
    }

    document.querySelector('.slide-bullets-bar').insertAdjacentHTML('beforeend', bullet)

  }

  const removeBulletActive = (bullets) => {
    bullets.forEach( (bullet, idx) => {
      bullet.classList.remove('active')
    })
  }

  const bulletHandler = () => {

    const bullets = document.querySelectorAll('.slide-bullets-bar .slide-bullet')
    removeBulletActive(bullets)
    bullets[activeIdx].classList.add('active')
    

    bullets.forEach( (bullet, idx) => {

      bullet.addEventListener('click', (e) =>{
        
        removeBulletActive(bullets)
        e.currentTarget.classList.add('active')
        setActiveIdx(idx)
        setSlidePosition()

      })
    })

    // bullets[activeIdx].click()

  }

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
      item.style.width = `${windowWidth}px`
      switch(true){

        case idx === activeIdx : 
          item.classList.add('active')
          
          position = 0 - (windowWidth * idx)
          sliderWrapper.style.transform = `translate(${position}px, 0%)`
          break;

        case idx < activeIdx : 
        case idx > activeIdx : 
          item.classList.remove('active')
          break;
          
      }

    })
  }

  const moveInit = () => {
    setActiveIdx(activeIdx)
    bulletHandler()
    setSlidePosition()
  }

  prevBtn.addEventListener('click', function(){
    activeIdx -= 1
    moveInit()
  })

  nextBtn.addEventListener('click', function(){
    activeIdx += 1
    moveInit()
  })

  window.addEventListener('resize', function(){
    windowWidth = window.innerWidth
    setSlidePosition()
  })

  setBulletsTemplate()
  setSlidePosition()
  bulletHandler()

})();