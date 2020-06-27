export const ifMobile = callback => {
    const mobileWidth: any = getComputedStyle(document.documentElement).getPropertyValue('--width-mobile').replace('px', '');

    if (window.innerWidth <= mobileWidth) {
        return callback();
    }
}