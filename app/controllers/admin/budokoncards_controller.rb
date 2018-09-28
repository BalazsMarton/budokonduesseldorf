class Admin::BudokoncardsController < AdminController
  before_action :set_budokoncard, only: [:show, :edit, :update, :destroy]

  # GET /budokoncards
  # GET /budokoncards.json
  def index
    @budokoncards = Budokoncard.all
  end

  # GET /budokoncards/1
  # GET /budokoncards/1.json
  def show
  end

  # GET /budokoncards/new
  def new
    @budokoncard = Budokoncard.new
  end

  # GET /budokoncards/1/edit
  def edit
  end

  # POST /budokoncards
  # POST /budokoncards.json
  def create
    @budokoncard = Budokoncard.new(budokoncard_params)

    respond_to do |format|
      if @budokoncard.save
        format.html { redirect_to [:admin,@budokoncard], notice: 'Budokoncard was successfully created.' }
        format.json { render :show, status: :created, location: @budokoncard }
      else
        format.html { render :new }
        format.json { render json: @budokoncard.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /budokoncards/1
  # PATCH/PUT /budokoncards/1.json
  def update
    respond_to do |format|
      if @budokoncard.update(budokoncard_params)
        format.html { redirect_to [:admin,@budokoncard], notice: 'Budokoncard was successfully updated.' }
        format.json { render :show, status: :ok, location: @budokoncard }
      else
        format.html { render :edit }
        format.json { render json: @budokoncard.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /budokoncards/1
  # DELETE /budokoncards/1.json
  def destroy
    @budokoncard.destroy
    respond_to do |format|
      format.html { redirect_to admin_budokoncards_url, notice: 'Budokoncard was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_budokoncard
      @budokoncard = Budokoncard.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def budokoncard_params
      params.require(:budokoncard).permit(:posnr, :cover, :title, :description)
    end
end
