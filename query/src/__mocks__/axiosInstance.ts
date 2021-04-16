
export const axiosUserInstance = {
    get: jest.fn().mockImplementation((url: string, options: any) => {
        throw new Error()
    })
}


export const axiosEventInstance = {
    get: jest.fn().mockImplementation((url: string, options: any) => {
        throw new Error()
    })
}
