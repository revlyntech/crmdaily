import CRMMatcher from "@/components/tools/CRMMatcher";

export const metadata = {
  title: "CRM Matcher: Find the Right CRM for Your Team",
  description: "Free CRM matcher tool. Filter popular CRMs by category, budget and team size to build a shortlist, then see pricing, strengths and who each one fits best.",
};

export default function Page() {
  return <CRMMatcher />;
}
