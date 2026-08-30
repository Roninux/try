import Navbar from "@/app/main/components/Navbar";
import Footer from "@/app/main/components/Footer";

// MainLayout wraps every page inside /main with a shared Navbar and Footer.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
