import React from 'react'
import { NavLink } from 'react-router-dom';
import { navData } from '../../helpers/data/navData';

const NavHeader = () => {
  return (
    <header className="py-3 mb-0 border-bottom">
      <div className="container-fluid d-flex align-items-center">
        <div className="col-4 dropdown">
          <a
            href="#"
            className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
                ANJ
          </a>
          <ul className="dropdown-menu text-small shadow">
          {navData.map((item)=>{
            return(
                <li key={item.id}>
                    <NavLink to={item.route} className="dropdown-item">
                        {item.text}
                    </NavLink>
                </li>
            )})}
            {/* <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Reports
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Analytics
              </a>
            </li> */}
          </ul>
        </div>

        <div className="col-8 d-flex align-items-center">
          <form className="w-100 me-3" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="flex-shrink-0 dropdown">
            <a
              href="#"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li>
                <a className="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavHeader