<<<<<<< HEAD
import Navbar from "@/app/main/components/Navbar";
import Footer from "@/app/main/components/Footer";

// MainLayout wraps every page inside /main with a shared Navbar and Footer.
=======
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

>>>>>>> 0f15419 ( hub v2)
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
=======
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
>>>>>>> 0f15419 ( hub v2)
  );
}
