# Анимация элементов при скролле страницы.
 
Ишем на странице анимируемые элементы, а имено элемента с data- атрибутом ``data-animation``<br>
```javascript 
const animItems = document.querySelectorAll('[data-animation]');
```
И сохраняем их в переменной ``animItems``<br><br>
```html
<!-- Для целого блока -->
<div class="class-name" data-animation >
 <!-- html -->
</div> 
<!-- Для отдельного элемента -->
<h1 class="class-name" data-animation >Title</h1> 
```
Проверим, если таккие элементы на странице найдены...
```javascript 
if (animItems.length > 0) {
  // code
}
```
Запускаем цикл и сохроняем каждый найденый объект в переменной ``animItem``
```javascript
for (let i = 0; i < animItems.length; i++) { 
     const animItem = animItems[i];
}
```

Внутри цикла создаём некоторое количество переменных.<br><br>
Переменная ``animItemHeight`` будет хранить высоту анимируемого объекта.
```javascript
const animItemHeight = animItem.offsetHeight;
```
<br>

Переменная ``animItemOffset`` получает позицию анимируемого объекта относительно верха страницы при помощи функции ``offset()`` Данную функцию опишем ниже.
```javascript
const animItemOffset = offset(animItem).top;
```
<br>

В переменная ``animStart`` записываем коофицент который будет задавать момент старта анимации.
```javascript
const animStart = 4;
```
<br>

На этом этапе скрипт выгледит следующим образом.
```javascript
const animItems = document.querySelectorAll('[data-animation]');
if (animItems.length > 0) {
  for (let i = 0; i < animItems.length; i++) { 
     const animItem = animItems[i];
     const animItemHeight = animItem.offsetHeight;
     const animItemOffset = offset(animItem).top;
     const animStart = 4;
  }
}
```
<br>

Далее определим момент старта анимации, для чего произведём некоторые математические действия.<br>
А именно от высоты окна браузера ``window.innerHeight`` отнимем высоту анимируемого объекта ``animItemHeight`` поделёную на коофицент ``animStart`` и сохраним результат в переменной ``animItemPoint``
```javascript
let animItemPoint = window.innerHeight - animItemHeight / animStart;
```
<br>

В случае когда анимируемый объект имеет высоту больше чем окно браузера, расчёт будет производится несколько по другому.<br>
В этом случае от высоты окна браузера ``window.innerHeight`` отнимем высоту окна браузера ``window.innerHeight`` поделёную на коофицент ``animStart``<br>
Итак проверим, если высота объекта больше чем высота окна браузера
```javascript
if (animItemHeight > window.innerHeight) {}
```
И произведём расчёт ``window.innerHeight - window.innerHeight / animStart``
```javascript
if (animItemHeight > window.innerHeight) {
   animItemPoint = window.innerHeight - window.innerHeight / animStart;
}
```
<br>

Далее делаем следующую проверку. <br><br>
Если страница проскролена больше чем позиция объекта минус точка старта<br> ``pageYOffset > animItemOffset - animItemPoint``<br><br>
но при этом меньше чем позиция объекта плюс его высота <br>
``pageYOffset < animItemOffset + animItemHeight``<br> в этот момент добовляем объекту класс ``animate``
```javascript
if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
    animItem.classList.add('animate');
}
```
В противном случае удалим этот клас, что приведёт к повтору анимации при следующем скроле данного элемента
```javascript
if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
    animItem.classList.add('animate');
} else {
  animItem.classList.remove('animate');
}
```
Не всегда это действие бывает нужно и для этого добавим нашему трибуту значение ``not-repeat`` 
```html
<!-- Для целого блока -->
<div class="class-name" data-animation="not-repeat" >
 <!-- html -->
</div> 
<!-- Для отдельного элемента -->
<h1 class="class-name" data-animation="not-repeat" >Title</h1> 
```
И делаем следующую проверку.<br>
Если уатрибута "data-animation" отсутствует значение "not-repeat" ``!animItem.getAttribute('data-animation', 'not-repeat'`` то удалим класс если данное значение у атрибута присутствует то класс оставляем тогда повтора анимации не будет.
И выглятедь это будет следующим образом.
```javascript
if (!animItem.getAttribute('data-animation', 'not-repeat')) {
    animItem.classList.remove('animate');
}
```
<br>

Заключаем весь скрипт описаный выше в функцию ``animScroll()`` И сразу объявим эту функцию. Данное действие позволит анимировать элементы находящиеся во время загрузки страницы в зоне видимости скрипта и изначально имеющие класс "animate". Например такие как логотип или заголовок.
```javascript
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
         if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
            animItem.classList.add('animate');
         } else {
            if (!animItem.getAttribute('data-animation', 'not-repeat')) {
               animItem.classList.remove('animate');
            }
         }
      }
   }
   animScroll()
```
Время анимации можно задать с помощью функции ``setTimeout``
```javascript
setTimeout(() => {
    animScroll();
}, 300);
```
Либо с помощью css свойства ``transition``<br><br>
Создадим событие ``scroll`` для окна браузера при возникновения которого будет выполняется функция ``animScroll()``
```javascript
window.addEventListener('scroll', animScroll);
```
Функция с помощью которой определим позицию объекта ``offset(el)``
```javascript
function offset(el) {
   const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
```
### Весь скрипт.

```javascript
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
         if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
            animItem.classList.add('animate');
         } else {
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

function offset(el) {
   const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
```
И непосредственно сама анимация будет описана в css при добавлении класса ``animate``
Не большой пример:
```html
<div class="anim-block" data-animation>
 
</div>
```
```css
.anim-block {
  transform: scale(0);
}
.anim-block.animate {
  transform: scale(1);
  /* если не используется функция  setTimeout */
  transition: 0.3s;
}

/* также анимацию можно задать с помощью @keyframes */
.anim-block.animate {
 animation: scale 15s linear infinite;
}
@keyframes scale {
  from { 
    transform: scale(0); 
  }
  to { 
    transform: scale(1);
  }
}
```




