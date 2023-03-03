export function convertArrayToObject(arr: any[], key: string) {
    const obj = {}
    arr.forEach(item => {
        obj[item[key]] = item;
    });
    return obj;
}