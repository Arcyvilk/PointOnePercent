// CONSTANTS
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL'
export const LOG_IN_USER = 'LOG_IN_USER'
export const LOG_OUT_USER = 'LOG_OUT_USER'
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const BAN_PERSON = 'BAN_PERSON'

// ACTION CREATORS
export function showLoginModal() {
    return {
        type: SHOW_LOGIN_MODAL
    }
}
export function logInUser(username, privilege, banned, avatar, description) {
    return {
        type: LOG_IN_USER,
        username: username,
        privilege: privilege,
        banned: banned,
        avatar: avatar,
        description: description
    }
}
export function logOutUser() {
    return {
        type: LOG_OUT_USER
    }
}
export function changeProfile(avatar, description) {
    return {
        type: CHANGE_PROFILE,
        avatar: avatar,
        description: description
    }
}
export function banPerson(users) {
    return {
        type: BAN_PERSON,
        users: users
    }
}