import Image from "next/image";
import styles from "./page.module.css";
import LandingPage from "@/components/LandingPage";
import { UserLayout } from "@/components/UserLayout";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <UserLayout>
        <LandingPage />
      </UserLayout>
      <Footer />
    </main>
  );
}
