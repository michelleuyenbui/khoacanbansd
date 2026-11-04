/* Email links. The mailto still opens the visitor's mail app if they have one; the
   address is also copied with a short notice, since many people only use webmail. */
(function(){
  var timer;
  function notify(text){
    var el=document.querySelector('.toast');
    if(!el){
      el=document.createElement('div');
      el.className='toast';
      el.setAttribute('role','status');
      document.body.appendChild(el);
    }
    el.textContent=text;
    el.classList.add('toast-show');
    clearTimeout(timer);
    timer=setTimeout(function(){el.classList.remove('toast-show');},3000);
  }
  addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="mailto:"]');
    if(!a||!navigator.clipboard)return;
    var email=decodeURIComponent(a.getAttribute('href').slice(7).split('?')[0]);
    navigator.clipboard.writeText(email).then(function(){
      notify('Đã chép email: '+email);
    },function(){});
  });
})();
