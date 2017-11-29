class MessageMailer < ApplicationMailer
	default from: "<info@attilapt.com>"
	default to: "Attilapt <balazsmarton90@gmail.com>"
 
	def new_message(message)
		@message = message
	 
		mail(from: "#{message.name} <#{message.email}>", subject: "kapcsolatfelvétel: #{message.name} | attilapt.com ")
	end
end
