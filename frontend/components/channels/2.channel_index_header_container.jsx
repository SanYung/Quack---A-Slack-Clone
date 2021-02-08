import React from 'react';
import { connect } from 'react-redux';
import ChannelIndexHeader from './2.channel_index_header'
import { openModal } from '../../actions/modal_actions'

const msp = (state) => {
    return {
        currentUser: state.session.currentUser,
        user: state.entities.users[state.session.currentUser.id],
    }
}

const mdp = (dispatch) => ({
    openModal: (modal) => dispatch(openModal(modal))
});

export default connect(msp, mdp)(ChannelIndexHeader)