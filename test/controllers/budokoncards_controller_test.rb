require 'test_helper'

class BudokoncardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @budokoncard = budokoncards(:one)
  end

  test "should get index" do
    get budokoncards_url
    assert_response :success
  end

  test "should get new" do
    get new_budokoncard_url
    assert_response :success
  end

  test "should create budokoncard" do
    assert_difference('Budokoncard.count') do
      post budokoncards_url, params: { budokoncard: { cover: @budokoncard.cover, description: @budokoncard.description, posnr: @budokoncard.posnr, title: @budokoncard.title } }
    end

    assert_redirected_to budokoncard_url(Budokoncard.last)
  end

  test "should show budokoncard" do
    get budokoncard_url(@budokoncard)
    assert_response :success
  end

  test "should get edit" do
    get edit_budokoncard_url(@budokoncard)
    assert_response :success
  end

  test "should update budokoncard" do
    patch budokoncard_url(@budokoncard), params: { budokoncard: { cover: @budokoncard.cover, description: @budokoncard.description, posnr: @budokoncard.posnr, title: @budokoncard.title } }
    assert_redirected_to budokoncard_url(@budokoncard)
  end

  test "should destroy budokoncard" do
    assert_difference('Budokoncard.count', -1) do
      delete budokoncard_url(@budokoncard)
    end

    assert_redirected_to budokoncards_url
  end
end
