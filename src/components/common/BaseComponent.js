import React from "react";
import _ from "lodash";
import isEmpty from "../../util/isEmpty";

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showErrorModal: false,
        };
    }
    getErrorProps(nextProps) {
        if (!_.isEmpty(nextProps.errors)) {
            this.setState({
                showErrorModal: true,
                errors: nextProps.errors.message,
            });
        }
    }
    getValueFieldProps(nextProps, field, props) {
        if (!isEmpty(props) && props.type === 1) {
            if (!isEmpty(nextProps[field])) {
                this.setState({
                    [field]: nextProps[field],
                });
            }
        } else {
            if (
                !isEmpty(nextProps[field]) ||
                !_.isEqual(nextProps[field], this.state[field])
            ) {
                this.setState({
                    [field]: nextProps[field],
                });
            }
        }
    }

    toggleUploadScore = () => {
        this.setState({
            modalUploadScore: !this.state.modalUploadScore,
        });
    };
    onValueChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onValueSubFieldChange = (event, field) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState((preState) => ({
            [field]: {
                ...preState[field],
                [name]: val,
            },
        }));
    };
    onSelectImage = (field, image) => {
        this.setState({
            [field]: image,
        });
    };
    changeToModifyState = (field, value) => {
        if (field)
            this.setState({
                [field]: value !== undefined ? value : !this.state[field],
            });
        else
            this.setState({
                isModifying:
                    value === undefined ? !this.state.isModifying : value,
            });
    };
    openWarningModal = (field) => {
        if (field) this.toggleModal(field);
        else
            this.setState({
                showWarningModal: !this.state.showWarningModal,
            });
    };
    handleSelectOptionChange = (event, field) => {
        this.setState({ [field]: event.target.value });
    };
    toggleModal = (field) => {
        this.setState({ [field]: !this.state[field] });
    };

    renderMobileDevice() {
        this.setState({ isMobile: window.innerWidth < 975 });
    }
    render() {
        return <div />;
    }
}
