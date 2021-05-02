import { isValidID, getYearFromId, getFacultyCodeFromId } from './index'
describe('isValidID', () => {
    it('should return false if id is longer than 10', () => {
        expect(isValidID("61318866011")).toEqual(false)
        expect(isValidID("61318866012")).toEqual(false)
        expect(isValidID("613188660")).toEqual(false)
        expect(isValidID("61318866")).toEqual(false)
        expect(isValidID("6131886621")).toEqual(true)
    })

    it('should return false if id contain alphabet', () => {
        expect(isValidID("6131886601")).toEqual(true)
        expect(isValidID("613x886601")).toEqual(false)
        expect(isValidID("613xx86601")).toEqual(false)
        expect(isValidID("613xxa6601")).toEqual(false)
        expect(isValidID("613xxxb601")).toEqual(false)
        expect(isValidID("613xxxxa01")).toEqual(false)




    })

    it('should return false if student year is not in the interval', () => {

        expect(isValidID("5831886601")).toEqual(false)
        expect(isValidID("5931886601")).toEqual(false)
        expect(isValidID("6531886601")).toEqual(false)
        expect(isValidID("6631886601")).toEqual(false)
        expect(isValidID("6031886601")).toEqual(false)
        expect(isValidID("6431886601")).toEqual(true)
        expect(isValidID("6331886601")).toEqual(true)
        expect(isValidID("6231886601")).toEqual(true)
        expect(isValidID("6131886601")).toEqual(true)


    })

    it('shuld return false if faculty is not in the specify faculy code', () => {
        expect(isValidID("6131886610")).toEqual(false)
        expect(isValidID("6131886611")).toEqual(false)
        expect(isValidID("6131886619")).toEqual(false)
        expect(isValidID("6131886641")).toEqual(false)
        expect(isValidID("6131886645")).toEqual(false)
        expect(isValidID("6131886650")).toEqual(false)
        expect(isValidID("6131886659")).toEqual(false)
        expect(isValidID("6131886601")).toEqual(true)
        expect(isValidID("6131886602")).toEqual(true)
        expect(isValidID("6131886699")).toEqual(true)

    })

});

describe('getYearFromId', () => {
    it('should return corresponding year from id', () => {
        expect(getYearFromId("5831886601")).toEqual("58")
        expect(getYearFromId("5931886601")).toEqual("59")
        expect(getYearFromId("6531886601")).toEqual("65")
        expect(getYearFromId("6631886601")).toEqual("66")
        expect(getYearFromId("6031886601")).toEqual("60")
        expect(getYearFromId("6431886601")).toEqual("64")
        expect(getYearFromId("6331886601")).toEqual("63")
        expect(getYearFromId("6231886601")).toEqual("62")
        expect(getYearFromId("6131886601")).toEqual("61")
    })
})


describe('getFacultyCodeFromId', () => {
    it('should return corresponding faculty code from id', () => {
        expect(getFacultyCodeFromId("6131886610")).toEqual("10")
        expect(getFacultyCodeFromId("6131886611")).toEqual("11")
        expect(getFacultyCodeFromId("6131886619")).toEqual("19")
        expect(getFacultyCodeFromId("6131886641")).toEqual("41")
        expect(getFacultyCodeFromId("6131886645")).toEqual("45")
        expect(getFacultyCodeFromId("6131886650")).toEqual("50")
        expect(getFacultyCodeFromId("6131886659")).toEqual("59")
        expect(getFacultyCodeFromId("6131886601")).toEqual("01")
        expect(getFacultyCodeFromId("6131886602")).toEqual("02")
        expect(getFacultyCodeFromId("6131886699")).toEqual("99")
    })
})