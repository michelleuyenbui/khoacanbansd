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
  var SECONDS = 10;   // how long each photo stays on screen
  var FADE_MS = 600;  // length of the fade between photos

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

  // Visitors who turn off animations in their device settings get no fade.
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fade = reduceMotion ? 0 : FADE_MS;

  var names = Object.keys(PHOTOS);

  names.forEach(function (name, position) {
    var list = PHOTOS[name];
    if (list.length < 2) return;

    // Load every photo in the background so each change is smooth.
    list.forEach(function (p) { new Image().src = p.src; });

    var index = 0;

    function next() {
      // Look the image up each time, because the page may redraw the cards.
      var img = document.querySelector('img[data-rotate="' + name + '"]');
      if (!img) return;
      index = (index + 1) % list.length;
      img.style.transition = "opacity " + fade + "ms ease";
      img.style.opacity = "0";
      setTimeout(function () {
        img.src = list[index].src;
        img.alt = list[index].alt;
        img.style.opacity = "1";
      }, fade);
    }

    // Stagger the cards by 1 second each so they don't all change at once.
    setTimeout(function () {
      setInterval(next, SECONDS * 1000);
    }, position * 1000);
  });
})();
