require "uri"
require "net/http"

class TickersController < ApplicationController

    def index
        Ticker.all.each {|ticker| 
                            url = URI("https://cloud.iexapis.com/stable/stock/#{ticker.name}/intraday-prices?token=pk_6f4d927f899e4cfe82805039e96fe103")
                            http = Net::HTTP.new(url.host, url.port)
                            http.use_ssl = true
                            http.verify_mode = OpenSSL::SSL::VERIFY_NONE

                            request = Net::HTTP::Get.new(url)
                            request["x-api-key"] = ENV["SYGIC_API_KEY"]
                            request["cache-control"] = 'no-cache'

                            response = http.request(request)
                            last_price= response.read_body.split('"close":')[-3].split(",")[0]
                            open_price=response.read_body.split('"open":')[1].split(",")[0]
                            change=(last_price.to_f - open_price.to_f)/open_price.to_f
                            puts open_price, last_price
                            ticker.update(daily_change: change*100)
                            ticker.update(current_price: last_price)
                            

                        }
        render json: Ticker.all
    end
    def trade
        url = URI("https://cloud.iexapis.com/stable/stock/#{params[:name]}/intraday-prices?token=pk_6f4d927f899e4cfe82805039e96fe103")
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        request = Net::HTTP::Get.new(url)
        request["x-api-key"] = ENV["SYGIC_API_KEY"]
        request["cache-control"] = 'no-cache'

        response = http.request(request)
        last_price= response.read_body.split('"close":')[-3].split(",")[0]
 
        if (last_price.to_f*params[:shares].to_i>@current_user.portfolios.first.buying_power)
            render json: {error: "Not enough buying power!"}, status: :not_found
        else
            if Ticker.find_by(name: params[:name])  
                #if ticker already exists
                ticker=Ticker.find_by(name: params[:name])
                # api call to get the last price

                average_price=((ticker.purchase_price.to_f*ticker.shares_owned).to_f+(last_price.to_s.to_f*params[:shares].to_i).to_f)/(ticker.shares_owned+params[:shares].to_i)
    
                if ticker.shares_owned==nil
                    #if ticker already has some shares
                    ticker.update(shares_owned: params[:shares])
                else
            
                ticker.update(shares_owned: ticker.shares_owned+params[:shares].to_i)
                end
        else
            #if ticker doesn't already exist
            ticker=Ticker.create(name: params[:name])
            ticker.update(shares_owned: params[:shares])
            average_price=last_price

        end
            


        #api price to get the ticker type (stock/crypto/etc)
        
        type=RestClient.get "https://cloud.iexapis.com/stable/stock/#{params[:name]}/company?token=
pk_6f4d927f899e4cfe82805039e96fe103"
        if type.split('"companyName":')[-1].slice(0,4).to_s == "null"

            ticker.update(security_type: "cryptocurrency")
        else
            ticker.update(security_type: "stock")
        end
    

        ticker.update(purchase_price: average_price)
        @current_user.portfolios.first.tickers << ticker
         
        

        #now, we update the portfolio to shrink/grow the buying power according to how much stock you've purchased. we update the value as well, but this happens later (maybe for every refresh).
        portfolio=@current_user.portfolios.first
        portfolio.update(buying_power: (portfolio.buying_power-(last_price.to_f*params[:shares].to_i)))
        


        render json: ticker

        end
    
    end


    private
    def ticker_params
        params.permit(:name,:shares)
    end
end
