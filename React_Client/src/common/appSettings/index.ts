export const PAGE_TITLE = process.env.REACT_APP_PAGE_TITLE || 'RS React Application';

export const setPageTitle = (title: string) => {
    document.title = String(PAGE_TITLE).concat(' - ').concat(title);
};

export const fbsImageBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/rodtsan-cloud-storage.appspot.com/o/';