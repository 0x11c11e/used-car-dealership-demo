'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface FinancingCalculatorProps {
  initialPrice?: number;
}

export default function FinancingCalculator({ initialPrice = 30000 }: FinancingCalculatorProps) {
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(6.9);

  const { monthlyPayment, totalCost, totalInterest } = useMemo(() => {
    const principal = vehiclePrice - downPayment;
    if (principal <= 0) {
      return { monthlyPayment: 0, totalCost: downPayment, totalInterest: 0 };
    }
    const r = interestRate / 100 / 12;
    const n = loanTerm;
    let monthly: number;
    if (r === 0) {
      monthly = principal / n;
    } else {
      monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const total = monthly * n + downPayment;
    const interest = total - vehiclePrice;
    return {
      monthlyPayment: monthly,
      totalCost: total,
      totalInterest: interest,
    };
  }, [vehiclePrice, downPayment, loanTerm, interestRate]);

  const principal = Math.max(0, vehiclePrice - downPayment);
  const totalInterestSafe = Math.max(0, totalInterest);
  const principalPct = totalCost > 0 ? Math.round((vehiclePrice / totalCost) * 100) : 100;
  const interestPct = 100 - principalPct;

  const sliderTrack = (value: number, min: number, max: number) =>
    `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((value - min) / (max - min)) * 100}%, #e2e8f0 ${((value - min) / (max - min)) * 100}%, #e2e8f0 100%)`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-navy-gradient p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 p-2.5 rounded-xl border border-amber-400/30">
            <Calculator className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Payment Calculator</h2>
            <p className="text-sm text-gray-400">Estimate your monthly payment</p>
          </div>
        </div>

        {/* Monthly payment display */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Estimated Monthly Payment</p>
          <p className="text-gradient font-bold text-6xl font-display">{formatPrice(monthlyPayment)}</p>
          <p className="text-gray-400 text-sm mt-1">per month for {loanTerm} months</p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-7">
        {/* Vehicle Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Vehicle Price</label>
            <span className="text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg">
              {formatPrice(vehiclePrice)}
            </span>
          </div>
          <input
            type="range"
            min={5000}
            max={150000}
            step={500}
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(Number(e.target.value))}
            style={{ background: sliderTrack(vehiclePrice, 5000, 150000) }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$5K</span><span>$150K</span>
          </div>
        </div>

        {/* Down Payment Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Down Payment</label>
            <span className="text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg">
              {formatPrice(downPayment)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.min(vehiclePrice, 50000)}
            step={500}
            value={Math.min(downPayment, Math.min(vehiclePrice, 50000))}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            style={{ background: sliderTrack(Math.min(downPayment, 50000), 0, Math.min(vehiclePrice, 50000)) }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$0</span><span>{formatPrice(Math.min(vehiclePrice, 50000))}</span>
          </div>
        </div>

        {/* Loan Term Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Loan Term</label>
            <span className="text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg">
              {loanTerm} months ({loanTerm / 12} yrs)
            </span>
          </div>
          <input
            type="range"
            min={24}
            max={84}
            step={12}
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            style={{ background: sliderTrack(loanTerm, 24, 84) }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>24 mo</span><span>84 mo</span>
          </div>
        </div>

        {/* Interest Rate Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Interest Rate (APR)</label>
            <span className="text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg">
              {interestRate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={25}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{ background: sliderTrack(interestRate, 0, 25) }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span><span>25%</span>
          </div>
        </div>

        {/* CSS Donut visualization */}
        {totalCost > 0 && (
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Loan Breakdown</p>
            <div className="flex items-center gap-6">
              <div className="shrink-0">
                <div
                  className="w-24 h-24 rounded-full"
                  style={{
                    background: `conic-gradient(#f59e0b 0% ${principalPct}%, #cbd5e1 ${principalPct}% 100%)`,
                  }}
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-full m-4 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">{principalPct}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="text-xs text-gray-600">Principal</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{formatPrice(vehiclePrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                    <span className="text-xs text-gray-600">Interest ({interestPct}%)</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{formatPrice(totalInterestSafe)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 rounded-xl p-3.5">
            <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
            <p className="text-sm font-bold text-gray-900">{formatPrice(principal)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3.5">
            <p className="text-xs text-gray-500 mb-1">Total Interest</p>
            <p className="text-sm font-bold text-gray-900">{formatPrice(totalInterestSafe)}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-100">
            <p className="text-xs text-amber-600 mb-1">Total Cost</p>
            <p className="text-sm font-bold text-amber-700">{formatPrice(totalCost)}</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center">
          * This calculator provides estimates only. Actual terms may vary based on credit approval.
        </p>
      </div>
    </div>
  );
}

