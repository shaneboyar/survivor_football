module Api::V1
  class LeaguesController < ApplicationController
    before_action :authenticate_and_set_user
    before_action :set_league, only: [:show, :update, :destroy]

    # GET /leagues
    def index
      @leagues =  League.includes(:entries).where('entries.user_id': current_user.id)

      render 'leagues/index.json.jbuilder'
    end

    # GET /leagues/1
    def show
      render 'leagues/show.json.jbuilder'
    end

    # POST /leagues
    def create
      @league = League.new(league_params)
      @league.created_by_id = current_user.id

      if @league.save
        Entry.create(user_id: current_user.id, league_id: @league.id)
        @leagues =  League.includes(:entries).where('entries.user_id': current_user.id)
        render 'leagues/index.json.jbuilder'
      else
        render json: @league.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /leagues/1
    def update
      if @league.update(league_params)
        render json: @league
      else
        render json: @league.errors, status: :unprocessable_entity
      end
    end

    # DELETE /leagues/1
    def destroy
      @league.destroy
      @leagues =  League.includes(:entries).where('entries.user_id': current_user.id)
      render 'leagues/index.json.jbuilder'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_league
        @league = League.includes({entries: :user}).find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def league_params
        params.require(:league).permit(:name)
      end
end
end