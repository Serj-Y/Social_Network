import { actions } from "../../Redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../Redux/reduxStore";

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
};



export default compose<React.ComponentType>(
  connect(mapStateToProps, {...actions }),
  withAuthRedirect
)(Dialogs);