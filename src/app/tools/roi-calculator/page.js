import ROICalculator from "@/components/tools/ROICalculator";

export const metadata = {
  title: "CRM ROI Calculator: Cost of Skipping a CRM",
  description: "Enter your sales numbers to estimate what running without a CRM costs you each month, plus a one-year projection of what you could recover.",
};

export default function Page() {
  return <ROICalculator />;
}
