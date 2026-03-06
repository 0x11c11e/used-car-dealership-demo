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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-100 p-2 rounded-lg">
          <Calculator className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Payment Calculator</h2>
          <p className="text-sm text-gray-500">Estimate your monthly payment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              min={0}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              min={0}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value={24}>24 months (2 years)</option>
            <option value={36}>36 months (3 years)</option>
            <option value={48}>48 months (4 years)</option>
            <option value={60}>60 months (5 years)</option>
            <option value={72}>72 months (6 years)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (APR)</label>
          <div className="relative">
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              min={0}
              step={0.1}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-slate-900 rounded-xl p-6 text-center">
        <p className="text-gray-400 text-sm mb-1">Estimated Monthly Payment</p>
        <p className="text-amber-400 text-5xl font-bold">{formatPrice(monthlyPayment)}</p>
        <p className="text-gray-400 text-sm mt-1">per month</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
          <p className="text-sm font-semibold text-gray-900">{formatPrice(Math.max(0, vehiclePrice - downPayment))}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Total Interest</p>
          <p className="text-sm font-semibold text-gray-900">{formatPrice(Math.max(0, totalInterest))}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Total Cost</p>
          <p className="text-sm font-semibold text-gray-900">{formatPrice(totalCost)}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        * This calculator provides estimates only. Actual terms may vary based on credit approval.
      </p>
    </div>
  );
}
