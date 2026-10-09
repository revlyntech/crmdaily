import StackRecommender from "@/components/tools/StackRecommender";

export const metadata = {
  title: "CRM Stack Recommender: Answer 3 Questions",
  description: "Answer three questions about your team and sales motion and get one clear CRM recommendation, with the reasoning behind it.",
};

export default function Page() {
  return <StackRecommender />;
}
