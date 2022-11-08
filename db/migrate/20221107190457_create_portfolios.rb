class CreatePortfolios < ActiveRecord::Migration[7.0]
  def change
    create_table :portfolios do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.float :value
      t.datetime :last_seen
      t.float :change
      
      t.timestamps
    end
  end
end
