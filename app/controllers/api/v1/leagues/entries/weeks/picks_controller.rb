module Api::V1
  module Leagues
    module Entries
      module Weeks
        class PicksController < ApplicationController
          before_action :authenticate_and_set_user
          before_action :set_pick, only: [:show, :update, :destroy]

          # GET /picks
          def index
            @picks = Pick.includes(:entry)
                         .includes(game: :week)
                         .where('weeks.id': params[:week_id])
                         .where('entries.user_id': current_user.id)
                         .where('entries.league_id': params[:league_id])

            render 'leagues/entries/weeks/picks/index.json.jbuilder'
          end

          # GET /picks/1
          def show
            render json: @pick
          end

          # POST /picks
          def create
            @pick = Pick.new(pick_params)

            if @pick.save
              @picks = Pick.includes(:entry)
                         .includes(game: :week)
                         .where('weeks.id': params[:week_id])
                         .where('entries.user_id': current_user.id)
                         .where('entries.league_id': params[:league_id])
              render 'leagues/entries/weeks/picks/index.json.jbuilder'
            else
              render json: @pick.errors, status: :unprocessable_entity
            end
          end

          # POST /leagues
          # def create
          #   @league = League.new(league_params)
          #   @league.created_by_id = current_user.id

          #   if @league.save
          #     Entry.create(user_id: current_user.id, league_id: @league.id)
          #     @leagues =  League.includes(:entries).where('entries.user_id': current_user.id)
          #     render 'leagues/index.json.jbuilder'
          #   else
          #     render json: @league.errors, status: :unprocessable_entity
          #   end
          # end

          # DELETE /picks/1
          def destroy
            @pick.destroy
            @picks = Pick.includes(:entry).where('entries.user_id': current_user.id)
            render 'leagues/entries/weeks/picks/index.json.jbuilder'
          end

          private
            # Use callbacks to share common setup or constraints between actions.
            def set_pick
              @pick = Pick.find(params[:id])
            end

            # Only allow a trusted parameter "white list" through.
            def pick_params
              params.require(:pick).permit(:entry_id, :game_id, :team_id)
            end
        end
      end
    end
  end
end