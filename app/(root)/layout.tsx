import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex flex-col h-screen mx-20 ">
        <Header/>
        <main className="flex">
          <Sidebar/>
          <div className="mx-10 w-full">
            {children}
          </div>
        </main>
      </div>
    );
  }