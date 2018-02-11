json.extract! applicant, :id, :first_name, :last_name, :email, :country, :city, :mbackground, :howfind, :certification, :thoughts, :event_id, :created_at, :updated_at
json.url applicant_url(applicant, format: :json)
