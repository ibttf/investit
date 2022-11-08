class CreateTickers < ActiveRecord::Migration[7.0]
  def change
    create_table :tickers do |t|
      t.string :name
      t.string :full_name
      t.integer :shares_owned
      
      t.timestamps
    end
  end
end
