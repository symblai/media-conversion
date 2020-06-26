export const isStream = (stream) => {
    return stream !== null
        && typeof stream === 'object'
        && typeof stream.pipe === 'function';
};

export const isReadableStream = (stream) => {
    return isStream(stream)
        && stream.readable !== false
        && typeof stream._read === 'function'
        && typeof stream._readableState === 'object';
};

export const isWritableStream = (stream) => {
    return isStream(stream)
        && stream.writable !== false
        && typeof stream._write === 'function'
        && typeof stream._writableState === 'object';
};
