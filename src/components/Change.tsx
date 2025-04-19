import React, { useState, ChangeEvent } from 'react'

interface CurrencyConverterProps {
  initialRate?: number;
}

interface CurrencyState {
  usd: string;
  irr: string;
  eur: string;
  gbp: string;
  aed: string;
}

interface ExchangeRates {
  [key: string]: number;
}

const Change: React.FC<CurrencyConverterProps> = ({ initialRate = 500000 }) => {
  const exchangeRates: ExchangeRates = {
    usd: 1,
    eur: 0.92,    // 1 USD = 0.92 EUR
    gbp: 0.79,    // 1 USD = 0.79 GBP
    aed: 3.67,    // 1 USD = 3.67 AED
    irr: initialRate
  };

  const [currencies, setCurrencies] = useState<CurrencyState>({
    usd: '',
    irr: '',
    eur: '',
    gbp: '',
    aed: ''
  });

  const handleCurrencyChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof CurrencyState
  ): void => {
    const value = e.target.value;
    
    // ابتدا مقدار وارد شده را در state ذخیره می‌کنیم
    setCurrencies(prev => ({ ...prev, [type]: value }));

    // اگر مقدار وارد شده معتبر است، تبدیل را انجام می‌دهیم
    if (value) {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        const newCurrencies = { ...currencies, [type]: value };
        Object.keys(exchangeRates).forEach((currency) => {
          if (currency !== type) {
            const rate = exchangeRates[currency] / exchangeRates[type];
            newCurrencies[currency as keyof CurrencyState] = (numericValue * rate).toFixed(2);
          }
        });
        setCurrencies(newCurrencies);
      }
    } else {
      // اگر مقدار خالی است، تمام فیلدها را خالی می‌کنیم
      setCurrencies({
        usd: '',
        irr: '',
        eur: '',
        gbp: '',
        aed: ''
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">مبدل ارز</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">دلار آمریکا (USD):</label>
          <input
            type="number"
            value={currencies.usd}
            onChange={(e) => handleCurrencyChange(e, 'usd')}
            className="w-full p-2 border rounded"
            placeholder="مقدار دلار را وارد کنید"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block mb-2">یورو (EUR):</label>
          <input
            type="number"
            value={currencies.eur}
            onChange={(e) => handleCurrencyChange(e, 'eur')}
            className="w-full p-2 border rounded"
            placeholder="مقدار یورو را وارد کنید"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block mb-2">پوند انگلیس (GBP):</label>
          <input
            type="number"
            value={currencies.gbp}
            onChange={(e) => handleCurrencyChange(e, 'gbp')}
            className="w-full p-2 border rounded"
            placeholder="مقدار پوند را وارد کنید"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block mb-2">درهم امارات (AED):</label>
          <input
            type="number"
            value={currencies.aed}
            onChange={(e) => handleCurrencyChange(e, 'aed')}
            className="w-full p-2 border rounded"
            placeholder="مقدار درهم را وارد کنید"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block mb-2">ریال ایران (IRR):</label>
          <input
            type="number"
            value={currencies.irr}
            onChange={(e) => handleCurrencyChange(e, 'irr')}
            className="w-full p-2 border rounded"
            placeholder="مقدار ریال را وارد کنید"
            min="0"
            step="1000"
          />
        </div>
        <div className="text-sm text-gray-60">
          نرخ تبدیل: 1 دلار = {initialRate.toLocaleString()} ریال
        </div>
      </div>
    </div>
  );
};

export default Change;