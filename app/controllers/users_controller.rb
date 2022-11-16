class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    user = User.create!(user_params)
    portfolio=Portfolio.create(:user_id => user.id )
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end

  def tickers
    render json: @current_user.portfolios.first.tickers
  end

  private
  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url, :bio)
  end




    # t.string "name"
    # t.integer "user_id", null: false
    # t.float "value"
    # t.datetime "last_seen"
    # t.float "change"
end