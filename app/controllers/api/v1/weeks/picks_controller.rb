module Api::V1
  module Weeks
    class PicksController < ApplicationController
      before_action :authenticate_and_set_user
      before_action :set_pick, only: [:show, :update, :destroy]

      # GET /picks
      def index
        @picks = Pick.includes(game: :week)
                      .includes(:entry)
                      .where('weeks.id': params[:week_id])
                      .where('entries.user_id': current_user.id)

        render 'leagues/entries/picks/index.json.jbuilder'
      end

      # GET /picks/1
      def show
        render json: @pick
      end

      # POST /picks
      # def create
      #   @pick = League.new(pick_params)

      #   if @pick.save
      #     @picks =  Pick.includes(:entries).where('entries.user_id': current_user.id)
      #     render 'picks/index.json.jbuilder'
      #   else
      #     render json: @pick.errors, status: :unprocessable_entity
      #   end
      # end

      # DELETE /picks/1
      def destroy
        @pick.destroy
        @picks = Pick.includes(:entry).where('entries.user_id': current_user.id)
        render 'leagues/entries/picks/index.json.jbuilder'
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_pick
          @pick = Pick.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def league_params
          params.require(:pick).permit(:name)
        end
    end
  end
end