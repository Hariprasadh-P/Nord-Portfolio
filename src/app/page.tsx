import PortfolioClient from "@/components/portfolio/PortfolioClient";
import { initialPortfolioData } from "@/data/portfolioData";

export const dynamic = "force-static";

export default function HomePage() {
  return <PortfolioClient data={initialPortfolioData} />;
}
