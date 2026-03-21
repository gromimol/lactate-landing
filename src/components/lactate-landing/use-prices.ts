import { useState, useEffect } from 'react';

const API_URL = 'https://store.trainingendurance.com/shop-api';
const CHANNEL_TOKEN = 'lactate-store';

const ANALYZER_SLUG = 'trainingendurance-sports-performance-analyzer';
const STRIPS_SLUG = 'test-strips-for-trainingendurance-sports-performance-analyzer';

const QUERY = `{
  analyzer: product(slug: "${ANALYZER_SLUG}") {
    variants { sku priceWithTax }
  }
  strips: product(slug: "${STRIPS_SLUG}") {
    variants { sku priceWithTax }
  }
}`;

function formatPrice(kopeks: number): string {
  const rub = kopeks / 100;
  return new Intl.NumberFormat('ru-RU').format(rub) + ' \u20BD';
}

export interface Prices {
  analyzerPrice: string;
  stripsPrice: string;
}

export function usePrices(lang: string): Prices | null {
  const [prices, setPrices] = useState<Prices | null>(null);

  useEffect(() => {
    fetch(`${API_URL}?languageCode=${lang}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'vendure-token': CHANNEL_TOKEN,
      },
      body: JSON.stringify({ query: QUERY }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        const analyzerVariants = data?.analyzer?.variants || [];
        const stripsVariants = data?.strips?.variants || [];

        const analyzerMin = analyzerVariants.length
          ? Math.min(...analyzerVariants.map((v: any) => v.priceWithTax))
          : null;
        const stripsMin = stripsVariants.length
          ? Math.min(...stripsVariants.map((v: any) => v.priceWithTax))
          : null;

        setPrices({
          analyzerPrice: analyzerMin ? formatPrice(analyzerMin) : '',
          stripsPrice: stripsMin ? formatPrice(stripsMin) : '',
        });
      })
      .catch(() => {});
  }, [lang]);

  return prices;
}
