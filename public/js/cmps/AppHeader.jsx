const { Link, Route } = ReactRouterDOM;
import { BugModal } from "./BugModal.jsx";
import { userService } from "../services/user.service.js";
import {LoginSignup} from "./LoginSignup.jsx";
export class AppHeader extends React.Component {
  state = {
    isShown: null,
  };
  componentDidMount() {
    const currentUser = userService.getLoggedinUser();
    console.log(currentUser)
    if (currentUser) this.setState({ isShown:!this.state.isShown });
  }

  toggleIsShown = () => {
    console.log('papapapapappapap')
    this.setState({ isShown: !this.state.isShown });
  };
  render() {
    return (
      <nav>
        <div className="nav-header">
          <div className="login">
          <Route
              component={() => (
                <LoginSignup onLogin={this.props.onLogin} onSubmit={this.props.onSubmit} toggleIsShown={this.toggleIsShown} />
              )}
              path="/api/login"
            />
            {!this.state.isShown ? (
              
              <Link
                className="btn btn-login decoration-none"
                to={'/api/login'}
              >
                Log Me In
              </Link>
            ) : (
              <button
                className="btn btn-logout"
                onClick={() => {
                  this.toggleIsShown();
                   this.props.onLogout();
                 
                }}
              >
                Logout
              </button>
            )}
          </div>
          <div className="content-container">
            <div className="nav-logo">
              <img src="../../style/imgs/logoBug.png" />
            </div>
            <Route
              component={() => (
                <BugModal
                  bugs={this.props.bugs}
                  onSaveBug={this.props.onSaveBug}
                />
              )}
              path="/api/bug"
            />
            <div className="nav-add-bug">
              <Link
                className="btn compose-bug decoration-none"
                value="Submit Bug"
                to={`/api/bug`}
              >
                Submit Bug
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
