class Sponsor < ApplicationRecord
    mount_uploader :logo, SponsorUploader
end
