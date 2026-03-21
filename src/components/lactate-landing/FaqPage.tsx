import React, { useState, useMemo, useEffect } from 'react';
import { faqUI, faqData } from './faq-data';
import type { Lang } from './translations';
import { translations } from './translations';

import logoSvg from './images/logo.svg';
import telegramSvg from './images/telegram.svg';

interface FaqPageProps {
  lang: Lang;
  onBack: () => void;
  onLanguageChange?: (lang: Lang) => void;
}

function formatInline(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function renderContent(text: string): string {
  if (!text) return '';
  return text.split('\n').map(raw => {
    const t = raw.trim();
    if (!t) return '<div class="faq-spacer"></div>';
    if (t.startsWith('!warn '))
      return `<div class="faq-warn">${formatInline(t.slice(6))}</div>`;
    if (/^\*\*(Step |Шаг |Code |Код |LT |Lactate |VO2 )/.test(t)) {
      const c = t.replace(/\*\*/g, '');
      const di = c.indexOf('—'), doti = c.indexOf('.');
      const sp = di > -1 ? di : (doti > -1 && doti < 50) ? doti + 1 : -1;
      if (sp > -1) return `<div class="faq-step"><span class="faq-accent">${c.slice(0, sp)}</span><span>${c.slice(sp)}</span></div>`;
      return `<div class="faq-step faq-accent">${c}</div>`;
    }
    if (/^\*\*[^*]+\*\*$/.test(t))
      return `<div class="faq-bold">${t.slice(2, -2)}</div>`;
    if (t.startsWith('•'))
      return `<div class="faq-bullet"><span class="faq-accent">—</span><span>${formatInline(t.slice(1).trim())}</span></div>`;
    const numMatch = t.match(/^(\d+)\.\s*(.*)/);
    if (numMatch)
      return `<div class="faq-numbered"><span class="faq-num">${numMatch[1]}</span><span>${formatInline(numMatch[2])}</span></div>`;
    return `<div class="faq-line">${formatInline(t)}</div>`;
  }).join('');
}

export const FaqPage: React.FC<FaqPageProps> = ({ lang, onBack, onLanguageChange }) => {
  const t = translations[lang];
  const ui = faqUI[lang];
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const close = () => setLangOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const langOptions = [
    { code: 'ru' as Lang, label: 'RU', flag: '#icon-flag-ru' },
    { code: 'en' as Lang, label: 'EN', flag: '#icon-flag-us' },
  ];
  const currentLangOpt = langOptions.find(o => o.code === lang) || langOptions[0];
  const data = faqData[lang];
  const [search, setSearch] = useState('');
  const [article, setArticle] = useState<{ sectionId: string; questionId: string } | null>(null);

  const totalQuestions = useMemo(() => data.reduce((sum, s) => sum + s.questions.length, 0), [data]);

  const countLabel = lang === 'ru'
    ? totalQuestions % 100 >= 11 && totalQuestions % 100 <= 14 ? 'вопросов'
      : totalQuestions % 10 === 1 ? 'вопрос'
      : totalQuestions % 10 >= 2 && totalQuestions % 10 <= 4 ? 'вопроса'
      : 'вопросов'
    : totalQuestions === 1 ? 'question' : 'questions';

  const filtered = useMemo(() => {
    const low = search.toLowerCase();
    if (!low) return data;
    return data
      .map(s => ({ ...s, questions: s.questions.filter(q => q.q.toLowerCase().includes(low) || q.a.toLowerCase().includes(low)) }))
      .filter(s => s.questions.length > 0);
  }, [data, search]);

  const showArticle = (sectionId: string, questionId: string) => {
    setArticle({ sectionId, questionId });
    window.scrollTo(0, 0);
  };

  const showCatalog = () => {
    setArticle(null);
  };

  const h = (v: string) => ({ dangerouslySetInnerHTML: { __html: v } });

  const header = (
    <header className="header">
      <div className="container">
        <div className="header__left">
          <div className="logo"><a href="#" onClick={e => { e.preventDefault(); onBack(); }}><img src={logoSvg} alt="" /></a></div>
          <ul className="menu">
            <li><a href="#" onClick={e => { e.preventDefault(); onBack(); }}>{t.menuArticles}</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onBack(); }}>{t.menuVideo}</a></li>
          </ul>
        </div>
        <div className="header__right">
          <a href="#" className="btn-info btn-info--active" onClick={e => e.preventDefault()}>
            <span className="btn-info__icon"><svg><use href="#icon-info" /></svg></span>
            <span className="hide-mobile">{t.faqLabel}</span>
          </a>
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
              <a href="https://t.me/TrainingEnduranceBot" target="_blank" rel="noopener noreferrer">
                <img src={telegramSvg} alt="Telegram" loading="lazy" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );

  if (article) {
    const section = data.find(s => s.id === article.sectionId);
    const question = section?.questions.find(q => q.id === article.questionId);
    if (!section || !question) return null;

    const flat = data.flatMap(s => s.questions.map(q => ({ sec: s, q })));
    const idx = flat.findIndex(f => f.sec.id === article.sectionId && f.q.id === article.questionId);
    const prev = idx > 0 ? flat[idx - 1] : null;
    const next = idx < flat.length - 1 ? flat[idx + 1] : null;

    return (
      <div className="lactate-landing">
        {header}
        <main className="faq-page">
          <div className="container">
            <div className="faq-page__body">
              <div className="faq-page__content">
                <div className="faq-article">
                  <button className="faq-back" onClick={showCatalog}>{ui.back}</button>
                  <div className="faq-article__meta">
                    <span className="faq-section-badge">{section.icon} {section.title}</span>
                  </div>
                  <h1 className="faq-article__title">{question.q}</h1>
                  <div className="faq-article__body" {...h(renderContent(question.a))} />
                  <div className="faq-article__nav">
                    {prev ? (
                      <button className="faq-nav-btn faq-nav-btn--prev" onClick={() => showArticle(prev.sec.id, prev.q.id)}>
                        <span className="faq-nav-btn__label">{ui.prev}</span>
                        <span className="faq-nav-btn__text">{prev.q.q}</span>
                      </button>
                    ) : <div />}
                    {next ? (
                      <button className="faq-nav-btn faq-nav-btn--next" onClick={() => showArticle(next.sec.id, next.q.id)}>
                        <span className="faq-nav-btn__label">{ui.next}</span>
                        <span className="faq-nav-btn__text">{next.q.q}</span>
                      </button>
                    ) : <div />}
                  </div>
                </div>
              </div>
              <SupportSidebar lang={lang} noAnswerText={ui.noAnswer} />
            </div>
          </div>
        <div className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__grid__item logo">
              <a href="#" onClick={e => { e.preventDefault(); onBack(); }}><img src={logoSvg} alt="Training Endurance" loading="lazy" /></a>
            </div>
            <div className="footer__grid__item">
              <div className="h5">{t.footerInfoTitle}</div>
              <ul className="footer__grid__list">
                <li><a href={`https://lactate.store/${lang}/legal/terms`} className="text-decoration doc-link" target="_blank" rel="noopener noreferrer">{t.footerLinkTerms}</a></li>
                <li><a href={`https://lactate.store/${lang}/legal/offer`} className="text-decoration doc-link" target="_blank" rel="noopener noreferrer">{t.footerLinkOffer}</a></li>
                <li><a href={`https://lactate.store/${lang}/legal/returns`} className="text-decoration doc-link" target="_blank" rel="noopener noreferrer">{t.footerLinkReturn}</a></li>
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
              <a href="#" className="btn-info btn-info--active" onClick={e => e.preventDefault()}>
                <span className="btn-info__icon"><svg><use href="#icon-info" /></svg></span>
                <span>{t.faqLabel}</span>
              </a>
              <ul className="social">
                <li>
                  <a href="https://t.me/TrainingEnduranceBot" target="_blank" rel="noopener noreferrer">
                    <img src={telegramSvg} alt="Telegram" loading="lazy" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
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
      </main>
      </div>
    );
  }

  return (
    <div className="lactate-landing">
      {header}
      <main className="faq-page">
        <div className="container">
          <div className="faq-catalog__head">
            <h1 className="faq-catalog__title">{ui.title}</h1>
            <div className="questions-count">{totalQuestions} {countLabel}</div>
          </div>
          <div className="faq-page__body">
            <div className="faq-page__content">
              <input
                type="text"
                className="faq-search"
                placeholder={ui.search}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="faq-sections">
                {filtered.length === 0 ? (
                  <div className="faq-not-found">{ui.notFound}</div>
                ) : (
                  filtered.map(sec => (
                    <div key={sec.id} className="faq-section">
                      <div className="faq-section__header">
                        <div className="faq-section__icon">{sec.icon}</div>
                        <h2 className="faq-section__title">{sec.title}</h2>
                      </div>
                      <div className="faq-section__questions">
                        {sec.questions.map(q => (
                          <button key={q.id} className="faq-question-btn" onClick={() => showArticle(sec.id, q.id)}>
                            <span>{q.q}</span>
                            <span className="faq-question-btn__arrow">›</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <SupportSidebar lang={lang} noAnswerText={ui.noAnswer} />
          </div>
        </div>
      </main>
      <div className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__grid__item logo">
              <a href="#" onClick={e => { e.preventDefault(); onBack(); }}><img src={logoSvg} alt="Training Endurance" loading="lazy" /></a>
            </div>
            <div className="footer__grid__item">
              <div className="h5">{t.footerInfoTitle}</div>
              <ul className="footer__grid__list">
                <li><a href={`https://lactate.store/${lang}/legal/terms`} className="text-decoration doc-link" target="_blank" rel="noopener noreferrer">{t.footerLinkTerms}</a></li>
                <li><a href={`https://lactate.store/${lang}/legal/offer`} className="text-decoration doc-link" target="_blank" rel="noopener noreferrer">{t.footerLinkOffer}</a></li>
                <li><a href={`https://lactate.store/${lang}/legal/returns`} className="text-decoration doc-link" target="_blank" rel="noopener noreferrer">{t.footerLinkReturn}</a></li>
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
              <a href="#" className="btn-info btn-info--active" onClick={e => e.preventDefault()}>
                <span className="btn-info__icon"><svg><use href="#icon-info" /></svg></span>
                <span>{t.faqLabel}</span>
              </a>
              <ul className="social">
                <li>
                  <a href="https://t.me/TrainingEnduranceBot" target="_blank" rel="noopener noreferrer">
                    <img src={telegramSvg} alt="Telegram" loading="lazy" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
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

const SupportSidebar: React.FC<{ lang: string; noAnswerText: string }> = ({ noAnswerText }) => (
  <div className="faq-page__support">
    <div className="faq-page__support__title">{noAnswerText}</div>
    <ul className="support-links-list">
      <li>
        <a href="https://t.me/TrainingEnduranceBot" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 24C18.629 24 24 18.629 24 12C24 5.371 18.629 0 12 0C5.371 0 0 5.371 0 12C0 18.629 5.371 24 12 24ZM5.491 11.74L17.061 7.279C17.598 7.085 18.067 7.41 17.893 8.222L17.894 8.221L15.924 17.502C15.778 18.16 15.387 18.32 14.84 18.01L11.84 15.799L10.393 17.193C10.233 17.353 10.098 17.488 9.788 17.488L10.001 14.435L15.561 9.412C15.803 9.199 15.507 9.079 15.188 9.291L8.317 13.617L5.355 12.693C4.712 12.489 4.698 12.05 5.491 11.74Z" fill="#545454"/>
            </svg>
          </span>
          telactate
        </a>
      </li>
      <li>
        <a href="mailto:info@trainingendurance.com">
          <span className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#545454"/>
              <path d="M18 9.6875L12.6054 12.9089C12.4223 13.0086 12.2144 13.0611 12.0027 13.0611C11.791 13.0611 11.5831 13.0086 11.4 12.9089L6 9.6875M7.2 8H16.8C17.4627 8 18 8.50368 18 9.125V15.875C18 16.4963 17.4627 17 16.8 17H7.2C6.53726 17 6 16.4963 6 15.875V9.125C6 8.50368 6.53726 8 7.2 8Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          info@trainingendurance.com
        </a>
      </li>
    </ul>
  </div>
);
