class CreateTtdays < ActiveRecord::Migration[5.1]
  def change
    create_table :ttdays do |t|
      t.integer :pos_nr
      t.string :name

      t.timestamps
    end
  end
end
