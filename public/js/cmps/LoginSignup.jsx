const { withRouter } = ReactRouterDOM

class _LoginSignup extends React.Component {
    state = {
        isSignUp: false,
        credentials: {
            fullname: '',
            username: '',
            password: ''
        }
    }

    onChangeForm = () => {
        this.setState({ isSignUp: !this.state.isSignUp })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({
            credentials: {
                ...prevState.credentials,
                [field]: value
            }
        }))
    }
    closeModal = () => {
        this.props.history.push(`/`);
      };
      onOutSideClick = (ev) => {
        if (ev.target.classList.contains("modal-container")) {
          this.props.history.push(`/`);
          // node.classList.add("animate__animated animate__fadeOut")
        }
      };
    onSubmit = (ev) => {
        console.log('fuckkkkkkkkkk')
        ev.preventDefault()
        this.props.onSubmit(this.state.credentials, this.state.isSignUp,this.props.toggleIsShown,this.closeModal)
    }

    render() {
        const { username, password, fullname } = this.state.credentials
        const { isSignUp } = this.state
        return (
            <React.Fragment>
                 <div
        onClick={this.onOutSideClick}
        ref={this.myRef}
        className={`modal-container`}
      >
        <div className="modal note-modal">
          <span onClick={this.closeModal} className="close-modal">
            x
          </span>
          <div className="login-screen"></div>
                <section className="login-user">
                    <p>click to <a className="change-form" onClick={this.onChangeForm}>{isSignUp ? 'login' : 'signup'}</a></p>
                    <form className="signin-login-form" onSubmit={this.onSubmit}>
                        {isSignUp && <React.Fragment>
                            <label htmlFor="fullname">Full name</label>
                            <input type="text" name='fullname' id='fullname' value={fullname} onChange={this.handleChange} />
                        </React.Fragment>}
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={username} onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                        <button type="submit">Let me in!</button>
                    </form>
                </section>

          </div>
         </div>
                
            </React.Fragment>
        )
    }
}

export const LoginSignup = withRouter(_LoginSignup)