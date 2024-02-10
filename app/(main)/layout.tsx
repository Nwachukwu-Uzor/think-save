import { MainHeader } from "@/components/main/";
import { Container } from "@/components/shared/";
import { getServerSession } from "next-auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <main className="flex flex-col min-h-[100vh]">
      <header className="bg-white">
        <Container>
          <MainHeader />
        </Container>
      </header>
      <section className="bg-accent-blue flex-1 py-4 lg:py-6">
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
