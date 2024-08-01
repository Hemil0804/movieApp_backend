exports.transformUser = async (data) => {
    return {
        userId: data?._id ? data._id : '',
        email: data?.email ? data.email : '',
        status: data?.status ? data.status : 0,
    }
}

exports.transformUserDetails = async (arrayData) => {
    let userData = null

    if (arrayData) {
        userData = await this.transformUser(arrayData)
    }
    return userData
}






