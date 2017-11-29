class MessageMailer < ApplicationMailer
	default from: "<info@attilapt.com>"
	default to: "AttilaPT <info@attilapt.com>, "
 
	def new_message(message)
		@message = message
	 
		mail(from: "#{message.name} <#{message.email}>", subject: "Contact request: #{message.name} | attilapt.com ")
	end
end
