import React from 'react';
import { connect } from 'react-redux';
import { fetchChannel, deleteChannel, fetchChannels} from '../../actions/channel_action';
import ChannelShow from './4.channels_show';
import { openModal } from '../../actions/modal_actions'
import { deleteMembership , fetchMemberships} from '../../actions/membership_action';
import { channelMembership} from '../../reducers/channel_selector'



const msp = (state, ownProps) => {
    return({
    channel: state.entities.channels[ownProps.match.params.channelId],
    channelId: ownProps.match.params.channelId,
    currentUser : state.session.currentUser,
    channelMembership: channelMembership(state, ownProps),
})}


const mdp = (dispatch) => ({
    fetchMemberships: () => dispatch(fetchMemberships()),
    fetchChannels: (userId) => dispatch(fetchChannels(userId)),
    fetchChannel: ((channelId) => dispatch(fetchChannel(channelId))),
    deleteMembership: ((channelId, memberId) => dispatch(deleteMembership(channelId, memberId))),
    deleteChannel: ((channelId) => dispatch(deleteChannel(channelId))),
    openModal: modal => dispatch(openModal(modal)),
})

export default connect(msp, mdp)(ChannelShow)