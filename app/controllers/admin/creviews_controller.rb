class Admin::CreviewsController < AdminController
  before_action :set_creview, only: [:show, :edit, :update, :destroy]

  # GET /creviews
  # GET /creviews.json
  def index
    @creviews = Creview.all
  end

  # GET /creviews/1
  # GET /creviews/1.json
  def show
  end

  # GET /creviews/new
  def new
    @creview = Creview.new
  end

  # GET /creviews/1/edit
  def edit
  end

  # POST /creviews
  # POST /creviews.json
  def create
    @creview = Creview.new(creview_params)

    respond_to do |format|
      if @creview.save
        format.html { redirect_to [:admin,@creview], notice: 'Creview was successfully created.' }
        format.json { render :show, status: :created, location: @creview }
      else
        format.html { render :new }
        format.json { render json: @creview.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /creviews/1
  # PATCH/PUT /creviews/1.json
  def update
    respond_to do |format|
      if @creview.update(creview_params)
        format.html { redirect_to [:admin,@creview], notice: 'Creview was successfully updated.' }
        format.json { render :show, status: :ok, location: @creview }
      else
        format.html { render :edit }
        format.json { render json: @creview.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /creviews/1
  # DELETE /creviews/1.json
  def destroy
    @creview.destroy
    respond_to do |format|
      format.html { redirect_to admin_creviews_url, notice: 'Creview was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_creview
      @creview = Creview.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def creview_params
      params.require(:creview).permit(:pos_nr, :name, :content)
    end
end
