const animItems = document.querySelectorAll('[data-animation]');
if (animItems.length > 0) {
   window.addEventListener('scroll', animScroll);
   function animScroll(params) {
      for (let i = 0; i < animItems.length; i++) {
         const animItem = animItems[i];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
         ) {
            animItem.classList.add('_active');
         } else {
            if (!animItem.getAttribute('data-animation', 'not-repeat')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
   setTimeout(() => {
      animScroll();
   }, 300);
}

function offset(el) {
   const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
