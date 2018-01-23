class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :event_begin
      t.datetime :event_end
      t.string :place
      t.string :maplink
      t.string :cover_image
      t.text :event_description
      t.datetime :published_at

      t.timestamps
    end
  end
end
