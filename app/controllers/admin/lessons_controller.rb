class Admin::LessonsController < AdminController
  before_action :set_lesson, only: [:show, :edit, :update, :destroy]

  # GET /lessons
  # GET /lessons.json
  def index
    @lessons = Lesson.joins(:ttday).order('pos_nr ASC, time_begin ASC')
    @lessonswnil = Lesson.joins("LEFT JOIN ttdays ON lessons.ttday_id = ttdays.id").where("ttdays.id IS NULL").order('ttday_id ASC')
  end

  # GET /lessons/1
  # GET /lessons/1.json
  def show
  end

  # GET /lessons/new
  def new
    prepare_days
    
    @lesson = Lesson.new(ttday_id: params[:ttday_value])

    respond_to do |format|
      format.html
      format.js
    end

  end

  # GET /lessons/1/edit
  def edit
    prepare_days

    respond_to do |format|
      format.html
      format.js
    end
  end

  # POST /lessons
  # POST /lessons.json
  def create

    @lesson = Lesson.new(lesson_params)
    lessons_list
    respond_to do |format|
      if @lesson.save
        format.html { redirect_to [:admin,@lesson], notice: 'Lesson was successfully created.' }
        format.json { render :show, status: :created, location: @lesson }
        format.js
      else
        format.html { render :new }
        format.json { render json: @lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lessons/1
  # PATCH/PUT /lessons/1.json
  def update
    lessons_list
    respond_to do |format|
      if @lesson.update(lesson_params)
        format.html { redirect_to [:admin,@lesson], notice: 'Lesson was successfully updated.' }
        format.json { render :show, status: :ok, location: @lesson }
        format.js
      else
        format.html { render :edit }
        format.json { render json: @lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lessons/1
  # DELETE /lessons/1.json
  def destroy
    @lesson.destroy
    respond_to do |format|
      format.html { redirect_to admin_lessons_url, notice: 'Lesson was successfully destroyed.' }
      format.json { head :no_content }
      format.js
    end
  end

  private
    def lessons_list
      @lessons = Lesson.where("ttday_id = ?", lesson_params[:ttday_id]).order('time_begin ASC')
    end

    def prepare_days
      @ttdays_collection = Ttday.all.order('pos_nr ASC')
    end


    # Use callbacks to share common setup or constraints between actions.
    def set_lesson
      @lesson = Lesson.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lesson_params
      params.require(:lesson).permit(:title, :place, :time_begin, :time_end, :ttday_id, :place_lng, :place_lat)
    end
end
