


export const formatRelativeTime = (postDateFormat) => {
    const now = new Date();
    const pastDate = new Date(postDateFormat)

    const diffInSeconds = Math.floor((now - new Date(pastDate)) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInWeek = 7 * secondsInDay;
    const secondsInMonth = 30 * secondsInDay; // Ortalama ay uzunluğu
    const secondsInYear = 365 * secondsInDay; // Ortalama yıl uzunluğu

    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes} minutes ago`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours} hours ago`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days} days ago`;
    } else if (diffInSeconds < secondsInMonth) {
        const weeks = Math.floor(diffInSeconds / secondsInWeek);
        return `${weeks} weeks ago`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        return `${months} monts ago`;
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        return `${years} years ago`;
    }

}