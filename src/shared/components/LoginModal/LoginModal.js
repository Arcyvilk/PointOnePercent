import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { showLoginModal, logInUser } from '../../store/modules/Login'
import { sha256 } from '../../helpers/hash'

const loginModalVisible = show => show ? "login-modal-wrapper display-flex" : "login-modal-wrapper display-none"

class LoginModal extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            privilege: null,
            repeatedPassword: null,
            registration: false
        }
    }

    handleUsernameChange = event => this.setState({ username: event.target.value })
    handlePasswordChange = event => this.setState({ password: sha256(event.target.value) })
    handleRepeatedPasswordChange = event => this.setState({ repeatedPassword: sha256(event.target.value) })

    showLogin = () => this.props.dispatch(showLoginModal())
    showRegistration = () => this.setState({ registration: !this.state.registration })

    logInOrRegister = () => {
        this.state.registration
            ? this.register()
            : this.logIn()
    }
    logIn = () => {
        if (this.props.users.hasOwnProperty(this.state.username) && this.props.users[this.state.username].password === this.state.password) {
            this.showLogin()
            return this.props.dispatch(logInUser(this.state.username, this.props.users[this.state.username].privilege, this.props.users[this.state.username].banned))
        }
        alert(`Incorrect password or username.`)
    }
    register = () => {
        if (this.state.password !== this.state.repeatedPassword)
            return alert("Passwords differ.")
        this.props.users[this.state.username] = {
            password: this.state.password,
            privilege: 'user',
            banned: false,
            avatar: null,
            description: null
        }
        axios.get(`/rest/user/create/${this.state.username}/${this.state.password}`)
            .then(response => {
                if (response.status === 200)
                    return alert('Registered!')
                alert(response.data)
          })
          .catch(err => console.log(err.message))
    }

    render() {
        const { props } = this;
        return (
            <div className={ loginModalVisible(props.showLoginModal) }>
                <div className="login-modal">
                    <div className="login-modal-form">
                        <input 
                            className="login-modal-input" 
                            placeholder="Username"
                            onChange={ this.handleUsernameChange }
                            ></input>
                        <input 
                            className="login-modal-input" 
                            placeholder="Email"
                            hidden="true"
                            ></input>
                        <input 
                            className="login-modal-input" 
                            placeholder="Password" 
                            type="password"
                            onChange={ this.handlePasswordChange }
                            ></input>
                        <input 
                            className="login-modal-input" 
                            placeholder="Repeat password" 
                            type="password"
                            onChange={ this.handleRepeatedPasswordChange }
                            hidden={ !this.state.registration }
                            ></input>
                        <button className="custom-button login-modal-button" onClick={ () => this.logInOrRegister() }>
                            {
                                !this.state.registration
                                    ? "Log in"
                                    : "Register"
                            }
                        </button>
                        <div onClick={ () => this.showRegistration() }>
                            {
                                this.state.registration
                                    ? "Log in"
                                    : "Register"
                            }
                        </div>
                    </div>
                    <button className="custom-button" onClick={ () => this.showLogin() }>Close</button>
                </div>
            </div>
        )
    }    
}

const mapStateToProps = state => ({ 
    showLoginModal: state.showLoginModal,
    users: state.users
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( LoginModal )