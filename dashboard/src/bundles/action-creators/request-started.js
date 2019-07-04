const requestStarted = ( type, data ) => {

    return {

        type,
        ...data

    }

}

export default requestStarted
