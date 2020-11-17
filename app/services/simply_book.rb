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

        json = send_request('/login', params)

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

        json = send_request('/', params, headers)

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

        json = send_request('/', params, headers)

        json['result']
    end

    def get_non_work_days(token, year, month, performer_id = 1)
        params = {
            :jsonrpc => '2.0',
            :method => 'getWorkCalendar',
            :params => [year, month, performer_id],
            :id => 4
        }
        headers = {
            'X-Token' => token
        }

        json = send_request('/', params, headers)

        json['result'].select { |k, data| data['is_day_off'] == '1' }.keys
    end

    def book(token, data, performer_id = 1)
        params = {
            :jsonrpc => '2.0',
            :method => 'book',
            :params => [data['eventId'], performer_id, data['date'], data['time'], data['clientData']],
            :id => 5
        }
        headers = {
            'X-Token' => token
        }

        json = send_request('/', params, headers)

        json
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

        json = JSON.parse(response.body)

    end
end
