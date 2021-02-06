import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi'

class PostCreate extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            user_id: this.props.user_id,
            body: ''
        }
    }

    handleSubmit(e){
        e.preventDefault();  
        App.cable.subscriptions.subscriptions[0].speak({ post: this.state });
        this.setState( {body: ''});
    }

    update(parameters) {
        return (e) => {
            this.setState({ channel_id: this.props.channelId , [parameters]: e.currentTarget.value })
        };
    }


    render(){
        return (
            <div >
                <form className="PostForm" onSubmit={this.handleSubmit}>
                    <input
                        id="postform-input"
                        type="text"
                        placeholder={!this.props.channel.is_dm ? ` message # ${this.props.channel.title}` : ` message ${this.props.dmsTitlex}`}
                        value={this.state.body}
                        onChange={this.update('body')}
                    />
                </form>
  
                
            </div>
        )
    }


}



export default PostCreate