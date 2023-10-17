import { actions } from "../Common/Components/Redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../Common/Components/hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../Common/Components/Redux/reduxStore";

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs);
