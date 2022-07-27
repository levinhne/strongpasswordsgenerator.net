type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light px-0 py-3">
      <div className="container-xl max-w-screen-xl">
        <a className="navbar-brand" href="#">
          <img src="https://preview.webpixels.io/web/img/logos/clever-primary.svg" className="h-10" alt="..."/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-lg-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <div className="navbar-nav ms-lg-4">
            <a className="nav-item nav-link" href="#">Sign in</a>
          </div>
          <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
            <a href="#" className="btn btn-sm btn-neutral w-full w-lg-auto">
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
    {children}
    </>
  );
};

export default DefaultLayout;
