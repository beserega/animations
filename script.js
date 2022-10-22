const animItems = document.querySelectorAll('[data-animation]'); // ищим элементы с data- атрибутом data-animation
if (animItems.length > 0) { // если таккие элементы на странице найдены
   // событие scroll для окна браузера при возникновения которого выполняется функция animScroll()
   window.addEventListener('scroll', animScroll);
   // функция animScroll()
   function animScroll(params) {
      // запускаем цикл в данном примере это цикл for
      for (let i = 0; i < animItems.length; i++) { 
         const animItem = animItems[i];
          // в переменую animItemHeight получаем высоту анимируемого объекта
         const animItemHeight = animItem.offsetHeight;
          // в переменую animItemOffset получаем позицию анимируемого объекта относительно верха страницы при помощи функции offset()
         const animItemOffset = offset(animItem).top;
         //  в переменую animStart записываем коофицент который будет задавать момент старта анимации
         const animStart = 4; 
          // в переменую animItemPoint получаем момент старта анимации. Для этого от высоты окна браузера отнимаем высоту анимируемого объекта делёную на коофицент
         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         // если высота анимируемого объекта больше высоты окна браузера в этом случае расчёт будет производиться иначе
         if (animItemHeight > window.innerHeight) {
            // от высоты окна браузера отнимаем высоту окна браузера делёную на коофицент
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }
         // если страница проскролена больше чем позиция объекта минус точка старта, но при этом
         // меньше чем позиция объекта плюс его высота в этот момент
         if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
            // добовляем класс animate к объекту
            animItem.classList.add('animate');
         } else {
            // если у атрибута data-animation нет ни каких параметров анимация бутет повторятся при следующим скроле
            // если у атрибута data-animation имеет параметр data-animation="not-repeat" повтора анимации не будет
            if (!animItem.getAttribute('data-animation', 'not-repeat')) {
               animItem.classList.remove('animate');
            }
         }
      }
   }
   setTimeout(() => {
      animScroll();
   }, 300); // время анимации
}

// с помощью данной функции определим позицию объекта
function offset(el) {
   const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
