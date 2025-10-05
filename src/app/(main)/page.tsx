import AlertsPage from "@/components/Alerts";
import FeaturePage from "@/components/Feature";
import FooterPage from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <FeaturePage />
      <AlertsPage />
      <FooterPage />
    </div>
  );
}
