class CreateCreviews < ActiveRecord::Migration[5.1]
  def change
    create_table :creviews do |t|
      t.integer :pos_nr
      t.string :name
      t.text :content

      t.timestamps
    end
  end
end
