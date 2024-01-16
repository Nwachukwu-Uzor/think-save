import { MainHeader } from "@/components/main/main-header";
import { Container } from "@/components/shared/container";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-[100vh]">
      <header className="bg-white">
        <Container>
          <MainHeader />
        </Container>
      </header>
      <section className="bg-input-bg flex-1 py-4 lg:py-6">{children}</section>
    </main>
  );
};

export default DashboardLayout;
