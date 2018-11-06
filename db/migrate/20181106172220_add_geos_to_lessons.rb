class AddGeosToLessons < ActiveRecord::Migration[5.1]
  def change
  	add_column :lessons, :place_lat, :decimal, :precision => 15, :scale => 13
    add_column :lessons, :place_lng, :decimal, :precision => 15, :scale => 13
  end
end
