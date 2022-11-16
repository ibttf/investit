require "uri"
require "net/http"
class PortfoliosController < ApplicationController
  def buying_power
    render json: @current_user.portfolios.first.buying_power
  end

  def account_value
    portfolio=@current_user.portfolios.first

    tickers={}
    tickers_value=0;
    portfolio.tickers. each {|ticker| 
        puts ticker.name
        if (!tickers[ticker.name])
            #for each unique ticker name, multiply the shares_owned by the last price of the ticker
            url = URI("https://cloud.iexapis.com/stable/stock/#{ticker.name}/intraday-prices?token=pk_6f4d927f899e4cfe82805039e96fe103")
            http = Net::HTTP.new(url.host, url.port)
            http.use_ssl = true
            http.verify_mode = OpenSSL::SSL::VERIFY_NONE

            request = Net::HTTP::Get.new(url)
            request["x-api-key"] = ENV["SYGIC_API_KEY"]
            request["cache-control"] = 'no-cache'

            response = http.request(request)
            last_price= response.read_body.split('"close":')[-3].split(",")[0]
            tickers_value+=(last_price.to_f * ticker.shares_owned)
        end
        tickers[ticker.name]=1
        

    }
    portfolio.update(value: portfolio.buying_power+tickers_value)
    render json: portfolio.buying_power+tickers_value
    end
  
    def daily_change
        portfolio=@current_user.portfolios.first
        puts portfolio.value
        
        portfolio.update(daily_change: ((portfolio.value-10000)/100.round(2)))
        render json: portfolio
    end

    def total_change
        portfolio=@current_user.portfolios.first
        portfolio.update(total_change: ((portfolio.value-10000)/100.round(2)))
        render json: portfolio
    end

    
end
