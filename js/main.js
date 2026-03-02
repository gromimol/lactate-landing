// =========================================
// Slider
// =========================================

$('.posts__slider').slick({
  slidesToScroll: 1,
  arrows: true,
  prevArrow: $('.posts__arrow--prev'),
  nextArrow: $('.posts__arrow--next'),
  infinite: false,
  dots: false,
  swipe: true,
  variableWidth: true,
});


// =========================================
// Modal
// =========================================

const $modal = $('#postModal');

function openModal() {
  $('body').addClass('modal-open');
}
function closeModal() {
  $('body').removeClass('modal-open');
}

$(document).on('click', '.posts__slide', openModal);
$(document).on('click', '.modal__close', closeModal);
$(document).on('click', '.modal__overlay', closeModal);

$(document).on('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});


// =========================================
// Parallax
// =========================================

const { scroll, animate, inView, stagger } = Motion;

// =========================================
// Scroll animations
// =========================================

scroll(
  animate('.features__grid__item--lg', { x: [-50, 0] }),
  {
    target: document.querySelector('.features'),
    offset: ['start end', 'end end']
  }
);

scroll(
  animate('.features__grid__item--sm', { x: [50, 0] }),
  {
    target: document.querySelector('.features'),
    offset: ['start end', 'end end']
  }
);

inView('.interface__body', () => {
  animate(
    '.interface__body',
    { opacity: [0, 1], y: [50, 0] },
    { duration: 0.7, easing: 'ease-out' }
  );
}, { margin: '0px 0px -100px 0px' });

scroll(
  animate('.badge', { y: [60, -60] }),
  {
    target: document.querySelector('.interface'),
    offset: ['start end', 'end start']
  }
);

document.querySelectorAll('.about-options-grid__item').forEach((item, i) => {
  scroll(
    animate(item, {
      y: [40 + i * 25, 0],
      filter: ['blur(2px)', 'blur(0px)'],
      opacity: [0.6, 1]
    }),
    {
      target: document.querySelector('.about-options-grid'),
      offset: ['start end', 'end center']
    }
  );
});


scroll(
  animate('.price__grid__item:first-child', { x: [-60, 0], opacity: [0.3, 1] }),
  {
    target: document.querySelector('.price'),
    offset: ['start end', 'center center']
  }
);

scroll(
  animate('.price__grid__item:last-child', { x: [60, 0], opacity: [0.3, 1] }),
  {
    target: document.querySelector('.price'),
    offset: ['start end', 'center center']
  }
);

scroll(
  animate('.why-lactate__about__img', { x: [-80, 0] }),
  {
    target: document.querySelector('.why-lactate__about'),
    offset: ['start end', 'end center']
  }
);


// =========================================
// Counter
// =========================================

inView('.why-lactate__description', () => {
  document.querySelectorAll('.description__item__footer .h4').forEach(el => {
    const original = el.textContent;
    const parts = original.split(/([\d.]+)/);

    el.innerHTML = parts.map(part =>
      /^[\d.]+$/.test(part)
        ? `<span class="counter" data-target="${part}">0.0</span>`
        : part
    ).join('');

    el.querySelectorAll('.counter').forEach(span => {
      const target = parseFloat(span.dataset.target);
      const decimals = (span.dataset.target.split('.')[1] || '').length;

      animate(0, target, {
        duration: 1.5,
        easing: [0.16, 1, 0.3, 1],
        onUpdate: v => span.textContent = v.toFixed(decimals)
      });
    });
  });
}, { margin: '0px 0px -80px 0px' });


// =========================================
// Parallax
// =========================================

scroll(
  animate('.first-screen__img, .first-screen__prices__content', { y: [0, 100] }),
  {
    target: document.querySelector('.first-screen'),
    offset: ['start start', 'end start']
  }
);
