class CreatePortfoliosTickersJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :portfolios, :tickers
  end
end
