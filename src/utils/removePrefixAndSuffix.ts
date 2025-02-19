const removePrefixAndSuffix = (imageUrl: string) => {
    const prefix = 'https://assets.tarkov.dev/';
    const suffix = '-image.webp';

    // prefix 제거
    let result = imageUrl.startsWith(prefix) ? imageUrl.substring(prefix.length) : imageUrl;

    // suffix 제거
    if (result.endsWith(suffix)) {
        result = result.substring(0, result.length - suffix.length);
    }

    return result;
}


const getStationPrimaryByImageURL = (imageUrl: string) => {
    const prefix = 'https://assets.tarkov.dev/';
    const suffix = '.png';

    // prefix 제거
    let result = imageUrl.startsWith(prefix) ? imageUrl.substring(prefix.length) : imageUrl;

    // suffix 제거
    if (result.endsWith(suffix)) {
        result = result.substring(0, result.length - suffix.length);
    }

    return result;
}


export {removePrefixAndSuffix, getStationPrimaryByImageURL};