import { csrfFetch } from "./csrf";

const GET_ALL_COMMENTS = "comments/getAllComments";

const CREATE_COMMENT = "comments/createComment";

const EDIT_COMMENT = "comments/editComment";

const DELETE_COMMENT = "comments/deleteComment";



//actions


//get all comments

const actionGetComments = (songId) => {
    return {
        type: "GET_ALL_COMMENTS",
        songId
    }
}



//create a comment

const actionCreateComment = (comment) => {
    return {
        type: "CREATE_COMMENT",
        comment
    }
}



//edit a comment

const actionEditComment = (comment) => {
    return {
        type: "EDIT_COMMENT",
        comment
    }
}



//delete a comment

const actionDeleteComment = (commendId) => {
    return {
        type: "DELETE_COMMENT",
        commendId
    }
}




//thunks

//get all comments

export const getAllComments =(songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`)

    if (response.ok) {
        const comments = await response.json();
        await dispatch(actionGetComments(comments));
    }
}



//create comment

export const createComment = ({songId, comment}) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({body:comment})
    })

    if (response.ok) {
        const comment = await response.json();
        await dispatch(actionCreateComment(comment))
    }
}



//edit a comment

export const editComment = ({commentId, body}) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({body: body})
    })

    if (response.ok) {
        const editedComment = await response.json();
        await dispatch(actionEditComment(editedComment))
    }
}



//delete comment

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        const deletedComment = await response.json();
        await dispatch(actionDeleteComment(commentId));
        return deletedComment
    }
}





const initialState = {};

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS: {
            const newState = {}
            action.songId.Comments.forEach(comment => {
                newState[comment.id] = comment
            });
            return newState
        }
        case CREATE_COMMENT: {
            const newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case EDIT_COMMENT: {
            const newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case DELETE_COMMENT: {
            const newState = {...state}
            delete newState[action.comment.id]
            return newState
        }
        default:
            return state
    }
}
