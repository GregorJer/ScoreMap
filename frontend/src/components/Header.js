import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
    const { user } = useContext(UserContext);

    return (
        <header>
            <nav>
                <div className="navbar">
                    <h1 className="page-title">{props.title}</h1>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/map'>Animation</Link></li>

                        {user ?
                            <>
                                <li><Link to='/profile'>Profile</Link></li>
                                <li className="dropdown">
                                    <Link to="#" className="dropdown-toggle">Sports</Link>
                                    <div className="dropdown-menu">
                                        <Link to="/volleyball/teams" className="dropdown-item">Volleyball</Link>
                                        <Link to="/handball/teams" className="dropdown-item">Handball</Link>
                                        <Link to="/football/teams" className="dropdown-item">Football</Link>
                                    </div>
                                </li>

                                {user.admin && <li><Link to='/admin'>Admin</Link></li>}

                                <li><Link to='/logout'>Logout</Link></li>
                            </>
                            :
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </header >
    );
}

export default Header;
