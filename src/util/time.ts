export const calculateSecondsFromAngle = (angle: number) => {
    return Math.round(angle / (2 * Math.PI / (12 * 12))) * 5;
}

export const calculateAngleFromSeconds = (seconds: number) => {
    return (seconds / 5) * (2 * Math.PI / (12 * 12));
}

export const applyLogScale = (value: number, min: number, max: number) => {
    // Logarithmic scale bounds
    const minv = Math.log(60);
    const maxv = Math.log(28800);

    // calculate adjustment factor
    const scale = (maxv - minv) / (max - min);

    return Math.exp(minv + scale * (value - min));
}

export const calculateTimeFromAngle = (angle: number) => {
    const seconds = calculateSecondsFromAngle(angle);
    return applyLogScale(seconds, 0, 720);
};

export const roundAngleToFives = (angle: number) => {
    const fiveSecondAngle = 2 * Math.PI / 144;

    return Math.round(angle / fiveSecondAngle) * fiveSecondAngle;
}

export const padSeconds = (sec: number) => {
    if (`${sec}`.length < 2) {
        return `0${sec}`;
    }

    return sec;
}

export const formatTime = (seconds: number) => {
    var date = new Date(0);
    date.setSeconds(seconds);

    return date.toISOString().substr(11, 8);
}