// created for browse channels 
// returns only existing channels that currentUser is not a member of
// does not include direct message channels
export const channelAddSelector = (state) => {
    if (state.session.currentUser === undefined) {
        return null
    }
    let joinedChannels = Object.values(state.entities.channels)
    let res = []
    joinedChannels.forEach((obj) => {
        res.push(obj.title)
    })
    
    let arr = Object.values(state.entities.allchannels)
    let result = []
    arr.forEach((obj) => {
        if (!res.includes(obj.title) && obj.is_dm === false && obj.is_private === false) {
            result.push(obj)
        }
    })
    return result
}


//
export const channelShowSelector = (state, ownProps) => {
    let joinedChnnels = Object.values(state.entities.channels)
    let arr = []
    joinedChnnels.forEach((obj) => {
        arr.push(obj.id)
    })

    let arr2 = []
    arr.forEach((num) => {
        if (num === parseInt(ownProps.match.params.channelId)){
            arr2.push(num)
        }
    })
    if ( arr2.length !== 0 ){
        return true
    } else {
        return false
    }
}

export const channelMembersCount = (state, ownProps) => {
    let memberships = Object.values(state.entities.memberships)
    let arr = []
    memberships.forEach((obj) => {
        if (obj.channelId === parseInt(ownProps.match.params.channelId)) {
            arr.push(obj.channelId)
        }
    })

    return arr.length
}

// without ownProps
export const channelMembersCount2 = (state) => {
    let memberships = Object.values(state.entities.memberships)
    let hash = {}
    memberships.forEach((obj) => {
        hash[obj.channelId] = []
    })

    memberships.forEach((obj) => {
        hash[obj.channelId].push(obj.memberId)
    })

    return hash
}

// used on dms_create_item to get find dms memberships pertaining to currentUser 
export const channelMembers = (state) => {
    let memberships = Object.values(state.entities.memberships)
    let users = state.entities.users
    let currentUser = state.session.currentUser.username
    let hash = {}
    let arr = []
    memberships.forEach((obj) => {
        hash[obj.channelId] = []
    })

    memberships.forEach((obj) => {
        hash[obj.channelId].push(users[obj.memberId].username)
    })

    Object.values(hash).forEach(item => {
        if (item.length === 2 && item[0] === currentUser) {
            arr.push(item[1])
        } else if (item.length === 2 && item[1] === currentUser){
            arr.push(item[0])
        }

        if (item.length === 1 && item[0] === currentUser ){
            arr.push(item[0])
        }
    })
    return arr
}



// returns a list of user ids that are joined to a channel
export const channelPeopleList = (state, ownProps) => {
    let memberships = Object.values(state.entities.memberships)
    let array = []
    memberships.forEach((obj) => {
        if (obj.channelId === parseInt(ownProps.match.params.channelId)) {
            array.push(obj.memberId)
        }
    })
    return array
}

// returns a list of user names that are joined to a channel 
// excludes my own name
// limit string to 30 characters 
export const channelPplNameList = (state, ownProps) => {
    let memberships = Object.values(state.entities.memberships)
    let array = []
    memberships.forEach((obj) => {
        if (obj.channelId === parseInt(ownProps.match.params.channelId)) {
            array.push(obj.memberId)
        }
    })
    let result = []
    array.forEach((id) => {
        if (state.entities.users[id].username !== state.session.currentUser.username ){
            result.push(state.entities.users[id].username)
        }
    })

//    let final = result.join(', ')
//    return final.slice(0,25).concat('...')
    return result
}



export const channelMembership = (state, ownProps) => {
    let allchannels = Object.values(state.entities.allchannels)
    let thischannel = []
    allchannels.forEach((obj) => {
        if (obj.title === ownProps.match.params.channelId ){
            thischannel.push(obj)
        }
    })

    let mymemberships = []
    let memberships = Object.values(state.entities.memberships)
    memberships.forEach((obj) => {
        if (obj.memberId === parseInt(state.session.currentUser.id)) {
            mymemberships.push(obj) }
    })

    let arr2 = []
    mymemberships.forEach(obj => {
        thischannel.forEach(ele => {
            if (obj.channelId === ele['id']) {
             arr2.push(obj)
            }
        })
    })

    if (arr2.length !== 0){
        return true
    } else {
        return false
    }

}



export const dmsChannelId = (state, ownProps) => {
    let allchannels = Object.values(state.entities.allchannels)
    let existingChannels = []
    allchannels.forEach((obj) => {
        existingChannels.push(obj)
    })

    existingChannels.forEach(channel => {
        if (channel.id === parseInt(ownProps.match.params.channelId)) {
            return channel.id
        }
    })

    return ownProps.match.params.channelId

}


// rendering other user's name for dms

export const dmsTitle = (state, ownProps) => {
    let allmemberships = Object.values(state.entities.memberships)
    let channelmemberships = []
    allmemberships.forEach((obj) => {
        if (obj.channelId === parseInt(ownProps.channel.id)){
            channelmemberships.push(obj)
        }
    })

    let mydm = []
    let channels = Object.values(state.entities.channels)
    channels.forEach((obj => {
        if (obj.is_dm) {
            mydm.push(obj.id)
        }
    }))


    let num = 0
    channelmemberships.forEach(obj => {
        if (mydm.includes(obj.channelId) && obj.memberId !== state.session.currentUser.id && channelmemberships.length !== 1 ) {
            num = obj.memberId
        } else if (channelmemberships.length === 1) {
            num = obj.memberId
        }
    })

    if (state.entities.users[num] !== undefined ){
        return state.entities.users[num].username
    }

}

export const dmsTitlex = (state, ownProps) => {
    let allmemberships = Object.values(state.entities.memberships)
    let channelmemberships = []
    allmemberships.forEach((obj) => {
        if (obj.channelId === parseInt(ownProps.match.params.channelId)) {
            channelmemberships.push(obj)
        }
    })

    let num = 0
    channelmemberships.forEach(obj => {
        if (obj.memberId !== state.session.currentUser.id && channelmemberships.length !== 1) {
            num = obj.memberId
        } else if (channelmemberships.length === 1) {
            num = obj.memberId
        }
    })

    if (state.entities.users[num] !== undefined) {
        return state.entities.users[num].username
    }
}

export const dmsTitleId = (state, ownProps) => {
    let allmemberships = Object.values(state.entities.memberships)
    let channelmemberships = []
    allmemberships.forEach((obj) => {
        if (obj.channelId === parseInt(ownProps.match.params.channelId)) {
            channelmemberships.push(obj)
        }
    })

    let num = 0
    channelmemberships.forEach(obj => {
        if (obj.memberId !== state.session.currentUser.id && channelmemberships.length !== 1) {
            num = obj.memberId
        } else if (channelmemberships.length === 1) {
            num = obj.memberId
        }
    })

    if (state.entities.users[num] !== undefined) {
        return state.entities.users[num].username
    }
}

// last object in channel pojo
export const lastItemChannelId = (state) => {
    let channels = Object.values(state.entities.allchannels)
    let length = channels.length
    let last = channels[length-1]
    if (!last) {
        return null
    }  
    let num = last.id
    return num
}

export const allDmsTitle = (state) => {
    let memberships = Object.values(state.entities.memberships)
    let users = state.entities.users
    let currentUser = state.session.currentUser.username
    let channels = Object.values(state.entities.allchannels)
    let hash = {}
    let arr = []

    memberships.forEach((obj) => {
        hash[obj.channelId] = []
    })

    memberships.forEach((obj) => {
        hash[obj.channelId].push(users[obj.memberId].username)
    })


    let allDms = []
    channels.forEach(obj => {
        if (obj.is_dm === true) {
            allDms.push(obj)
        }
    })

     allDms.forEach(Obj => {
         if (hash[Obj.id].length === 2 && hash[Obj.id][0] === currentUser){
             arr.push(hash[Obj.id][1])
         } else if (hash[Obj.id].length === 2 && hash[Obj.id][1] === currentUser) {
             arr.push(hash[Obj.id][0])
         } else if (hash[Obj.id].length === 1 && hash[Obj.id][0] === currentUser) {
             arr.push(hash[Obj.id][0])
         }
     })
     return arr 
}




// search- showing all nondm channels and all dms that are the currrent users'
export const currentUserSearch = (state) => {
    let memberships = Object.values(state.entities.memberships)
    let users = state.entities.users
    let currentUser = state.session.currentUser.username
    let channels = state.entities.allchannels
    let hash = {}
    let arr = []
    
    memberships.forEach((obj) => {
        hash[obj.channelId] = []
    })

    memberships.forEach((obj) => {
        hash[obj.channelId].push(users[obj.memberId].username)
    })

    Object.keys(hash).forEach(key => {
        if (hash[key].includes(currentUser)) {
            arr.push(channels[key])
        } else if (channels[key].is_dm && hash[key].length == 1 && hash[key].includes(currentUser)){
            arr.push(channels[key])
        // } else if (channels[key].is_dm && hash[key].length == 2 && hash[key][0].includes(currentUser)) {
        //     arr.push(channels[key])
        // } else if (channels[key].is_dm && hash[key].length == 2 && hash[key][1].includes(currentUser)) {
        //     arr.push(channels[key])
        } else if (channels[key].is_private && hash[key].includes(currentUser)){
            arr.push(channels[key])
        }
        else if (!channels[key].is_dm && !channels[key].is_private) {
            arr.push(channels[key])
        }
    })

 
    return arr
}