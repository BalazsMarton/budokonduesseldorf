class CreateBudokoncards < ActiveRecord::Migration[5.1]
  def change
    create_table :budokoncards do |t|
      t.integer :posnr
      t.string :cover
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
