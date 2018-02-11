class Event < ApplicationRecord
	mount_uploader :cover_image, EventUploader
	has_many :applicant
end
