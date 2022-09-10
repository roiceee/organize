import NavigationBar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: JSX.Element;
}
function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex flex-column justify-content-between gap-1 bg-light"
      >
        <div>
          <NavigationBar />
          <div>
          {children}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
