import { useState, useEffect } from 'react';
import { LactateLanding, FaqPage } from './components/lactate-landing';
import type { Lang } from './components/lactate-landing';

function getPage(): 'landing' | 'faq' {
  return window.location.pathname.endsWith('/faq') ? 'faq' : 'landing';
}

export function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') === 'en' ? 'en' : 'ru';
  });
  const [page, setPage] = useState<'landing' | 'faq'>(getPage);

  useEffect(() => {
    const onPop = () => setPage(getPage());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const goTo = (p: 'landing' | 'faq') => {
    const path = p === 'faq' ? '/faq' : '/';
    window.history.pushState(null, '', path);
    setPage(p);
    window.scrollTo(0, 0);
  };

  if (page === 'faq') {
    return (
      <FaqPage
        lang={lang}
        onBack={() => goTo('landing')}
        onLanguageChange={setLang}
      />
    );
  }

  return (
    <LactateLanding
      lang={lang}
      onLanguageChange={setLang}
      onFaqClick={() => goTo('faq')}
    />
  );
}
