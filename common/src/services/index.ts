import { faculty } from "../db-status/faculty";

export const getCurrentYear = () => {
    const year = (new Date()).getFullYear() + 543;
    return year.toString().slice(-2)
}

export const getYearFromId = (id: string): string => {
    return id.slice(0, 2);
}

export const getFacultyCodeFromId = (id: string): string => {
    return id.slice(-2);
}


export const isValidID = (id: string): boolean => {

    // id must not be longer than 10 characters
    if (id.length !== 10) {
        return false
    }

    // id must not contains alpahbets
    const pattern = /[a-zA-Z]/g
    if (pattern.test(id)) {
        return false
    }

    const rcvyear = getYearFromId(id)
    const facultyCode = getFacultyCodeFromId(id);
    const currentYear = getCurrentYear()

    // only current student who studied in the university is allowed
    if (+rcvyear > +currentYear || +rcvyear <= +currentYear - 4) {
        return false
    }

    // if faculty code is in the 
    if (!faculty[facultyCode]) {
        return false;
    }

    return true;
}




console.log(isValidID("6131886621"))
