class AddGeosToEvents < ActiveRecord::Migration[5.1]
  def change
  	add_column :events, :place_lat, :decimal, :precision => 15, :scale => 13
    add_column :events, :place_lng, :decimal, :precision => 15, :scale => 13
  end
end
