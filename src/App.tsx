import { useState } from 'react';
import { LactateLanding } from './components/lactate-landing';
import type { Lang } from './components/lactate-landing';

export function App() {
  const [lang, setLang] = useState<Lang>('ru');

  return (
    <LactateLanding
      lang={lang}
      onLanguageChange={setLang}
      onOrder={() => alert('Order clicked')}
      faqHref="/faq"
    />
  );
}
