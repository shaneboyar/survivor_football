module Api::V1
  class GamesController < ApplicationController
    before_action :authenticate_and_set_user
    before_action :set_game, only: [:show]

    # GET /games
    def index
      @games = params[:week_id] ?
        Game.includes(:home_team, :away_team, :week).where(week_id: params[:week_id]).to_a :
        Game.includes(:home_team, :away_team, :week).to_a
      render 'games/index.json.jbuilder'
    end

    # GET /games/1
    def show
      render json: @game
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_game
        @game = Game.find(params[:id])
      end
  end
end