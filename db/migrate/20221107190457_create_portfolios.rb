class CreatePortfolios < ActiveRecord::Migration[7.0]
  def change
    create_table :portfolios do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.float :value, :default=> 10000
      t.float :buying_power, :default=> 10000
      
      t.float :daily_change
      t.float :total_change

      
      t.timestamps
    end
  end
end
