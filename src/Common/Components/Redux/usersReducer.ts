import { CommonThunkType, UsersType } from '../Types/Types';
import { usersApi } from "../apiComponents/usersApi";
import { updateObjectInArray } from "../Helper/objectHelper";
import { AppStateType, InferActionsTypes } from './reduxStore';
import { Dispatch } from 'redux';


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //Array of users id,
    filter: {
        term: "",
        friend: null as null | boolean,
    }
};

export const actions = {
    followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),

    unFollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),

    setUsers: (users: Array<UsersType>) => ({ type: "SET_USERS", users } as const),

    setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage } as const),

    setFilter: (filter: FilterType) => ({ type: "SET_FILTER", payload: filter } as const),

    setTotalUsersCount: (totalUsersCount: number) => ({ type: "SET_TOTAL_USERS_COUNT", totalUsersCount } as const),

    toggleIsFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),

    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),

}

const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }

        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }

        case "SET_USERS": {
            return {
                ...state, users: action.users,
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case "SET_FILTER": {
            return {
                ...state,
                filter: action.payload
            }
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }

        case "TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
}

export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter

type ActionTypes = InferActionsTypes<typeof actions>

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = CommonThunkType<ActionTypes>

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));

        let response = await usersApi.requestUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.data.items));
        dispatch(actions.setTotalUsersCount(response.data.totalCount));
    };

const _followUnfollowFlow = async (dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.followSuccess)
};

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersApi.unFollow.bind(usersApi), actions.unFollowSuccess)
};

export default usersReducer;