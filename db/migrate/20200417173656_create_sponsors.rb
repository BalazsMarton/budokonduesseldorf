class CreateSponsors < ActiveRecord::Migration[5.1]
  def change
    create_table :sponsors do |t|
      t.integer :posnr
      t.string :name
      t.string :logo
      t.boolean :visible

      t.timestamps
    end
  end
end
