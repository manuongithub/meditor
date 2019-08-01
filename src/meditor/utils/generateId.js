export default function () {
    let timestamp = (new Date()).getTime();
    let random = Math.round(Math.random() * 9876543210);
    return `meditor-ui-${timestamp}${random}`;
};
