require 'carrierwave/orm/activerecord'

CarrierWave.configure do |config|

	if Rails.env.development? || Rails.env.test?
    	config.storage = :file
	else
		config.fog_provider = 'fog/aws' 
		config.fog_credentials = {
			:provider              => 'AWS',
			:aws_access_key_id     => ENV['S3_KEY'],
		    :aws_secret_access_key => ENV['S3_SECRET'],
		    :region                => ENV['S3_REGION']
		}

		config.fog_directory =  ENV['S3_BUCKET_NAME']
		config.cache_dir     = "#{Rails.root}/tmp/uploads"   # For Heroku
	end
end