import About from '../../views/About';

export const revalidate = 3600;

export const metadata = {
  title: 'About CRM Daily | CRM & GTM Intelligence',
  description: 'CRM Daily is your daily source of CRM, GTM and RevOps intelligence. No vendor bias. No commissions. Just expert reporting.',
};

export default function AboutPage() {
  return <About />;
}
