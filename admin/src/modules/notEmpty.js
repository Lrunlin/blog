export default function notEmpty(value) {
    console.log(value);
    console.log(Object.values(value));
    return !Object.values(value).includes("")
}