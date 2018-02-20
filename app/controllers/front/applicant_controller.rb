class Front::ApplicantController < FrontController
  skip_before_action :verify_authenticity_token #, only: [:one_or_two_actions_here]


  def new
    @applicant = Applicant.new
  end

  def create
    
    @applicant = Applicant.new(applicant_params)

    respond_to do |format|

      format.html do
        if @applicant.valid?
          @applicant.save!
          ApplicantMailer.new_applicant(@applicant).deliver_now
          ApplicantMailer.applicant_notif(@applicant).deliver_now
          redirect_to events_path
        else
          redirect_to events_path
        end
      end

      format.js do
        if @applicant.valid?
          @applicant.save!
          ApplicantMailer.new_applicant(@applicant).deliver_now
          ApplicantMailer.applicant_notif(@applicant).deliver_now
          flash.now[:applicant_notice] = "Your application has been sent!"
        else
          flash.now[:error]
        end
      end
      
    end

  end

  private

  def applicant_params
      params.require(:applicant).permit(:first_name, :last_name, :email, :country, :city, :mbackground, :howfind, :certification, :thoughts, :event_id)
  end
end