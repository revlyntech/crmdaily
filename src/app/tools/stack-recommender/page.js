import StackRecommender from "@/components/tools/StackRecommender";

export const metadata = {
  title: "Stack Recommender",
  description: "Three quick questions, one CRM recommendation based on your team and priorities.",
};

export default function Page() {
  return <StackRecommender />;
}
