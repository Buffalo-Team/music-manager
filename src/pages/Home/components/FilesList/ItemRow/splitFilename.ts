const splitFilename = (name: string) => {
    const parts = name.split('.');
    if (!parts.length) {
        return { extension: '', filename: '' };
    }
    const extension = `.${parts.pop()}`;
    const filename = parts.join('.');
    return { extension, filename };
};

export default splitFilename;
