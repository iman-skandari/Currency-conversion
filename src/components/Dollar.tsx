import React, { useState, ChangeEvent } from 'react'

interface CurrencyConverterProps {
  initialRate?: number;
}

interface CurrencyState {
  usd: string;
  irr: string;
}

const Dollar: React.FC<CurrencyConverterProps> = ({ initialRate = 500000 }) => {
  const [currencies, setCurrencies] = useState<CurrencyState>({
    usd: '',
    irr: ''
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
        if (type === 'usd') {
          setCurrencies(prev => ({
            ...prev,
            irr: (numericValue * initialRate).toFixed(2)
          }));
        } else {
          setCurrencies(prev => ({
            ...prev,
            usd: (numericValue / initialRate).toFixed(2)
          }));
        }
      }
    } else {
      // اگر مقدار خالی است، هر دو فیلد را خالی می‌کنیم
      setCurrencies({
        usd: '',
        irr: ''
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

export default Dollar;