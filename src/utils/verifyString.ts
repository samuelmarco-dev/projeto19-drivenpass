export default function emailIncludesUpperCase(string: string){
    const compare = string.toLowerCase();

    if(compare === string) return false;
    return true;
}
