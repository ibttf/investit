class CreateTickers < ActiveRecord::Migration[7.0]
  def change
    create_table :tickers do |t|
      t.string :name
      t.string :full_name
      t.integer :shares_owned
      t.float :purchase_price
      t.string :security_type
      t.float :daily_change
      t.float :current_price
      t.timestamps
    end
  end
end
