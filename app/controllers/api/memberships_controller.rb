class Api::MembershipsController < ApplicationController
  
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
    else
        render json: ['Invalid Action'], status: 401
    end
  end

  def index  
    if params[:channelId]
        @memberships = Membership.where(channel_id: params[:channelId])
        render 'api/memberships/index'
    else
      @memberships = Membership.all
      render :index
    end
    
  end
    

  def destroy
    @membership = Membership.find_by(member_id: params[:membership][:member_id], channel_id: params[:membership][:channel_id])
    if @membership
        @membership.destroy 
    else
        render json: ["Sorry, something went wrong when you tried to leave the channel"], status: 404
    end
  end
  
  private
  
  def membership_params
    params.require(:membership).permit(:channel_id, :member_id)
  end

end