json.extract! sponsor, :id, :posnr, :name, :logo, :visible, :created_at, :updated_at
json.url admin_sponsor_url(sponsor, format: :json)
