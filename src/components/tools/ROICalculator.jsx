"use client";
import { useState } from "react";
import "./tools.css";

export default function ROICalculator() {
  const [avgSaleValue, setAvgSaleValue] = useState(2000);
  const [monthlyLeads, setMonthlyLeads] = useState(50);
  const [closeRate, setCloseRate] = useState(15);
  const [dealsFallingThrough, setDealsFallingThrough] = useState(10);
  const [hoursPerWeekManual, setHoursPerWeekManual] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [conversionImprovement, setConversionImprovement] = useState(15);
  const [implementationCost, setImplementationCost] = useState(500);
  const [crmMonthlyCost, setCrmMonthlyCost] = useState(50);

  // Deals you close today
  const dealsClosedNow = monthlyLeads * (closeRate / 100);

  // Deals lost purely to disorganization (missed follow-ups, dropped leads)
  const dealsLostToChaos = dealsClosedNow * (dealsFallingThrough / 100);
  const revenueLostToChaos = dealsLostToChaos * avgSaleValue;

  // Time cost of manual admin work
  const monthlyHoursWasted = hoursPerWeekManual * 4.33;
  const timeWastedCost = monthlyHoursWasted * hourlyRate;

  // Extra deals a CRM's improved conversion could realistically add
  const extraDealsFromCRM = dealsClosedNow * (conversionImprovement / 100);
  const extraRevenueFromCRM = extraDealsFromCRM * avgSaleValue;

  const totalMonthlyOpportunityCost = revenueLostToChaos + timeWastedCost;
  const totalMonthlyUpside = extraRevenueFromCRM + timeWastedCost;

  const monthlyCRMTotal = crmMonthlyCost;
  const salesNeededToCoverCRM = monthlyCRMTotal / (avgSaleValue || 1);
  const annualCRMCost = monthlyCRMTotal * 12 + implementationCost;
  const annualUpside = totalMonthlyUpside * 12;
  const netAnnualImpact = annualUpside - annualCRMCost;

  const fmt = (n) => Math.round(n).toLocaleString();

  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">ROI Calculator</h1>
        <p className="cd-subtitle">
          What is staying disorganized actually costing you each month - and would a CRM pay for itself?
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <p className="cd-label" style={{ marginTop: 0 }}>SALES METRICS</p>
        <div className="cd-grid" style={{ marginBottom: "1.5rem" }}>
          <div className="cd-field">
            <label className="cd-label">AVERAGE SALE VALUE ($)</label>
            <input type="number" className="cd-input" value={avgSaleValue} min={0}
              onChange={(e) => setAvgSaleValue(Number(e.target.value) || 0)} />
          </div>
          <div className="cd-field">
            <label className="cd-label">MONTHLY LEADS</label>
            <input type="number" className="cd-input" value={monthlyLeads} min={0}
              onChange={(e) => setMonthlyLeads(Number(e.target.value) || 0)} />
          </div>
          <div className="cd-field">
            <label className="cd-label">CURRENT CLOSE RATE (%)</label>
            <input type="number" className="cd-input" value={closeRate} min={0} max={100}
              onChange={(e) => setCloseRate(Number(e.target.value) || 0)} />
          </div>
          <div className="cd-field">
            <label className="cd-label">DEALS FALLING THROUGH THE CRACKS (%)</label>
            <input type="number" className="cd-input" value={dealsFallingThrough} min={0} max={100}
              onChange={(e) => setDealsFallingThrough(Number(e.target.value) || 0)} />
          </div>
        </div>

        <p className="cd-label">OPERATIONS & COST</p>
        <div className="cd-grid" style={{ marginBottom: "1.5rem" }}>
          <div className="cd-field">
            <label className="cd-label">HOURS/WEEK ON MANUAL ADMIN</label>
            <input type="number" className="cd-input" value={hoursPerWeekManual} min={0}
              onChange={(e) => setHoursPerWeekManual(Number(e.target.value) || 0)} />
          </div>
          <div className="cd-field">
            <label className="cd-label">YOUR HOURLY RATE ($)</label>
            <input type="number" className="cd-input" value={hourlyRate} min={0}
              onChange={(e) => setHourlyRate(Number(e.target.value) || 0)} />
          </div>
          <div className="cd-field">
            <label className="cd-label">EXPECTED CONVERSION IMPROVEMENT WITH A CRM (%)</label>
            <input type="number" className="cd-input" value={conversionImprovement} min={0} max={100}
              onChange={(e) => setConversionImprovement(Number(e.target.value) || 0)} />
          </div>
        </div>

        <p className="cd-label">CRM INVESTMENT</p>
        <div className="cd-grid" style={{ marginBottom: "2.5rem" }}>
          <div className="cd-field">
            <label className="cd-label">IMPLEMENTATION COST (ONE-TIME, $)</label>
            <input type="number" className="cd-input" value={implementationCost} min={0}
              onChange={(e) => setImplementationCost(Number(e.target.value) || 0)} />
          </div>
          <div className="cd-field">
            <label className="cd-label">CRM MONTHLY COST ($)</label>
            <input type="number" className="cd-input" value={crmMonthlyCost} min={0}
              onChange={(e) => setCrmMonthlyCost(Number(e.target.value) || 0)} />
          </div>
        </div>

        <p className="cd-label">COST OF YOUR CURRENT CHAOS, PER MONTH</p>
        <div className="cd-grid" style={{ marginBottom: "2rem" }}>
          <div className="cd-card">
            <p className="cd-label">DEALS LOST TO DISORGANIZATION</p>
            <p className="cd-big-number">{dealsLostToChaos.toFixed(1)}<span style={{ fontSize: "1rem", color: "#8A8680" }}>/mo</span></p>
          </div>
          <div className="cd-card">
            <p className="cd-label">REVENUE FROM LOST DEALS</p>
            <p className="cd-big-number">${fmt(revenueLostToChaos)}<span style={{ fontSize: "1rem", color: "#8A8680" }}>/mo</span></p>
          </div>
          <div className="cd-card">
            <p className="cd-label">TIME WASTED, IN DOLLARS</p>
            <p className="cd-big-number">${fmt(timeWastedCost)}<span style={{ fontSize: "1rem", color: "#8A8680" }}>/mo</span></p>
          </div>
          <div className="cd-card">
            <p className="cd-label">TOTAL MONTHLY OPPORTUNITY COST</p>
            <p className="cd-big-number">${fmt(totalMonthlyOpportunityCost)}<span style={{ fontSize: "1rem", color: "#8A8680" }}>/mo</span></p>
          </div>
        </div>

        <p className="cd-label">THE REALITY CHECK</p>
        <div className="cd-card" style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: "#0F172A", margin: "0 0 12px" }}>
            {salesNeededToCoverCRM > 0 ? salesNeededToCoverCRM.toFixed(2) : "0"} sale{salesNeededToCoverCRM === 1 ? "" : "s"}
            <span style={{ fontSize: "1rem", color: "#6B6862", fontFamily: "'Inter', sans-serif" }}> needed per month to cover the CRM's cost</span>
          </p>
          <p style={{ color: "#3D3A36", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            At ${fmt(monthlyCRMTotal)}/month, this CRM costs roughly what {salesNeededToCoverCRM < 1 ? "a fraction of one" : salesNeededToCoverCRM.toFixed(1)} average sale brings in.
            Compared against ${fmt(totalMonthlyOpportunityCost)}/month you're already losing to missed follow-ups and manual admin time, the math tends to favor fixing the process sooner rather than later.
          </p>
        </div>

        <p className="cd-label">ONE-YEAR PROJECTION</p>
        <div className="cd-grid" style={{ marginBottom: "2rem" }}>
          <div className="cd-card">
            <p className="cd-label">ANNUAL CRM COST (INCL. SETUP)</p>
            <p className="cd-big-number">${fmt(annualCRMCost)}</p>
          </div>
          <div className="cd-card">
            <p className="cd-label">ANNUAL UPSIDE (RECOVERED TIME + DEALS)</p>
            <p className="cd-big-number">${fmt(annualUpside)}</p>
          </div>
          <div className="cd-card">
            <p className="cd-label">NET ANNUAL IMPACT</p>
            <p className="cd-big-number" style={{ color: netAnnualImpact >= 0 ? "#1E8E5A" : "#B5720C" }}>
              {netAnnualImpact >= 0 ? "+" : "-"}${fmt(Math.abs(netAnnualImpact))}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a href="/tools/stack-recommender" className="cd-btn">Find a CRM that fits</a>
          <a href="/tools/directory" className="cd-btn cd-btn-secondary">Browse the directory</a>
        </div>

        <p style={{ color: "#8A8680", fontSize: "0.8rem", marginTop: "2rem" }}>
          This is a directional estimate based on the numbers you enter, not a guarantee - actual results depend on how well any CRM gets adopted and used by your team.
        </p>
      </div>
    </div>
    </>
  );
}
