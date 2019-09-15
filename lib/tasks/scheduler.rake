desc "Update game scores and eliminate losers."
task :update_scores => :environment do
  puts "Updating scores and elminating losers..."
    UpdateScoresAndEliminateEntriesJob.perform_now
  puts "done."
end