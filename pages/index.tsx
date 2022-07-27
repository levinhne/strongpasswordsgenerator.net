import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-12 col-lg-6 mb-3">
          <div className="input-group input-group-inline">
            <input type="email" className="form-control form-control-lg" placeholder="username" value="4Degwdh5Edr@hu" />
            <span className="input-group-text">
              <i className="bi bi-clipboard"></i>
            </span>
          </div>
          <span className="mt-2 valid-feedback">Looks good!</span>
          <input type="range" className="form-range" id="customRange1"></input>
        </div>
        
      </div>
    </div>
  )
}

export default Home
