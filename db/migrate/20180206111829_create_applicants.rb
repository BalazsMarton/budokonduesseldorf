class CreateApplicants < ActiveRecord::Migration[5.1]
  def change
    create_table :applicants do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :country
      t.string :city
      t.text :mbackground
      t.text :howfind
      t.text :certification
      t.text :thoughts
      t.integer :event_id

      t.timestamps
    end
  end
end
