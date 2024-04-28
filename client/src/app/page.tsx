import Image from "next/image";
import styles from "./page.module.css";
import LandingPage from "@/components/LandingPage";
import AdminLayout from "@/components/AdminLayout";

export default function Home() {
  return (
    <main>
      <AdminLayout>
    
      <LandingPage/>

      </AdminLayout>
    </main>
  );
}
