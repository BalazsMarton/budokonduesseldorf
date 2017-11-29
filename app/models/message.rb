class Message

  include ActiveModel::Model
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attr_accessor :name, :email, :content

  validates :name,
            presence: { message: "We need your name to contact you" }
  validates_length_of :name, :within => 2..20, :message => "Your name must be min. 2, max. 20 char long"
  validates_format_of :name, :with => /\A[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖŐØòóôõőöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\s]+\z/, :message=> "Use only letters"

  validates :email,
            presence: { message: "We need your email address to contact you" }
  validates_format_of :email, :with => /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/, :message => "Please enter a valid email address"

  validates :content,
            presence: { message: "Please fill out the message field" }
  validates_length_of :content, :within => 3..600, :message => "Your message must be min. 3, max. 600 char long"

end