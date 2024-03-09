import { AutoLogoutProvider } from "@/components/Layout/auto-logout-provider";
import { MainHeader } from "@/components/main/";
import { Container } from "@/components/shared/";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AutoLogoutProvider requireSession={true}>
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
    </AutoLogoutProvider>
  );
};

export default DashboardLayout;
