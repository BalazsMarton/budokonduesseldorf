class ApplicantMailer < ApplicationMailer
	default from: "<info@attilapt.com>"
	default to: "info@builditgroup.hu" #"AttilaPT <info@attilapt.com>, "
 
	def new_applicant(applicant)
		@applicant = applicant
	 	@event = Event.all
		mail(from: "#{applicant.first_name} #{applicant.last_name} <#{applicant.email}>", subject: "Application for #{applicant.event && applicant.event.title} | attilapt.com ")
	end

	def applicant_notif(applicant)
		@applicant = applicant
	 	@event = Event.all
		mail(from: "info@attilapt.com",to: "#{applicant.email}", subject: "Application for #{applicant.event && applicant.event.title} | attilapt.com ")	 	
	end

end
