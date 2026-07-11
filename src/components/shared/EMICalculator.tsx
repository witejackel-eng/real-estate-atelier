'use client';

import { useState, useMemo } from 'react';
import { SectionLabel } from './SectionLabel';
import { Container } from './Container';

export function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);

  const emi = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    if (monthlyRate === 0) return loanAmount / months;
    const emiVal =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return emiVal;
  }, [loanAmount, interestRate, tenure]);

  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <section className="py-20 md:py-28 bg-offwhite">
      <Container>
        <SectionLabel label="/ EMI CALCULATOR" />
        <h2 className="font-display text-3xl md:text-4xl mb-8">Understand your monthly commitment.</h2>

        <div className="grid md:grid-cols-2 gap-12 mt-10">
          <div className="space-y-8">
            <div>
              <label className="font-mono text-xs uppercase tracking-[0.15em] text-espresso/60 block mb-3">
                Loan Amount: {formatCurrency(loanAmount)}
              </label>
              <input
                type="range"
                min={1000000}
                max={50000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-[0.15em] text-espresso/60 block mb-3">
                Interest Rate: {interestRate}%
              </label>
              <input
                type="range"
                min={5}
                max={15}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-[0.15em] text-espresso/60 block mb-3">
                Tenure: {tenure} years
              </label>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>
          </div>

          <div className="bg-ivory p-8 border border-espresso/10">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-4">Monthly EMI</p>
            <p className="font-display text-4xl md:text-5xl text-espresso mb-8">
              {formatCurrency(Math.round(emi))}
            </p>

            <div className="space-y-4 border-t border-espresso/10 pt-6">
              <div className="flex justify-between">
                <span className="font-body text-sm text-espresso/60">Principal</span>
                <span className="font-body text-sm font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-espresso/60">Total Interest</span>
                <span className="font-body text-sm font-medium text-terracotta">
                  {formatCurrency(Math.round(totalInterest))}
                </span>
              </div>
              <div className="flex justify-between border-t border-espresso/10 pt-4">
                <span className="font-body text-sm font-medium">Total Payment</span>
                <span className="font-body text-sm font-semibold">{formatCurrency(Math.round(totalPayment))}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}