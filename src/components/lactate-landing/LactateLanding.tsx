import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations, Lang } from './translations';
import { posts } from './posts';
import './lactate-landing.css';

interface LactateLandingProps {
  lang: Lang;
  onOrder?: () => void;
  onLanguageChange?: (lang: Lang) => void;
  faqHref?: string;
}

const A = '/lactate'; // assets base path

export const LactateLanding: React.FC<LactateLandingProps> = ({ lang, onOrder, onLanguageChange, faqHref }) => {
  const t = translations[lang];
  const [modalPostId, setModalPostId] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Set html font-size for rem units
  useEffect(() => {
    document.documentElement.classList.add('lactate-landing-root');
    return () => { document.documentElement.classList.remove('lactate-landing-root'); };
  }, []);

  // Close lang switcher on outside click
  useEffect(() => {
    const close = () => setLangOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // Animate .animate-fade-up elements (replaces Motion.js inView)
  useEffect(() => {
    const els = document.querySelectorAll('.lactate-landing .animate-fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -20% 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Modal
  const activePost = modalPostId ? posts.find(p => p.id === modalPostId) : null;
  const closeModal = useCallback(() => setModalPostId(null), []);
  useEffect(() => {
    if (!modalPostId) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [modalPostId, closeModal]);

  const scrollSlider = (dir: number) => {
    sliderRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  const h = (v: string) => ({ dangerouslySetInnerHTML: { __html: v } });

  const langOptions = [
    { code: 'ru' as Lang, label: 'RU', flag: '#icon-flag-ru' },
    { code: 'en' as Lang, label: 'EN', flag: '#icon-flag-us' },
  ];
  const currentLangOpt = langOptions.find(o => o.code === lang) || langOptions[0];

  const captions = [t.slide1Caption, t.slide2Caption, t.slide3Caption, t.slide4Caption, t.slide5Caption, t.slide6Caption, t.slide7Caption, t.slide8Caption];

  return (
    <div className="lactate-landing">

  {/* ===== HEADER — exact copy of original ===== */}
  <header className="header">
    <div className="container">
        <div className="header__left">
            <div className="logo"><img src={`${A}/images/logo.svg`} alt="" /></div>
            <ul className="menu">
                <li><a href="#posts">{t.menuArticles}</a></li>
                <li><a href="#video">{t.menuVideo}</a></li>
            </ul>
        </div>
        <div className="header__right">
            {faqHref && (
            <a href={faqHref} className="btn-info">
                <span className="btn-info__icon">
                    <svg><use href="#icon-info" /></svg>
                </span>
                <span className="hide-mobile">{t.faqLabel}</span>
            </a>
            )}
            <div className={`lang-switcher ${langOpen ? 'lang-switcher--open' : ''}`}>
                <button className="lang-switcher__btn" type="button" onClick={e => { e.stopPropagation(); setLangOpen(!langOpen); }}>
                    <svg className="lang-switcher__flag" width="24" height="24"><use href={currentLangOpt.flag} /></svg>
                    <span className="lang-switcher__code">{currentLangOpt.label}</span>
                    <svg className="lang-switcher__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className="lang-switcher__dropdown">
                    {langOptions.map(opt => (
                    <button key={opt.code} className="lang-switcher__option" type="button" onClick={() => { onLanguageChange?.(opt.code); setLangOpen(false); }}>
                        <svg width="24" height="24"><use href={opt.flag} /></svg> {opt.label}
                    </button>
                    ))}
                </div>
            </div>
            <ul className="social">
                <li>
                    <a href="https://t.me/TrainingEnduranceBot">
                    <img src={`${A}/images/telegram.svg`} alt="Telegram" loading="lazy" />
                    </a>
                </li>
            </ul>
        </div>
    </div>
  </header>

  <main>
      {/* ===== FIRST SCREEN ===== */}
      <div className="first-screen">
            <div className="container">
                <div className="first-screen__grid">
                    <div className="first-screen__options">
                        <h1 className="h1">{t.heroTitle}</h1>
                        <p>{t.heroSubtitle}</p>

                        <div className="first-screen__options__list hide-mobile">
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-stopwatch" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec1Title}</div>
                                    <div className="options__list__item__description">{t.spec1Desc}</div>
                                </div>
                            </div>
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-drop" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec2Title}</div>
                                    <div className="options__list__item__description">{t.spec2Desc}</div>
                                </div>
                            </div>
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-bluetooth" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec3Title}</div>
                                    <div className="options__list__item__description">{t.spec3Desc}</div>
                                </div>
                            </div>
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-menu" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec4Title}</div>
                                    <div className="options__list__item__description">{t.spec4Desc}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="first-screen__img">
                        <picture>
                            <img src={`${A}/images/analizator_desctop_${lang}.webp`} alt={t.heroTitle} fetchPriority="high" />
                        </picture>
                        <div className="first-screen__message">{t.heroNotMedical}</div>
                    </div>
                    <div className="first-screen__prices">
                        <div className="first-screen__prices__header hide-mobile">
                            <p {...h(t.heroMeasured)} />
                            <p {...h(t.heroNoBullshit)} />
                        </div>

                        <div className="first-screen__prices__content">
                            <div className="main-price-block">
                                <div className="h5">{t.devicePriceLabel}</div>
                                <div className="h2">{t.devicePrice}</div>
                                <div className="main-price-block__row">
                                    <a href="#" className="btn" onClick={e => { e.preventDefault(); onOrder?.(); }}>{t.btnOrder}</a>
                                    <span className="delivery-notice">{t.deliveryNotice}</span>
                                </div>
                            </div>

                            <div className="first-screen__prices__notice">
                                <div className="h5">{t.proMonthLabel}</div>
                                <p>{t.proMonthDesc}</p>
                            </div>
                        </div>

                        <div className="first-screen__options__list show-mobile">
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-stopwatch" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec1Title}</div>
                                    <div className="options__list__item__description">{t.spec1Desc}</div>
                                </div>
                            </div>
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-drop" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec2Title}</div>
                                    <div className="options__list__item__description">{t.spec2Desc}</div>
                                </div>
                            </div>
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-bluetooth" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec3Title}</div>
                                    <div className="options__list__item__description">{t.spec3Desc}</div>
                                </div>
                            </div>
                            <div className="options__list__item">
                                <div className="icon"><svg><use href="#icon-menu" /></svg></div>
                                <div className="options__list__item__content">
                                    <div className="options__list__item__title">{t.spec4Title}</div>
                                    <div className="options__list__item__description">{t.spec4Desc}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          <div className="first-screen__bg">
              <video className="hero__video" autoPlay muted playsInline loop poster={`${A}/images/poster.webp`}>
                <source src={`${A}/images/background_lactate_pingpong.mp4`} type="video/mp4" />
              </video>
          </div>
        </div>

      {/* ===== ABOUT ===== */}
      <div className="about">
          <div className="container">
                <div className="block-title h2" {...h(t.aboutTitle)} />
              <div className="about-description-grid">
                  <div className="about-description-grid__item">
                      <div className="about-description-grid__item__content">
                          <div className="h5" {...h(t.aboutCard1Title)} />
                          <p {...h(t.aboutCard1Text)} />
                      </div>
                  </div>
                  <div className="about-description-grid__item">
                      <div className="about-description-grid__item__content">
                          <div className="h5" {...h(t.aboutCard2Title)} />
                          <p {...h(t.aboutCard2Text)} />
                      </div>
                  </div>
              </div>

              <div className="about-options-grid">
                  <div className="about-options-grid__item">
                      <div className="icon"><svg><use href="#icon-zone-circle" /></svg></div>
                      <div className="about-options-grid__item__content">
                          <div className="h5">{t.benefit1Title}</div>
                          <p className="animate-fade-up" {...h(t.benefit1Text)} />
                      </div>
                  </div>
                  <div className="about-options-grid__item">
                      <div className="icon"><svg><use href="#icon-shape-control" /></svg></div>
                      <div className="about-options-grid__item__content">
                          <div className="h5">{t.benefit2Title}</div>
                          <p className="animate-fade-up" {...h(t.benefit2Text)} />
                      </div>
                  </div>
                  <div className="about-options-grid__item">
                      <div className="icon"><svg><use href="#icon-start" /></svg></div>
                      <div className="about-options-grid__item__content">
                          <div className="h5">{t.benefit3Title}</div>
                          <p className="animate-fade-up" {...h(t.benefit3Text)} />
                      </div>
                  </div>
                  <div className="about-options-grid__item">
                      <div className="icon"><svg><use href="#icon-energy" /></svg></div>
                      <div className="about-options-grid__item__content">
                          <div className="h5">{t.benefit4Title}</div>
                          <p className="animate-fade-up" {...h(t.benefit4Text)} />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="features">
          <div className="container">
              <h2 className="h2 block-title" {...h(t.featuresTitle)} />
              <div className="features__grid">
                  <div className="features__grid__item features__grid__item--lg">
                      <div className="h3" {...h(t.feature1Title)} />
                      <div className="features__grid__item__img">
                          <div className="features__grid__item__img">
                              <picture>
                                  <source media="(max-width: 810px)" srcSet={`${A}/images/chip_mobile.webp`} />
                                  <img src={`${A}/images/chip.webp`} alt="" loading="lazy" />
                              </picture>
                          </div>
                      </div>
                      <div className="features__grid__item__grid animate-fade-up">
                          <p>{t.feature1p1}</p>
                          <p>{t.feature1p2}</p>
                          <p>{t.feature1p3}</p>
                          <p {...h(t.feature1p4)} />
                      </div>
                  </div>
                  <div className="features__grid__item features__grid__item--sm">
                      <div className="h3" {...h(t.feature2Title)} />
                      <div className="features__grid__item__img">
                          <img src={`${A}/images/strips.webp`} alt="" loading="lazy" />
                      </div>
                      <div className="features__grid__item__grid animate-fade-up">
                          <p {...h(t.feature2Text)} />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* ===== INTERFACE ===== */}
      <div className="interface">
          <div className="container">
              <div className="interface__body">
                  <div className="interface__description animate-fade-up">
                      <div className="h4">{t.interfaceTitle}</div>
                      <div className="interface__img show-mobile">
                          <img src={`${A}/images/notebook_mobile.webp`} alt="" loading="lazy" />
                      </div>
                      <div className="interface__description__block">
                          <p {...h(t.interfaceText1)} />
                          <p {...h(t.interfaceText2)} />
                          <div className="badge">{t.badgeText}</div>
                      </div>
                  </div>
                  <div className="interface__img hide-mobile">
                      <img src={`${A}/images/notebook.webp`} alt="" loading="lazy" />
                  </div>
              </div>
          </div>
      </div>

      {/* ===== ZONES ===== */}
      <div className="zones">
          <div className="container">
              <div className="zones__grid">
                  <div className="zones__description">
                      <div className="zones__description__content">
                        <div className="h2 animate-fade-up" {...h(t.zonesTitle)} />
                          <div className="h5 animate-fade-up" {...h(t.zonesSubtitle)} />
                          <p className="gray animate-fade-up" {...h(t.zonesText)} />
                          <div className="zones__notice animate-fade-up">
                            <div className="icon"><svg><use href="#icon-zone" /></svg></div>
                              <div className="zone__notice__text">{t.zonesNotice}</div>
                          </div>
                      </div>
                  </div>
                  <div className="zones__img">
                      <img src={`${A}/images/zones_${lang}.webp`} alt="" loading="lazy" />
                  </div>
              </div>
          </div>
      </div>

      {/* ===== WHY LACTATE ===== */}
      <div className="why-lactate">
          <div className="container">
              <div className="why-lactate__description">
                  <div className="why-lactate__description__item hide-mobile animate-fade-up">
                      <div className="h2" {...h(t.whyTitle)} />
                      <p className="gray" {...h(t.whyText1)} />
                      <p className="gray" {...h(t.whyText2)} />
                  </div>
                  <div className="why-lactate__description__item">
                      <div className="description__item animate-fade-up">
                          <div className="description__item__header">
                              <div className="icon icon--blue"><svg><use href="#icon-heart" /></svg></div>
                              <span {...h(t.lt1Label)} />
                          </div>
                          <p {...h(t.lt1Text)} />
                          <div className="description__item__footer">
                                <div className="h4 blue" {...h(t.lt1Range)} />
                          </div>
                      </div>
                      <div className="description__item animate-fade-up">
                          <div className="description__item__header">
                              <div className="icon icon--red"><svg><use href="#icon-heart-rate" /></svg></div>
                              <span {...h(t.lt2Label)} />
                          </div>
                          <p {...h(t.lt2Text)} />
                          <div className="description__item__footer">
                              <div className="h4 red" {...h(t.lt2Range)} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="why-lactate__about">
                  <div className="why-lactate__about__img">
                      <img src={`${A}/images/product_group_${lang}.webp`} alt="" loading="lazy" />
                  </div>
                  <div className="why-lactate__about__description">
                      <div className="about__description__item animate-fade-up">
                          <div className="h5">{t.specBlock1Title}</div>
                          <ul className="about__description__text">
                              <li {...h(t.specBlock1li1)} />
                              <li {...h(t.specBlock1li2)} />
                              <li>{t.specBlock1li3}</li>
                              <li>{t.specBlock1li4}</li>
                          </ul>
                      </div>
                      <div className="about__description__item animate-fade-up">
                          <div className="h5">{t.specBlock2Title}</div>
                          <ul className="about__description__text">
                              <li {...h(t.specBlock2li1)} />
                              <li>{t.specBlock2li2}</li>
                              <li {...h(t.specBlock2li3)} />
                          </ul>
                      </div>
                      <div className="about__description__item animate-fade-up">
                          <div className="h5">{t.specBlock3Title}</div>
                          <ul className="about__description__text">
                              <li {...h(t.specBlock3li1)} />
                              <li {...h(t.specBlock3li2)} />
                              <li>{t.specBlock3li3}</li>
                              <li {...h(t.specBlock3li4)} />
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* ===== POSTS ===== */}
      <div className="posts" id="posts">
          <div className="container">
              <div className="posts__header">
                  <div className="h2">{t.postsTitle}</div>
                  <div className="posts__arrows hide-mobile">
                      <button className="posts__arrow posts__arrow--prev" aria-label={t.ariaLabelPrev} onClick={() => scrollSlider(-1)}>
                          <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M9 1L2 8L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button className="posts__arrow posts__arrow--next" aria-label={t.ariaLabelNext} onClick={() => scrollSlider(1)}>
                          <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M1 1L8 8L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                  </div>
              </div>
          </div>
          <div className="posts__slider-wrap">
              <div className="container">
                <div className="posts__slider" ref={sliderRef}>
                  {posts.map((post, i) => (
                  <div key={post.id} className="posts__slide" onClick={() => setModalPostId(post.id)}>
                      <div className="posts__slide__img">
                        <img src={post.image} alt="" loading="lazy" />
                      </div>
                      <div className="posts__slide__caption">{captions[i] || post.title}</div>
                  </div>
                  ))}
              </div>
              </div>
          </div>
      </div>

      {/* ===== UNPACKING ===== */}
      <div className="unpacking animate-fade-up" id="video">
          <div className="container">
              <div className="block-title h2">{t.unpackingTitle}</div>
              <div className="unpacking__video">
                  <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
                    <iframe src="https://kinescope.io/embed/isi86k4G1if5Pwkudbja4Z" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameBorder="0" allowFullScreen style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} />
                  </div>
              </div>
          </div>
      </div>

      {/* ===== PRICE + FOOTER (inside .price, like original) ===== */}
      <div className="price">
          <div className="container">
              <div className="block-title h2">{t.priceTitle}</div>
              <div className="price__grid">
                  <div className="price__grid__item">
                      <div className="price__grid__item__block">
                          <div className="h5">{t.price1Title}</div>
                          <div className="h2 main-price">{t.price1Value}</div>
                          <a href="#" className="btn" onClick={e => { e.preventDefault(); onOrder?.(); }}>{t.btnOrderUpper}</a>
                      </div>
                      <div className="price__grid__item__footer">
                          <ul className="price__grid__item__list">
                              <li>{t.price1li1}</li>
                              <li>{t.price1li2}</li>
                              <li>{t.price1li3}</li>
                              <li>{t.price1li4}</li>
                              <li>{t.price1li5}</li>
                          </ul>
                      </div>
                  </div>
                  <div className="price__grid__item">
                      <div className="price__grid__item__block">
                          <div className="h5">{t.price2Title}</div>
                          <div className="h2 main-price" {...h(t.price2Value)} />
                          <a href="#" className="btn" onClick={e => { e.preventDefault(); onOrder?.(); }}>{t.btnOrderUpper}</a>
                      </div>
                      <div className="price__grid__item__footer">
                          <div className="price__grid__item__block__notice">{t.price2Notice}</div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="footer">
              <div className="container">
                  <div className="footer__grid">
                      <div className="footer__grid__item logo">
                          <a href="#"><img src={`${A}/images/logo.svg`} alt="Training Endurance" loading="lazy" /></a>
                      </div>
                      <div className="footer__grid__item">
                          <div className="h5">{t.footerInfoTitle}</div>
                          <ul className="footer__grid__list">
                              <li><button className="text-decoration doc-link" onClick={() => setModalPostId('doc-terms')}>{t.footerLinkTerms}</button></li>
                              <li><button className="text-decoration doc-link" onClick={() => setModalPostId('doc-offer')}>{t.footerLinkOffer}</button></li>
                              <li><button className="text-decoration doc-link" onClick={() => setModalPostId('doc-returns')}>{t.footerLinkReturn}</button></li>
                          </ul>
                      </div>
                      <div className="footer__grid__item">
                          <div className="h5">{t.footerContactsTitle}</div>
                          <ul className="footer__grid__list">
                              <li><a href="tel:+79222079772">+7 922 207 97 72</a></li>
                              <li><a href="mailto:info@trainingendurance.com">info@trainingendurance.com</a></li>
                          </ul>
                      </div>
                      <div className="footer__grid__item footer__grid__item--social">
                          {faqHref && (
                          <a href={faqHref} className="btn-info">
                            <span className="btn-info__icon"><svg><use href="#icon-info" /></svg></span>
                              <span>{t.faqLabel}</span>
                          </a>
                          )}
                          <ul className="social">
                              <li>
                                  <a href="https://t.me/TrainingEnduranceBot">
                                  <img src={`${A}/images/telegram.svg`} alt="Telegram" loading="lazy" />
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* ===== MODAL ===== */}
      {modalPostId && (
      <div className="modal modal--post" style={{ opacity: 1, pointerEvents: 'auto' }}>
          <div className="modal__overlay" onClick={closeModal} />
          <div className="modal__dialog" style={{ transform: 'translateY(0)' }}>
              <div className="modal__close" aria-label={t.modalClose} onClick={closeModal}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <circle cx="18" cy="18" r="18" fill="#333336"/>
                      <path d="M22 14L14 22M14 14L18 18L22 22" stroke="#D6D6D7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </div>
              <div className="modal__content">
                  <h2 className="modal__title">{activePost?.title || ''}</h2>
                  <div className="modal__body" dangerouslySetInnerHTML={{ __html: activePost?.body || '' }} />
              </div>
          </div>
      </div>
      )}
  </main>

  {/* ===== SVG SPRITE — exact copy from original ===== */}
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <symbol id="icon-stopwatch" viewBox="0 0 29 35" fill="none">
      <path d="M11.25 1.5H17.75M14.5 20.7L19.375 15.9M27.5 20.7C27.5 27.7692 21.6797 33.5 14.5 33.5C7.3203 33.5 1.5 27.7692 1.5 20.7C1.5 13.6308 7.3203 7.9 14.5 7.9C21.6797 7.9 27.5 13.6308 27.5 20.7Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-drop" viewBox="0 0 27 34" fill="none">
      <path d="M19.8906 5.90006C18.0571 3.7825 15.9935 1.8757 13.7379 0.214901C13.5382 0.0750301 13.3003 0 13.0566 0C12.8128 0 12.5749 0.0750301 12.3752 0.214901C10.1238 1.87639 8.06419 3.78317 6.23438 5.90006C2.15383 10.5862 0 15.5262 0 20.1872C0 23.6516 1.37622 26.9741 3.82592 29.4237C6.27561 31.8734 9.59811 33.2497 13.0625 33.2497C16.5269 33.2497 19.8494 31.8734 22.2991 29.4237C24.7488 26.9741 26.125 23.6516 26.125 20.1872C26.125 15.5262 23.9712 10.5862 19.8906 5.90006ZM13.0625 30.8747C10.229 30.8715 7.51238 29.7445 5.50877 27.7409C3.50515 25.7373 2.37814 23.0207 2.375 20.1872C2.375 11.6921 10.6088 4.60123 13.0625 2.67154C15.5162 4.60123 23.75 11.6891 23.75 20.1872C23.7469 23.0207 22.6198 25.7373 20.6162 27.7409C18.6126 29.7445 15.896 30.8715 13.0625 30.8747ZM21.3587 21.5736C21.0507 23.2935 20.2233 24.8778 18.9876 26.1132C17.7519 27.3486 16.1674 28.1758 14.4474 28.4833C14.3821 28.4938 14.3161 28.4993 14.25 28.4997C13.9521 28.4996 13.6652 28.3876 13.446 28.1858C13.2269 27.9841 13.0915 27.7073 13.0669 27.4105C13.0422 27.1136 13.13 26.8183 13.3129 26.5832C13.4957 26.3481 13.7603 26.1902 14.0541 26.141C16.5137 25.7269 18.6007 23.6398 19.0178 21.1758C19.0706 20.8651 19.2445 20.5882 19.5015 20.4059C19.7584 20.2235 20.0773 20.1507 20.3879 20.2035C20.6985 20.2562 20.9754 20.4302 21.1578 20.6872C21.3401 20.9441 21.4129 21.263 21.3602 21.5736H21.3587Z" fill="currentColor"/>
    </symbol>
    <symbol id="icon-bluetooth" viewBox="0 0 18 33" fill="none">
      <path d="M1.5 9.00006L16.5 24.0001L9 31.5001V1.50006L16.5 9.00006L1.5 24.0001" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-menu" viewBox="0 0 32 26" fill="none">
      <path d="M1.5 13H20.8333M1.5 24.5H8.75M1.5 1.5H30.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-zone-circle" viewBox="0 0 56 56" fill="none">
      <path d="M28 55C42.9117 55 55 42.9117 55 28C55 13.0883 42.9117 1 28 1C13.0883 1 1 13.0883 1 28C1 42.9117 13.0883 55 28 55Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 44.2C36.947 44.2 44.2 36.947 44.2 28C44.2 19.053 36.947 11.8 28 11.8C19.053 11.8 11.8 19.053 11.8 28C11.8 36.947 19.053 44.2 28 44.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 33.4C30.9823 33.4 33.4 30.9823 33.4 28C33.4 25.0177 30.9823 22.6 28 22.6C25.0177 22.6 22.6 25.0177 22.6 28C22.6 30.9823 25.0177 33.4 28 33.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-shape-control" viewBox="0 0 56 51" fill="none">
      <path d="M28 36.3889V50M38.8 30.9444V50M49.6 20.0556V50M55 1L31.6558 24.5363C31.5304 24.6631 31.3814 24.7637 31.2174 24.8323C31.0534 24.9009 30.8776 24.9362 30.7 24.9362C30.5224 24.9362 30.3466 24.9009 30.1826 24.8323C30.0186 24.7637 29.8696 24.6631 29.7442 24.5363L20.8558 15.5748C20.6026 15.3196 20.2593 15.1763 19.9013 15.1763C19.5434 15.1763 19.2001 15.3196 18.9469 15.5748L1 33.6667M6.4 41.8333V50M17.2 30.9444V50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-start" viewBox="0 0 56 43" fill="none">
      <path d="M28 28.3337L38.8 17.4007M4.618 42C2.24799 37.845 1.00018 33.1316 1 28.3336C0.999819 23.5356 2.24727 18.8221 4.61697 14.6669C6.98667 10.5116 10.3951 7.06108 14.4997 4.66204C18.6043 2.263 23.2604 1 28 1C32.7396 1 37.3957 2.263 41.5003 4.66204C45.6049 7.06108 49.0133 10.5116 51.383 14.6669C53.7527 18.8221 55.0002 23.5356 55 28.3336C54.9998 33.1316 53.752 37.845 51.382 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-energy" viewBox="0 0 31 51" fill="none">
      <path d="M2.61599 30.3991C2.31123 30.4007 2.01243 30.2707 1.7543 30.0243C1.49617 29.7779 1.28932 29.4251 1.15776 29.007C1.02621 28.5889 0.975365 28.1226 1.01113 27.6623C1.04689 27.202 1.1678 26.7666 1.3598 26.4066L17.3038 1.42314C17.4234 1.21318 17.5863 1.0713 17.7659 1.02079C17.9456 0.970272 18.1311 1.01412 18.2922 1.14514C18.4532 1.27616 18.5802 1.48657 18.6523 1.74182C18.7244 1.99707 18.7372 2.282 18.6888 2.54984L15.5966 17.295C15.5055 17.6661 15.4748 18.0654 15.5074 18.4585C15.54 18.8516 15.6347 19.2268 15.7836 19.5519C15.9325 19.8771 16.131 20.1424 16.3621 20.3253C16.5932 20.5081 16.85 20.6029 17.1105 20.6016H28.384C28.6888 20.6001 28.9876 20.73 29.2457 20.9764C29.5038 21.2229 29.7107 21.5756 29.8422 21.9937C29.9738 22.4118 30.0246 22.8781 29.9889 23.3384C29.9531 23.7987 29.8322 24.2341 29.6402 24.5941L13.6962 49.5776C13.5766 49.7876 13.4137 49.9294 13.2341 49.9799C13.0544 50.0305 12.8689 49.9866 12.7078 49.8556C12.5468 49.7246 12.4198 49.5142 12.3477 49.2589C12.2756 49.0037 12.2628 48.7187 12.3112 48.4509L15.4034 33.7057C15.4945 33.3346 15.5252 32.9354 15.4926 32.5423C15.46 32.1492 15.3653 31.774 15.2164 31.4488C15.0675 31.1237 14.869 30.8583 14.6379 30.6755C14.4068 30.4926 14.15 30.3978 13.8895 30.3991H2.61599Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-zone" viewBox="0 0 45 45" fill="none">
      <path d="M17.8333 6.16667H1.5M22.5 38.8333H1.5M27.1667 1.5V10.8333M31.8333 34.1667V43.5M43.5 22.5H22.5M43.5 38.8333H31.8333M43.5 6.16667H27.1667M13.1667 17.8333V27.1667M13.1667 22.5H1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-heart" viewBox="0 0 24 24" fill="none">
      <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.81 3.89 12 5C12.19 3.89 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-heart-rate" viewBox="0 0 24 24" fill="none">
      <path d="M2 12H5L7 6L10 18L13 10L15 14L17 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-flag-ru" viewBox="0 0 24 24" fill="none">
      <path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="#F0F0F0"/>
      <path d="M22.3158 15.826C22.758 14.6343 23 13.3454 23 11.9999C23 10.6544 22.758 9.36548 22.3158 8.17383H1.68419C1.24204 9.36548 1 10.6544 1 11.9999C1 13.3454 1.24204 14.6343 1.68419 15.826L12 16.7825L22.3158 15.826Z" fill="#0052B4"/>
      <path d="M12.0033 23.0001C16.7329 23.0001 20.7649 20.015 22.3191 15.8262H1.6875C3.24172 20.015 7.27369 23.0001 12.0033 23.0001Z" fill="#D80027"/>
    </symbol>
    <symbol id="icon-flag-us" viewBox="0 0 24 24" fill="none">
      <path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="#F0F0F0"/>
      <path d="M3.27387 5.30273C2.40981 6.42693 1.75828 7.72265 1.37891 9.13026H7.1014L3.27387 5.30273Z" fill="#0052B4"/>
      <path d="M22.6208 9.13022C22.2415 7.72265 21.5899 6.42693 20.7259 5.30273L16.8984 9.13022H22.6208Z" fill="#0052B4"/>
      <path d="M1.37891 14.8701C1.75832 16.2777 2.40986 17.5734 3.27387 18.6976L7.10127 14.8701H1.37891Z" fill="#0052B4"/>
      <path d="M18.6986 3.27391C17.5744 2.40986 16.2787 1.75832 14.8711 1.37891V7.10136L18.6986 3.27391Z" fill="#0052B4"/>
      <path d="M5.30469 20.7258C6.42888 21.5899 7.7246 22.2414 9.13217 22.6208V16.8984L5.30469 20.7258Z" fill="#0052B4"/>
      <path d="M9.13213 1.37891C7.72456 1.75832 6.42884 2.40986 5.30469 3.27387L9.13213 7.10131V1.37891Z" fill="#0052B4"/>
      <path d="M14.8711 22.6208C16.2787 22.2414 17.5744 21.5899 18.6985 20.7259L14.8711 16.8984V22.6208Z" fill="#0052B4"/>
      <path d="M16.8984 14.8701L20.7259 18.6976C21.5899 17.5735 22.2415 16.2777 22.6208 14.8701H16.8984Z" fill="#0052B4"/>
      <path d="M22.9069 10.5652H13.4348V1.09311C12.9591 1.03113 12.4798 1.00002 12 1C11.5136 1 11.0349 1.03197 10.5652 1.09311V10.5652H1.09311C1.03113 11.0409 1.00002 11.5202 1 12C1 12.4864 1.03197 12.9651 1.09311 13.4348H10.5652V22.9069C11.5177 23.031 12.4823 23.031 13.4348 22.9069V13.4348H22.9069C22.9689 12.9591 23 12.4798 23 12C23 11.5137 22.968 11.0349 22.9069 10.5652Z" fill="#D80027"/>
      <path d="M14.8711 14.8702L19.7797 19.7787C20.0053 19.5528 20.2211 19.3172 20.4263 19.0725L16.2238 14.8701H14.8711V14.8702Z" fill="#D80027"/>
      <path d="M9.13128 14.8701H9.13119L4.22266 19.7787C4.44858 20.0043 4.6842 20.22 4.92885 20.4252L9.13128 16.2227V14.8701Z" fill="#D80027"/>
      <path d="M9.12939 9.13039V9.1303L4.22081 4.22168C3.99516 4.4476 3.77942 4.68322 3.57422 4.92787L7.77669 9.13034L9.12939 9.13039Z" fill="#D80027"/>
      <path d="M14.8711 9.13041L19.7797 4.22175C19.5538 3.99609 19.3182 3.78037 19.0735 3.5752L14.8711 7.77767V9.13041Z" fill="#D80027"/>
    </symbol>
    <symbol id="icon-info" viewBox="0 0 16 16" fill="none">
      <path d="M5.713 5.65C5.87757 5.18217 6.20241 4.78767 6.62997 4.53639C7.05753 4.28511 7.56023 4.19326 8.04902 4.2771C8.53782 4.36094 8.98117 4.61507 9.30055 4.99447C9.61994 5.37387 9.79474 5.85407 9.794 6.35C9.794 7.75 7.694 8.45 7.694 8.45M7.75 11.25H7.757M14.75 7.75C14.75 11.616 11.616 14.75 7.75 14.75C3.88401 14.75 0.75 11.616 0.75 7.75C0.75 3.88401 3.88401 0.75 7.75 0.75C11.616 0.75 14.75 3.88401 14.75 7.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
  </svg>

    </div>
  );
};

export default LactateLanding;
