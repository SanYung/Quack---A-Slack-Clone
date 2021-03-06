import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { updateChannel, clearChannelErrors, fetchChannel} from '../../actions/channel_action';
import ChannelEditName from './7.channel_edit_title'
import { openModal, closeModal } from '../../actions/modal_actions'


const msp = (state, ownProps) => {
    return ({
        channel: state.entities.allchannels[ownProps.match.params.channelId],
        // channelId: ownProps.match.params.channelId,
        errors: state.errors.channel,
        formType: 'edittitle'
    })
}

const mdp = (dispatch) => ({
    updateChannel: ((channel) => dispatch(updateChannel(channel))),
    fetchChannel: ((channelId) => dispatch(fetchChannel(channelId))),
    clearChannelErrors: (() => dispatch(clearChannelErrors())),
    closeModal: () => dispatch(closeModal())
})

export default withRouter(connect(msp, mdp)(ChannelEditName))