class Admin::TtdaysController < AdminController
  before_action :set_ttday, only: [:show, :edit, :update, :destroy]

  # GET /ttdays
  # GET /ttdays.json
  def index
    @ttdays = Ttday.all.order('pos_nr ASC')
  end

  # GET /ttdays/1
  # GET /ttdays/1.json
  def show
    prepare_lessons
  end

  # GET /ttdays/new
  def new
    @ttday = Ttday.new
  end

  # GET /ttdays/1/edit
  def edit
  end

  # POST /ttdays
  # POST /ttdays.json
  def create
    @ttday = Ttday.new(ttday_params)

    respond_to do |format|
      if @ttday.save
        format.html { redirect_to [:admin,@ttday], notice: 'Ttday was successfully created.' }
        format.json { render :show, status: :created, location: @ttday }
      else
        format.html { render :new }
        format.json { render json: @ttday.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ttdays/1
  # PATCH/PUT /ttdays/1.json
  def update
    respond_to do |format|
      if @ttday.update(ttday_params)
        format.html { redirect_to [:admin,@ttday], notice: 'Ttday was successfully updated.' }
        format.json { render :show, status: :ok, location: @ttday }
      else
        format.html { render :edit }
        format.json { render json: @ttday.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ttdays/1
  # DELETE /ttdays/1.json
  def destroy
    @ttday.destroy
    respond_to do |format|
      format.html { redirect_to [:admin,@ttday], notice: 'Ttday was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def prepare_lessons
      @lessons = Lesson.all.where("ttday_id = ?", @ttday.id).order('time_begin ASC')
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_ttday
      @ttday = Ttday.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ttday_params
      params.require(:ttday).permit(:pos_nr, :name)
    end
end
