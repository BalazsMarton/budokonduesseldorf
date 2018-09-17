require 'test_helper'

class CreviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @creview = creviews(:one)
  end

  test "should get index" do
    get creviews_url
    assert_response :success
  end

  test "should get new" do
    get new_creview_url
    assert_response :success
  end

  test "should create creview" do
    assert_difference('Creview.count') do
      post creviews_url, params: { creview: { content: @creview.content, name: @creview.name, pos_nr: @creview.pos_nr } }
    end

    assert_redirected_to creview_url(Creview.last)
  end

  test "should show creview" do
    get creview_url(@creview)
    assert_response :success
  end

  test "should get edit" do
    get edit_creview_url(@creview)
    assert_response :success
  end

  test "should update creview" do
    patch creview_url(@creview), params: { creview: { content: @creview.content, name: @creview.name, pos_nr: @creview.pos_nr } }
    assert_redirected_to creview_url(@creview)
  end

  test "should destroy creview" do
    assert_difference('Creview.count', -1) do
      delete creview_url(@creview)
    end

    assert_redirected_to creviews_url
  end
end
