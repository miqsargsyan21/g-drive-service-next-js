import PropTypes from "prop-types";

function handleSetState (message, setState) {
    setState({
        show: true,
        message: message
    });

    setTimeout(() => {
        setState({
            show: false,
            message: '',
        });
    }, 1000);
}

handleSetState.propTypes = {
    message: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired,
}

export default handleSetState;