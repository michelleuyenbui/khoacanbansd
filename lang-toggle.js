/* Language pill in the header. Remembers the choice; translations come later. */
(function(){
  var root=document.documentElement,lang='vi';
  try{if(localStorage.getItem('lang')==='en')lang='en';}catch(e){}
  root.setAttribute('data-lang',lang);
  addEventListener('click',function(e){
    if(!e.target.closest||!e.target.closest('.lang'))return;
    lang=root.getAttribute('data-lang')==='en'?'vi':'en';
    root.setAttribute('data-lang',lang);
    try{localStorage.setItem('lang',lang);}catch(e){}
  });
})();
