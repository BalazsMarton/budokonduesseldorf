require 'test_helper'

class TtdaysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ttday = ttdays(:one)
  end

  test "should get index" do
    get ttdays_url
    assert_response :success
  end

  test "should get new" do
    get new_ttday_url
    assert_response :success
  end

  test "should create ttday" do
    assert_difference('Ttday.count') do
      post ttdays_url, params: { ttday: { name: @ttday.name } }
    end

    assert_redirected_to ttday_url(Ttday.last)
  end

  test "should show ttday" do
    get ttday_url(@ttday)
    assert_response :success
  end

  test "should get edit" do
    get edit_ttday_url(@ttday)
    assert_response :success
  end

  test "should update ttday" do
    patch ttday_url(@ttday), params: { ttday: { name: @ttday.name } }
    assert_redirected_to ttday_url(@ttday)
  end

  test "should destroy ttday" do
    assert_difference('Ttday.count', -1) do
      delete ttday_url(@ttday)
    end

    assert_redirected_to ttdays_url
  end
end
