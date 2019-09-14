# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

set :output, "../log/cron_log.log"

every :friday, at: '1am' do # Use any day of the week or :weekend, :weekday
  runner "UpdateScoresAndEliminateEntriesJob.perform_later"
end

every :sunday, at: ['5pm', '9pm'] do # Use any day of the week or :weekend, :weekday
  runner "UpdateScoresAndEliminateEntriesJob.perform_later"
end

every :monday, at: '1am' do # Use any day of the week or :weekend, :weekday
  runner "UpdateScoresAndEliminateEntriesJob.perform_later"
end

every :tuesday, at: '1am' do # Use any day of the week or :weekend, :weekday
  runner "UpdateScoresAndEliminateEntriesJob.perform_later"
end

# Learn more: http://github.com/javan/whenever
