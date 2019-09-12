module Api::V1
  class TeamsController < ApplicationController
    before_action :authenticate_and_set_user
    before_action :set_game, only: [:show]

    # GET /games
    def index
      @games = Team.all

      render json: @games
    end

    # GET /games/1
    def show
      render json: @game
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_game
        @game = Team.find(params[:id])
      end
  end
end