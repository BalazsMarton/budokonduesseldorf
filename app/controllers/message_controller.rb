class MessageController < ApplicationController
  skip_before_action :verify_authenticity_token #, only: [:one_or_two_actions_here]


  def new
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)

    respond_to do |format|

      format.html do
        if @message.valid?
          MessageMailer.new_message(@message).deliver_now
          redirect_to contact_sent_path
        else
          redirect_to contact_error_path
        end
      end

      format.js do
        if @message.valid?
          MessageMailer.new_message(@message).deliver_now
          flash.now[:notice] = "Your message has been sent!"
        else
          flash.now[:error]
        end
      end
    end

  end

  def contact_error

  end

  def contact_sent

  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :content)
  end
end