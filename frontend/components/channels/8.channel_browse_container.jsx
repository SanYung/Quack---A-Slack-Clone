import React from 'react';
import { connect } from 'react-redux';
import ChannelBrowse from './8.channel_browse'
import { openModal, closeModal } from '../../actions/modal_actions'
import { createMembership, fetchAllMemberships, fetchMemberships } from '../../actions/membership_action'
import { channelAddSelector, channelMembersCount2} from '../../reducers/channel_selector'


const msp = (state) => {
    return ({
        currentUser : state.session.currentUser,
        channelAddSelector: channelAddSelector(state),
        channelMembersCount2: channelMembersCount2(state),
        memberships: state.session.memberships

    })
}

const mdp = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    createMembership: (channelId, memberId) => dispatch(createMembership(channelId, memberId)),
    fetchAllMemberships: () => dispatch(fetchAllMemberships()),
    fetchMemberships: (channelId, memberId) => dispatch(fetchMemberships(channelId,memberId))

})

export default connect(msp, mdp)(ChannelBrowse)