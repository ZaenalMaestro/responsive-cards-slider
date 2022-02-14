const slider = document.querySelector('.slider'),
   innerSlider = document.querySelector('.inner-slider'),
   cards = document.querySelectorAll('.card')

let pressed = false,
   startX = 0,
   x = 0

// dekstop event
slider.addEventListener('mouseenter',cursorGrabNoPressed)
slider.addEventListener('mouseup', cursorGrabNoPressed)
slider.addEventListener('mouseleave', cursorGrabNoPressed)
slider.addEventListener('mousedown', mouseDown)
function mouseDown(e) {
   pressed = true
   startX = e.offsetX - innerSlider.offsetLeft;
   slider.style.cursor = 'grabbing'
}
slider.addEventListener('mousemove', mouseMove)
function mouseMove(e) {
   if (!pressed) return

   e.preventDefault()

   x = e.offsetX
   innerSlider.style.left = `${x - startX}px`

   checkBoundary()
   cardScaleDown()
}

// mobile event
slider.addEventListener('touchstart', () => {pressed = true})
slider.addEventListener('touchend', () => {pressed = false})
slider.addEventListener('touchmove', cardScaleDown)

/* ==================== REUSABLE FUNCTION ====================*/
function cursorGrabNoPressed() {
   slider.style.cursor = 'grab'
   pressed = false
}

function checkBoundary() {
   let outer = slider.getBoundingClientRect(),
      inner = innerSlider.getBoundingClientRect()

   if (parseInt(innerSlider.style.left) > 0) innerSlider.style.left = '0px'
   else if (inner.right < outer.right) innerSlider.style.left = `-${inner.width - outer.width}px`
}

function cardScaleDown() {
   if (!pressed) return

   let outer = slider.getBoundingClientRect()

   cards.forEach(card => {
      cardBoundary = card.getBoundingClientRect()
      if (cardBoundary.left < (outer.left - 200) || cardBoundary.right > (outer.right + 200)) {
         card.classList.add('card-scale-down')
      } else {
         card.classList.remove('card-scale-down')
      }
   });
}



