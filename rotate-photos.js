/*
 * Photo rotation for the "Giới thiệu" cards on khoacanbansd.org
 *
 * Each card's <img> in index.html has a data-rotate="..." name, and the
 * photos for that name are listed below. The photo changes every SECONDS
 * seconds with a soft fade, and starts over after the last one.
 *
 * To add a photo: upload it to assets/gioithieu/ and add a line to its list.
 * A list with only one photo simply doesn't rotate.
 */
(function () {
  var SECONDS = 10;    // how long each photo stays on screen
  var FADE_MS = 1200;  // how long the new photo takes to fade in
  var ZOOM    = 1.12;  // how far it zooms: 1.12 = 12% closer. Try 1.05 for subtler.
 
  var PHOTOS = {
    "hon-nhan": [
      { src: "./assets/gioithieu/hon-nhan.jpg",   alt: "Hôn nhân bền vững" },
      { src: "./assets/gioithieu/hon-nhan-2.jpg", alt: "Hôn nhân bền vững" },
      { src: "./assets/gioithieu/hon-nhan-3.jpg", alt: "Hôn nhân bền vững" }
    ],
    "gia-dinh": [
      { src: "./assets/gioithieu/gia-dinh.jpg",   alt: "Gia đình hài hòa" },
      { src: "./assets/gioithieu/gia-dinh-2.jpg", alt: "Gia đình hài hòa" },
      { src: "./assets/gioithieu/gia-dinh-3.jpg", alt: "Gia đình hài hòa" }
    ],
    "duc-tin": [
      { src: "./assets/gioithieu/duc-tin.jpg",    alt: "Sống và phục vụ Đức Tin" },
      { src: "./assets/gioithieu/duc-tin-2.jpg",  alt: "Sống và phục vụ Đức Tin" },
      { src: "./assets/gioithieu/duc-tin-3.jpg",  alt: "Sống và phục vụ Đức Tin" }
    ]
  };
 
  // Visitors who turn off animations in their device settings get a plain
  // photo change with no zoom and no fade.
  var calm = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
  // Start the slow zoom on a photo. It lasts the whole time the photo shows.
  function zoom(img) {
    if (calm) return;
    img.style.transition = "none";
    img.style.transform = "scale(1)";
    void img.offsetWidth; // let the browser register the starting size
    img.style.transition = "transform " + (SECONDS * 1000 + FADE_MS) + "ms linear, " +
                           "opacity " + FADE_MS + "ms ease";
    img.style.transform = "scale(" + ZOOM + ")";
  }
 
  function find(name) {
    return document.querySelector('img[data-rotate="' + name + '"]');
  }
 
  Object.keys(PHOTOS).forEach(function (name, position) {
    var list = PHOTOS[name];
 
    // Load every photo in the background so each change is smooth.
    list.forEach(function (p) { new Image().src = p.src; });
 
    var index = 0;
 
    // Stagger the cards by 1 second each so they don't all change at once.
    setTimeout(function () {
      var first = find(name);
      if (first) zoom(first);
      if (list.length < 2) return;
      setInterval(function () { next(name, list); }, SECONDS * 1000);
    }, position * 1000);
 
    function next() {
      // Look the photo up each time, because the page may redraw the cards.
      var old = find(name);
      if (!old) return;
      index = (index + 1) % list.length;
 
      // Make a second photo and lay it exactly on top of the old one.
      var img = old.cloneNode(false);
      img.src = list[index].src;
      img.alt = list[index].alt;
      img.loading = "eager";
      img.style.opacity = calm ? "1" : "0";
      old.removeAttribute("data-rotate");
      old.parentNode.insertBefore(img, old.nextSibling);
 
      // Once the new photo is ready: fade it in, start its zoom, remove the old one.
      var ready = img.decode ? img.decode() : Promise.resolve();
      ready.catch(function () {}).then(function () {
        zoom(img);
        img.style.opacity = "1";
        setTimeout(function () {
          if (old.parentNode) old.parentNode.removeChild(old);
        }, calm ? 0 : FADE_MS);
      });
    }
  });
})();
