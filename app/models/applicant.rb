class Applicant < ApplicationRecord
	belongs_to :event

	# include ActiveModel::Model
	# include ActiveModel::Conversion
	# include ActiveModel::Validations

	# attr_accessor :first_name, :last_name, :email, :country, :city, :mbackground, :howfind, :certification, :thoughts

	validates :first_name,
	        presence: { message: "I need your first name to contact you" }
	validates_length_of :first_name, :within => 2..20, :message => "Your first name must be min 2, max 20 char long"
	validates_format_of :first_name, :with => /\A[-a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖŐØòóôõőöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\s]+\z/, :message=> "Use only letters"

	validates :last_name,
	        presence: { message: "I need your last name to contact you" }
	validates_length_of :last_name, :within => 2..20, :message => "Your last name must be min 2, max 20 char long"
	validates_format_of :last_name, :with => /\A[-a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖŐØòóôõőöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\s]+\z/, :message=> "Use only letters"

	validates :email,
	        presence: { message: "I need your email address to contact you" }
	validates_format_of :email, :with => /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/, :message => "Please enter a valid email address"

	validates :country,
	        presence: { message: "Country of residency is required." }
	validates_length_of :country, :within => 2..30, :message => "must be min 2, max 30 char long"
	validates_format_of :country, :with => /\A[-a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖŐØòóôõőöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\s]+\z/, :message=> "Use only letters"

	validates :city,
	        presence: { message: "City of residency is required." }
	validates_length_of :city, :within => 2..30, :message => "must be min 2, max 30 char long"
	validates_format_of :city, :with => /\A[-a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖŐØòóôõőöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\s]+\z/, :message=> "Use only letters"

    validates_length_of :mbackground, maximum: 1000, message:  "Your field must be max 1000 char long"

    validates_length_of :howfind, maximum: 1000, message: "Your field must be max 1000 char long"

    validates_length_of :certification, maximum: 1000, message: "Your field must be max 1000 char long"

    validates_length_of :thoughts, maximum: 1000, message: "Your field must be max 1000 char long"

end
