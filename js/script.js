async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}
