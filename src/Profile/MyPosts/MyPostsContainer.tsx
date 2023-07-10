import { actions } from "../../Common/Components/Redux/profileReducer";
import MyPosts, { MapPropsType, DispatchPropsType } from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../Common/Components/Redux/reduxStore";


const MapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        
    }
};
const MyPostContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType> (MapStateToProps,{ addPost: actions.addPostActionCreator })(MyPosts)

export default MyPostContainer 