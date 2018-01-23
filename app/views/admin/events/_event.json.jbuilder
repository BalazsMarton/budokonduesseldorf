json.extract! event, :id, :title, :event_begin, :event_end, :place, :maplink, :cover_image, :event_description, :published_at, :created_at, :updated_at
json.url event_url(event, format: :json)
