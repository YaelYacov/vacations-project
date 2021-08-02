const LogIn = ({ onSubmitFn, onChangeFn }) => {
  return (
    <div className="row pasPage pt-5">
      <div className="col-12 p-5 ">
        <div className="row">
          <h1>Log In</h1>
        </div>
        <div className="card text-center mx-auto w-25 bgPasPage">
          <div className="card-body">
            <label htmlFor="mail">Mail:</label>
            <div className="input-group">
              <input type="text" id="mail" className="form-control" onChange={(e) => onChangeFn(e)}></input>
            </div>
            <label htmlFor="password" className="mt-3">
              Password:
            </label>
            <div className="input-group">
              <input type="text" id="password" className="form-control" onChange={(e) => onChangeFn(e)}></input>
            </div>

            <button className="btn btn-primary m-3" onClick={() => onSubmitFn()}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
