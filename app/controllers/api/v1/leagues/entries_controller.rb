module Api::V1
  module Leagues
    class EntriesController < ApplicationController
      before_action :authenticate_and_set_user
      before_action :set_pick, only: [:show, :update, :destroy]

      # GET /entries
      def index
        @entries = Entry.where(user_id: current_user.id).where(league_id: params[:league_id])

        render 'leagues/entries/index.json.jbuilder'
      end

      # GET /entries/1
      def show
        render json: @entry
      end

      # POST /entries
      def create
        decryptor = Utilities::Encryptor.new("league_id")

        @entry = Entry.new(entry_params)
        league_id = decryptor.decrypt(params[:league_id])
        @entry.user_id = current_user.id
        @entry.league_id = league_id


        if @entry.save
          @entries = Entry.where(user_id: current_user.id).where(league_id: league_id)
          render 'leagues/entries/index.json.jbuilder'
        else
          render json: @entry.errors, status: :unprocessable_entity
        end
      end

      # DELETE /entries/1
      def destroy
        @entry.destroy
        @entries = Pick.includes(:entry).where('entries.user_id': current_user.id)
        render 'leagues/entries/index.json.jbuilder'
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_pick
          @entry = Pick.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def entry_params
          params.permit(:nickname)
        end
    end
  end
end