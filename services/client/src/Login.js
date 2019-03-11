import React from 'react';
import { Link } from 'react-router-dom';

export default function Login(props) {
  console.log(props.createnew)
  return (
    <div className="spinach" >
      <div className="container">
        <div className="row">
          <div className="col-xs">
            <div className="box" >
              <h1 className="huge pumpkin-text glitch">
                {(props.createnew)
                  ? "CREATE NEW"
                  : "Login"
                }
              </h1>
            </div>
          </div>
          <div className="col-xs">
            <div className="box" >
              <form className="form">
                <div className="form-group">
                  <label className="bigger bubble-gum-text throb">email: </label>
                  <input type="email" />
                </div>
                <div className="form-group">
                  <label className="bigger bubble-gum-text throb">password: </label>
                  <input type="password" />
                </div>
                <div className="form-group">
                  <label className="bigger bubble-gum-text throb">prepare for share </label>
                  <button className="medium-btn button throb black yellow-text">
                    { (props.createnew)
                      ? "RISE!!! nEw UsEr!!!"
                      : "submit"
                      }
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xs">
            <div className="box" >
              <h1 className="rotate-right-45 huge carrot-text">Please</h1>
            </div>
          </div>
        </div>
      {
        (!props.createnew) &&
      <div className="container">
        <Link className="text-right smaller bubble-gum-text" to="/create-new/">
           Or you can create a new <span className="glitch">account</span>
       </Link>
      </div>
    }
      </div>
    </div>
  )
}
