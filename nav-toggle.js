/* Hamburger menu in the header on phones. Closes on a link tap, an outside tap or Esc. */
(function(){
  var root=document.documentElement;
  function setOpen(open){
    root.setAttribute('data-nav',open?'open':'closed');
    var btn=document.querySelector('.nav-toggle');
    if(btn)btn.setAttribute('aria-expanded',open?'true':'false');
    var first=document.querySelector('.nav a');
    if(open&&first)first.focus({preventScroll:true});
  }
  addEventListener('click',function(e){
    if(!e.target.closest)return;
    if(e.target.closest('.nav-toggle'))return setOpen(root.getAttribute('data-nav')!=='open');
    if(e.target.closest('.nav-lang'))return;
    if(root.getAttribute('data-nav')==='open')setOpen(false);
  });
  addEventListener('keydown',function(e){
    if(e.key!=='Escape'||root.getAttribute('data-nav')!=='open')return;
    setOpen(false);
    var btn=document.querySelector('.nav-toggle');
    if(btn)btn.focus();
  });
})();
