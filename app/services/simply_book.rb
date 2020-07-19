require 'uri'
require 'net/http'

class SimplyBook
    def get_token
        params = {
            :jsonrpc => '2.0',
            :method => 'getToken',
            :params => [ENV['SB_USER'], ENV['SB_API_KEY']],
            :id => 1
        }

        response = send_request('/login', params)
        json = JSON.parse(response.body)

        puts json

        json['result']
    end

    def get_events(token)
        params = {
            :jsonrpc => '2.0',
            :method => 'getEventList',
            :params => [],
            :id => 2
        }
        headers = {
            'X-Token' => token
        }

        response = send_request('/', params, headers)
        json = JSON.parse(response.body)

        json['result'].values
    end

    def get_available_times(token, event_id, date, performer_id = 1)
        params = {
            :jsonrpc => '2.0',
            :method => 'getStartTimeMatrix',
            :params => [date, date, event_id, performer_id],
            :id => 3
        }
        headers = {
            'X-Token' => token
        }

        response = send_request('/', params, headers)
        json = JSON.parse(response.body)

        json['result']
    end

    def get_work_days(token, year, month, performer_id = 1)
        params = {
            :jsonrpc => '2.0',
            :method => 'getWorkCalendar',
            :params => [year, month, performer_id],
            :id => 4
        }
        headers = {
            'X-Token' => token
        }

        response = send_request('/', params, headers)
        json = JSON.parse(response.body)

        json['result'].select { |k, data| data['is_day_off'] != '1' }.keys
    end

    private

    def send_request(url, params, headers = {})
        url = URI('https://user-api.simplybook.me' + url)
        request = Net::HTTP::Post.new(url)
        headers.each do |name, value|
            request[name] = value
        end
        request['X-Company-Login'] = ENV['SB_USER']
        request['Content-Type'] = 'application/json; charset=UTF-8'
        request['Accept'] = 'application/json'
        request['Cache-Control'] = 'no-cache'
        request.body = params.to_json

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        response = http.request(request)

        puts response.code

        # if response.code != 200
        #     raise ""
        # end

        response
    end
end
