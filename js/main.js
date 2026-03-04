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
// Animations
// =========================================

const { scroll, animate, inView, stagger } = Motion;
const isDesktop = window.matchMedia('(min-width: 1200px)').matches;

// Скрываем элементы до анимации (только мобильные)
if (!isDesktop) {
  const animatedEls = [
    '.about-options-grid__item',
    '.features__grid__item--lg',
    '.features__grid__item--sm',
    '.price__grid__item',
    '.why-lactate__about__img',
    '.interface__body',
  ];
  animatedEls.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.opacity = '0';
    });
  });
}


const fadeUp = (selector, options = {}) => {
  inView(selector, () => {
    animate(selector, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, easing: 'ease-out', ...options });
  }, { margin: '0px 0px -80px 0px' });
};

if (isDesktop) {

  // Features параллакс
  scroll(
    animate('.features__grid__item--lg', { y: [-40, 40] }),
    { target: document.querySelector('.features'), offset: ['start end', 'end start'] }
  );
  scroll(
    animate('.features__grid__item--sm', { y: [40, -40] }),
    { target: document.querySelector('.features'), offset: ['start end', 'end start'] }
  );

  // Badge параллакс
  scroll(
    animate('.badge', { y: [60, -60] }),
    { target: document.querySelector('.interface'), offset: ['start end', 'end start'] }
  );

  // About options параллакс + блюр
  document.querySelectorAll('.about-options-grid__item').forEach((item, i) => {
    scroll(
      animate(item, { y: [40 + i * 25, 0], filter: ['blur(2px)', 'blur(0px)'], opacity: [0.6, 1] }),
      { target: document.querySelector('.about-options-grid'), offset: ['start end', 'end 0.85'] }
    );

    new MutationObserver(() => {
      const style = item.getAttribute('style') || '';
      if (style.includes('transform: none')) {
        item.classList.add('about-options-grid__item--animation-end');
      } else {
        item.classList.remove('about-options-grid__item--animation-end');
      }
    }).observe(item, { attributes: true, attributeFilter: ['style'] });
  });

  // Price параллакс
  scroll(
    animate('.price__grid__item:first-child', { x: [-60, 0], opacity: [0.3, 1] }),
    { target: document.querySelector('.price'), offset: ['start end', 'center 0.8'] }
  );
  scroll(
    animate('.price__grid__item:last-child', { x: [60, 0], opacity: [0.3, 1] }),
    { target: document.querySelector('.price'), offset: ['start end', 'center 0.8'] }
  );

  // Why-lactate img параллакс
  scroll(
    animate('.why-lactate__about__img', { x: [-80, 0] }),
    { target: document.querySelector('.why-lactate__about'), offset: ['start end', 'end center'] }
  );

  // First screen параллакс
  scroll(
    animate('.first-screen__img, .first-screen__prices__content', { y: [0, 100] }),
    { target: document.querySelector('.first-screen'), offset: ['start start', 'end start'] }
  );

} else {

  // Мобильные — простые fade-up
  fadeUp('.about-options-grid__item', { delay: stagger(0.1) });
  fadeUp('.features__grid__item--lg');
  fadeUp('.features__grid__item--sm', { delay: 0.1 });
  fadeUp('.price__grid__item:first-child');
  fadeUp('.price__grid__item:last-child', { delay: 0.15 });
  fadeUp('.why-lactate__about__img');

}

// animate-fade-up
document.querySelectorAll('.animate-fade-up').forEach(el => {
  inView(el, () => {
    animate(el, { opacity: 1, y: 0 }, { duration: 1.5, easing: [0.16, 1, 0.3, 1] });
    return () => {
      animate(el, { opacity: 0, y: 20 }, { duration: 1, easing: 'ease-in' });
    };
  }, { margin: '0px 0px -20% 0px' });
});

// Interface fade-up (все экраны)
inView('.interface__body', () => {
  animate('.interface__body', { opacity: [0, 1], y: [50, 0] }, { duration: 0.7, easing: 'ease-out' });
}, { margin: '0px 0px -100px 0px' });


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
        delay: 0.8,
        easing: [0.16, 1, 0.3, 1],
        onUpdate: v => span.textContent = v.toFixed(decimals)
      });
    });
  });
}, { margin: '0px 0px -80px 0px' });
