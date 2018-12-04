import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { changeProfile, banPerson } from '../../../shared/store/modules/Login'
import { cacheBlog, cacheUsers } from '../../../shared/store/modules/Cache'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: props.users[props.username].avatar,
            description: props.users[props.username].description,
            unknownAvatar: 'https://i.pinimg.com/originals/02/4f/01/024f01aff419ee3b22ece9c63ac08c70.jpg',
            unknownDescription: 'This user didn\'t write anything about themselves yet!',

            blogtitle: null,
            blogcontent: null
        }
    }
    loadUsers = () => {
        axios.get('/rest/users')  
            .then(response => {
                if (response.status === 200)
                  return this.props.dispatch(cacheUsers(response.data))
            }).catch(err => console.trace(err))
    }
    loadBlog = () => {
        axios.get('/rest/blog')  
            .then(response => {
                if (response.status === 200)
                  return this.props.dispatch(cacheBlog(response.data))
            }).catch(err => console.trace(err))
      }
    submitNewData = () => {
        axios.post(`/rest/user/profilechange/${this.props.username}`, {
            avatar: this.state.avatar,
            description: this.state.description
        }).then(() => {
            this.props.users[this.props.username].avatar = this.state.avatar;
            this.props.users[this.props.username].description = this.state.description;
            this.props.dispatch(changeProfile(this.state.avatar, this.state.description))
            alert("Profile updated succesfully!")
            this.loadUsers()
        }).catch(err => alert("Error while updating your profile data."))
    }
    submitNewBlog = () => {
        if (!this.state.blogtitle)
            return alert('You must add title to your blog post!')
        if (!this.state.blogcontent)
            return alert('You must add content to your blog post!')
        axios.post(`/rest/admin/blog/add`, {
            title: this.state.blogtitle,
            content: this.state.blogcontent,
            id: `id-${Date.now()}`,
            date: Date.now(),
            author: this.props.username
        }).then(() => {
            alert("Blog updated succesfully!")
            this.loadBlog()
        }).catch(err => alert("Error while ading blog post."))
    }
    toChange = (input, value) => this.setState({ [input]: value })
    banOrUnban = (username) => {
        axios.get(`/rest/admin/ban/${username}`)
            .then(response => {
                this.props.users[username].banned = !this.props.users[username].banned
                this.props.dispatch(banPerson(this.props.users))
                alert(response.data)
            })
            .catch(err => alert(err))
    }

    memberList = () => {
        let memberArray = [ ]
        for (let member in this.props.users) {
            memberArray.push({
                username: member,
                ...this.props.users[member]
            })
        }
        return memberArray.map((member, memberIndex) => 
            <div 
                key={ `management-member-${ memberIndex }` }
                className="profile-management-member">
                    <div>{ member.username }</div>
                    {
                        member.username !== this.props.username 
                            ? <div className="button ban-button" onClick={ () => this.banOrUnban(member.username) }>
                                { this.props.users[member.username].banned === true ? "UNBAN" : "BAN" }
                            </div>
                            : null
                    }
            </div>)
    }
    userSection = () => 
        <div className="profile-section">
            <h2>User section</h2>
            <div className="profile-section-user">
                <h3>Edit your profile</h3>
                <div className="flex-row">
                    <label htmlFor="profile-input-avatar">Your new avatar URL:</label>
                    <input type="text" id="profile-input-avatar" placeholder="avatar url" value={ this.state.avatar } onChange={ e => this.toChange("avatar", e.target.value) } ></input>
                </div>
                <div className="flex-row">
                    <label htmlFor="profile-input-description">Your new description:</label>
                    <input type="text" id="profile-input-description" placeholder="description" value={ this.state.description } onChange={ e => this.toChange("description", e.target.value) } ></input>
                </div>
                <div className="flex-row">
                    <button className="button custom-button profile-input-submit" onClick={ () => this.submitNewData() }>Submit</button>
                </div>
            </div>
        </div>
    
    adminSection = () => 
        <div className="profile-section">
            <h2>Administrator section</h2>
            <div className="profile-section-admin">
                <h3>User management</h3>
                <div>
                {
                    this.memberList()
                }
                </div>
            </div>
            <div className="profile-section-admin">
                <h3>Add a new article</h3>
                <div>
                    <div className="flex-row">
                        <label htmlFor="blog-input-title">Title</label>
                        <input type="text" if="blog-input-title" onChange={ e => this.toChange("blogtitle", e.target.value) }></input>
                    </div>
                    <div className="flex-row">
                        <label htmlFor="blog-input-content">Content</label>
                        <input type="text" id="blog-input-content" onChange={ e => this.toChange("blogcontent", e.target.value) }></input>
                    </div>
                    <div className="flex-row">
                        <button className="button custom-button profile-input-submit" onClick={ () => this.submitNewBlog() }>Submit</button>
                    </div>
                </div>
            </div>
        </div>

    showUserProfile = () => this.userSection()
    showAdminProfile = () => 
        this.props.privilege === "administrator"
            ? this.adminSection()
            : null

    showProfileIfNotBanned = props => 
        props.banned === false
            ? <div className='wrapper-profile flex-column'>
                { this.showUserProfile() }
                { this.showAdminProfile() }
            </div>
            : null

    render() {
        const { props } = this;
        return (
            <div className='flex-column'>
                <div className='wrapper-description'>
                    <div className='page-description'>
                        <h1>{ `${props.username} (${props.privilege})` }
                            { props.banned ? ' - BANNED' : null }
                        </h1>
                        <div className="flex-row">
                            <img src={ this.state.avatar ? this.state.avatar : this.state.unknownAvatar } alt="avatar" style={{ width: "128px", minWidth: "128px", height: "128px", minHeight: "128px", marginRight: "15px", border: "1px solid #000" }} />
                            <div>{ this.state.description ? this.state.description : this.state.unknownDescription }</div>
                        </div>
                    </div>
                </div>
                { this.showProfileIfNotBanned(props) }
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    username: state.username,
    privilege: state.privilege,
    banned: state.banned,
    avatar: state.avatar,
    description: state.description,
    users: state.users
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Profile )