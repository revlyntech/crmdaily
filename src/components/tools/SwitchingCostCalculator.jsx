"use client";
import { useState } from "react";
import "./tools.css";

export default function SwitchingCostCalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(40);
  const [hoursLostPerWeek, setHoursLostPerWeek] = useState(3);
  const [migrationWeeks, setMigrationWeeks] = useState(4);

  const weeklyDisorganizationCost = teamSize * hourlyCost * hoursLostPerWeek;
  const annualDisorganizationCost = weeklyDisorganizationCost * 52;
  const oneTimeMigrationCost = teamSize * hourlyCost * (migrationWeeks * 2); // rough: 2hrs/week/person during migration
  const breakEvenWeeks = oneTimeMigrationCost / weeklyDisorganizationCost;

  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">Switching cost calculator</h1>
        <p className="cd-subtitle">
          A rough, honest estimate of what disorganization is costing you now versus what a migration would cost upfront.
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <div className="cd-grid" style={{ marginBottom: "2rem" }}>
          <div className="cd-field">
            <label className="cd-label">TEAM SIZE (people using the CRM)</label>
            <input
              type="number"
              className="cd-input"
              value={teamSize}
              min={1}
              onChange={(e) => setTeamSize(Number(e.target.value) || 0)}
            />
          </div>
          <div className="cd-field">
            <label className="cd-label">AVERAGE FULLY-LOADED HOURLY COST ($)</label>
            <input
              type="number"
              className="cd-input"
              value={hourlyCost}
              min={0}
              onChange={(e) => setHourlyCost(Number(e.target.value) || 0)}
            />
          </div>
          <div className="cd-field">
            <label className="cd-label">HOURS LOST PER PERSON, PER WEEK, TO BAD DATA/PROCESS</label>
            <input
              type="number"
              className="cd-input"
              value={hoursLostPerWeek}
              min={0}
              onChange={(e) => setHoursLostPerWeek(Number(e.target.value) || 0)}
            />
          </div>
          <div className="cd-field">
            <label className="cd-label">EXPECTED MIGRATION LENGTH (WEEKS)</label>
            <input
              type="number"
              className="cd-input"
              value={migrationWeeks}
              min={1}
              onChange={(e) => setMigrationWeeks(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="cd-grid">
          <div className="cd-card">
            <p className="cd-label">COST OF STAYING AS-IS, PER YEAR</p>
            <p className="cd-big-number">
              ${annualDisorganizationCost.toLocaleString()}
            </p>
            <p style={{ color: "#8A8680", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Based on time your team loses weekly to workarounds, missed follow-ups, and manual tracking.
            </p>
          </div>
          <div className="cd-card">
            <p className="cd-label">ESTIMATED ONE-TIME MIGRATION COST</p>
            <p className="cd-big-number">
              ${oneTimeMigrationCost.toLocaleString()}
            </p>
            <p style={{ color: "#8A8680", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Rough estimate at ~2 hours/person/week of migration effort, on top of normal work.
            </p>
          </div>
          <div className="cd-card">
            <p className="cd-label">BREAK-EVEN POINT</p>
            <p className="cd-big-number">
              {isFinite(breakEvenWeeks) ? breakEvenWeeks.toFixed(1) : "-"} wks
            </p>
            <p style={{ color: "#8A8680", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              How long until the migration pays for itself versus staying put.
            </p>
          </div>
        </div>

        <p style={{ color: "#8A8680", fontSize: "0.8rem", marginTop: "2rem" }}>
          This is a directional estimate, not a formal ROI model - actual migration costs vary widely by data volume, integration count, and how much cleanup your existing data needs.
        </p>
      </div>
    </div>
    </>
  );
}
