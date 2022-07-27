import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-md-center py-10">
        <div className="mb-4 text-light text-center">
          <h1>Strong Random Passwords Generator</h1>
        </div>
        <div className="col-12 col-lg-5 mb-3">
          <div className="input-group input-group-inline">
            <input type="email" className="form-control form-control-lg" value="4Degwdh5Edr@hu" />
            <span className="input-group-text">
              <i className="bi bi-clipboard"></i>
            </span>
          </div>
          <span className="mt-2 valid-feedback">Looks good!</span>
          <div className="mt-3">
            <label className="form-label text-base">Password length</label>
            <input type="range" className="form-range" />
          </div>
          <div className="d-flex mt-1">
            <div className="">
              <h5 className="mb-1">Share to web</h5>
              <small className="d-block text-xs text-muted">Publish and share link with anyone</small>
            </div>
            <div className="ms-auto">
              <div className="form-check form-switch me-n2">
                <input className="form-check-input h-5 w-10 mt-3" type="checkbox" />
                <label className="form-check-label"></label>
              </div>
            </div>
          </div>
          <div className="d-flex mt-3">
            <div className="">
              <h5 className="mb-1">Share to web</h5>
              <small className="d-block text-xs text-muted">Publish and share link with anyone</small>
            </div>
            <div className="ms-auto">
              <div className="form-check form-switch me-n2">
                <input className="form-check-input h-5 w-10 mt-3" type="checkbox" />
                <label className="form-check-label"></label>
              </div>
            </div>
          </div>
          <div className="d-flex mt-3">
            <div className="">
              <h5 className="mb-1">Share to web</h5>
              <small className="d-block text-xs text-muted">Publish and share link with anyone</small>
            </div>
            <div className="ms-auto">
              <div className="form-check form-switch me-n2">
                <input className="form-check-input h-5 w-10 mt-3" type="checkbox" />
                <label className="form-check-label"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
