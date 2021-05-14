const Router = ReactRouterDOM.HashRouter;
import { bugService } from "../services/bug.service.js";
import { BugsList } from "../cmps/BugsList.jsx";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { userService } from "../services/user.service.js";

export class BugApp extends React.Component {
  state = { bugs: [], user: null };

  loadBugs = () => {
    bugService.query().then((bugs) => {
      console.log("bugs from server:", bugs);
      this.setState({ bugs });
    });
  };
  onLogIn = (credentials, isShown, closeModal) => {
    userService
      .login(credentials)
      .then((user) => {
        this.setState({ user }, () => {
          isShown();
          closeModal();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onSignUp = (credentials, isShown, closeModal) => {
    userService.signup(credentials)
      .then((user) => {
        this.setState({ user },()=>{
          isShown();
          closeModal();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onLogout = () => {
    userService.logout().then(() => {
      this.setState({ user: null });
    });
  };
  onSubmitUser = (credentials, isSignup, isShown, closeModal) => {
    console.log("credentials", credentials);
    const { fullname, ...rest } = credentials;
    if (isSignup) this.onSignUp(credentials, isShown, closeModal);
    else this.onLogIn(rest, isShown, closeModal);
  };
  onSaveBug = ({ title, description, severity, createdAt, _id }) => {
    const bug = { title, description, severity, createdAt, _id };
    console.log("userService.getLoggedinUser()");
    bug.creator = {
      fullname: userService.getLoggedinUser().fullname,
      _id: userService.getLoggedinUser()._id,
    };
    console.log("bug from front end", bug);
    bugService.save(bug).then(() => {
      this.loadBugs();
    });
  };
  onRemoveBug = (bugId) => {
    bugService.remove(bugId).then(() => {
      console.log("Deleted Succesfully!");
      let { bugs } = this.state;
      bugs = bugs.filter((bug) => bug._id !== bugId);
      this.setState({ bugs });
    });
  };
  isOwner(bug) {
    const user = userService.getLoggedinUser();
    return user && bug.creator._id === user._id;
  }
  componentDidMount() {
    const user = userService.getLoggedinUser();
    if (user) this.setState({ user });
    console.log("user", user);
    this.loadBugs();
  }
  render() {
    const { bugs } = this.state;
    if (!bugs.length) return <div>Nothing To show right here</div>;
    return (
     
        <section>
          <AppHeader
            bugs={bugs}
            onSubmit={this.onSubmitUser}
            onSaveBug={this.onSaveBug}
            onLogout={this.onLogout}
            onLogin={this.onLogin}
          />
          <BugsList
            bugs={bugs}
            onRemoveBug={this.onRemoveBug}
            onSaveBug={this.onSaveBug}
            isOwner={this.isOwner}
            loadBugs={this.loadBugs}
          />
        </section>

    );
  }
}
