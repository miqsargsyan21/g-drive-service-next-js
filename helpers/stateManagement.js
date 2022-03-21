export default function handleSetState (message, setState) {
    setState({
        show: true,
        message: message,
    });

    setTimeout(() => {
        setState({
            show: false,
            message: '',
        });
    }, 1500);
};