import { RECEIVE_ALL_POSTS , RECEIVE_POST } from '../actions/post_action';

const PostReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    const nextState = Object.assign({}, oldState)

    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return action.posts
        case RECEIVE_POST:
            return Object.assign(nextState, { [action.post.id]: action.post })
        default:
            return oldState
    }
}

export default PostReducer