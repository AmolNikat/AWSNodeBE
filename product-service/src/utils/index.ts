export function convertArrayToObject(arr: any[], key: string) {
    const obj = {}
    arr.forEach(item => {
        obj[item[key]] = item;
    });
    return obj;
}

export function customLogger(req) {
    console.log('timeStamp: ', Date.now(), ',', 'Level: ', 'Info,', 'Path: ', req.path, ',', 'Path Parameters: ', JSON.stringify(req.pathParameters), ',', 'Req Body: ', JSON.stringify(req.body));
};