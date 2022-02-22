function getUrl(file) {
    return file;
}
function getFile(file, options) {
    return axios.get(getUrl(file), options);
}

export { getFile };
