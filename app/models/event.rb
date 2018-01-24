class Event < ApplicationRecord
	mount_uploader :cover_image, EventUploader
end
