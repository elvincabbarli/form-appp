export const getTimeElapsed = (publishDate) => {
    const currentDate = new Date();
    const publishDateTime = new Date(publishDate);
    const elapsedMilliseconds = currentDate - publishDateTime;

    // Convert milliseconds to minutes
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));

    if (elapsedMinutes < 1) {
        return "İndicə";
    } else if (elapsedMinutes === 1) {
        return "1 dəqiqə 🕢";
    } else if (elapsedMinutes < 60) {
        return `${elapsedMinutes} dəqiqə 🕢`;
    } else if (elapsedMinutes < 1440) {
        return `${Math.floor(elapsedMinutes / 60)} saat 🕢`;
    } else {
        return `${Math.floor(elapsedMinutes / 1440)} gün 🕢`;
    }
};