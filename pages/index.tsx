import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="container py-10">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Strong Random Passwords Generator</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-xxl-6 col-xl-7 col-lg-8 col-md-12 col-sm-12 mx-auto mb-3">
          <div className="px-5 mt-10">
            <h4 className="text-center text-base mt-5">Password length: 30</h4>
            <div className="mt-5">
              <input type="range" className="form-range" />
            </div>
          </div>
          <div className="mt-10">
            <div className="input-group input-group-inline">
              <input
                type="email"
                className="form-control form-control-lg"
                value="4Degwdh5Edr@hu"
              />
              <span className="input-group-text">
                <i className="bi bi-clipboard"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center mt-2">
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-4 h-4"
                type="checkbox"
                value=""
              />
              <label className="form-check-label mt-1">
                Start with alphabet
              </label>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-4 h-4"
                type="checkbox"
                value=""
              />
              <label className="form-check-label mt-1">Mixed Case</label>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-4 h-4"
                type="checkbox"
                value=""
              />
              <label className="form-check-label mt-1">Special Character</label>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input w-4 h-4"
                type="checkbox"
                value=""
              />
              <label className="form-check-label mt-1">Numbers</label>
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
