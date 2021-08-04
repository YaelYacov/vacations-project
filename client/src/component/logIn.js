const LogIn = ({ onSubmitFn, onChangeFn }) => {
  return (
    <div className="row  pt-5">
      <div className="relativePos col-xl-12  p-5 ">
        <div className="row">
          <h1 className="">Log In</h1>
        </div>
        <div className=" text-center mx-auto w-25 ">
          <div className="card-body">
            <label htmlFor="mail">Mail:</label>
            <div placeholder="example@gmail.com" className="input-group">
              <input type="text" id="mail" className="form-control hoverBorder" onChange={(e) => onChangeFn(e)}></input>
            </div>
            <label htmlFor="password" className="mt-3">
              Password:
            </label>
            <div className="input-group">
              <input type="text" id="password" className="form-control hoverBorder" onChange={(e) => onChangeFn(e)}></input>
            </div>

            <button className="btn btn-dark m-3 hoverBorder" onClick={() => onSubmitFn()}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
