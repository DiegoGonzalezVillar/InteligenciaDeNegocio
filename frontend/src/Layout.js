const Layout = ({ children }) => {
  return (
    <div
      style={{ paddingTop: "75px", paddingBottom: "75px", minHeight: "100vh" }}
    >
      {children}
    </div>
  );
};

export default Layout;
