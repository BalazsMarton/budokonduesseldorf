class CreateLessons < ActiveRecord::Migration[5.1]
  def change
    create_table :lessons do |t|
      t.string :title
      t.string :place
      t.time :time_begin
      t.time :time_end
      t.integer :ttday_id

      t.timestamps
    end
  end
end
