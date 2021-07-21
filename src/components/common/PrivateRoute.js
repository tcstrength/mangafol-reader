import { Redirect, Route } from "react-router-dom";

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    // const history = useHistory();
    // const location = useLocation();
    // if (location.hash.startsWith("#/")) {
    //     history.push(location.hash.replace("#/", "/#/")); // or history.replace
    // }
    if (window.location.href.split("/")[3] !== "#") {
        window.location.href = window.location.href.replace(
            window.location.href.split("/")[3],
            "#"
        );
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

PrivateRoute.propsType = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(PrivateRoute);
