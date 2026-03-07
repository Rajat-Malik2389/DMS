import Footer from "./Footer";
import Navbar from "./Navbar";

function PageShell({ basePath = "/", children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(171,63,45,0.18),transparent_28%),radial-gradient(circle_at_right_center,rgba(204,160,87,0.24),transparent_24%),linear-gradient(180deg,#f8f0e4_0%,#efe1cf_100%)] px-4 py-6 text-stone-900 md:px-6">
      <Navbar basePath={basePath} />
      <main className="mx-auto flex max-w-7xl flex-col gap-7">{children}</main>
      <Footer />
    </div>
  );
}

export default PageShell;
