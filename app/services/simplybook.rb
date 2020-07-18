class Simplybook
    require 'uri'
    require 'net/http'
    
    def self.get_token
        url = URI("https://user-api.simplybook.me/login")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        
        request = Net::HTTP::Post.new(url)
        request["content-type"] = 'application/json'
        request["cache-control"] = 'no-cache'
        request.body = "{\"jsonrpc\":\"2.0\",\"method\":\"getToken\",\"params\":[\"#{ENV['SB_USER']}\",\"#{ENV['SB_API_KEY']}\"],\"id\":1}"
        
        response = http.request(request)
        token = JSON.parse(response.body)

        token = token["result"]
        
    end

    def self.get_eventlist
        
        token = Simplybook.bearer_token
        url = URI("https://user-api.simplybook.me/")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        request = Net::HTTP::Post.new(url)
        request["content-type"] = 'application/json; charset=UTF-8'
        request["x-company-login"] = ENV['SB_USER']
        request["x-token"] = token
        request["accept"] = 'application/json'
        request["cache-control"] = 'no-cache'
        request.body = "{\"jsonrpc\":\"2.0\",\"method\":\"getEventList\",\"params\":[],\"id\":1}"

        response = http.request(request)
    end

    def self.bearer_token
        pattern = /^Bearer /
        header  = request.headers['X-Auth-Token']
        header.gsub(pattern, '') if header && header.match(pattern)
    end
end