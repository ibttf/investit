class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :name, :value, :buying_power, :change, :created_at

  belongs_to :user
end
