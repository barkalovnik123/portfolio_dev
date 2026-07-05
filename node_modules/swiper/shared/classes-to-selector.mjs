function classesToSelector(classes = '') {
    return `.${classes
        .trim()
        .replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, '\\$1')
        .replace(/ /g, '.')}`;
}

export { classesToSelector as c };
