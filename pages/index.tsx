import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="container py-10">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Strong Random Password Generator</h1>
        </div>
      </div>
      <div className="row mt-10 mb-3">
        <div className="col-12 col-xxl-5 col-xl-6 col-lg-7 col-md-10 col-sm-12 mx-auto ">
          <input type="range" className="form-range" min="0" max="100"></input>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-xxl-6 col-xl-7 col-lg-8 col-md-12 col-sm-12 mx-auto ">
          <div className="mt-10">
            <div className="input-group input-group-inline">
              <input
                type="email"
                className="form-control form-control-lg text-lg"
                value="4Degwdh5Edr@hu"
              />
              <span className="input-group-text">
                <i className="bi bi-arrow-clockwise text-xl"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-5 h-5"
                type="checkbox"
                value=""
              />
              <label className="form-check-label ms-2 mt-1">
                Start with alphabet
              </label>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-5 h-5"
                type="checkbox"
                value=""
              />
              <label className="form-check-label ms-2 mt-1">Mixed Case</label>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-5 h-5"
                type="checkbox"
                value=""
              />
              <label className="form-check-label ms-2 mt-1">
                Special Character
              </label>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-5 h-5"
                type="checkbox"
                value=""
              />
              <label className="form-check-label ms-2 mt-1">Numbers</label>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <button type="button" className="btn btn-primary">
            Copy Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
