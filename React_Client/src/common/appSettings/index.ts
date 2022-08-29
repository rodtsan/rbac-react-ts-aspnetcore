export const PAGE_TITLE = process.env.REACT_APP_PAGE_TITLE || 'RS React Application';

/** @params {string} title */
export const setPageTitle = (title: string | undefined) => {
    document.title = String(PAGE_TITLE)
        .concat(' - ')
        .concat(title as string);
};

export const fbsImageBaseUrl =
    'https://firebasestorage.googleapis.com/v0/b/rodtsan-cloud-storage.appspot.com/o/';
