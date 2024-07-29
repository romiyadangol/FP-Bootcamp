class TimeTracker
    def initialize
        @start_time = nil
        @end_time = nil
    end

    def start
        @start_time = Time.now
        puts "Time has started at #{@start_time}"
    end

    def stop
        @stop_time = Time.now
        puts "Time has stopped at #{@stop_time}"
        elapsed_time
    end

    def elapsed_time
        if @start_time.nil?
            puts "You have not started the timer yet"
        elsif @stop_time.nil?
            puts "You have not stopped the timer yet"
        else
            puts "Elapsed time: #{@stop_time - @start_time}"
        end
    end
end

tracker = TimeTracker.new ##new instance that calls initialize method

    # tracker.start
    # sleep(5)
    # tracker.stop

# Simple menu
loop do
    puts "1.Start Time"
        puts "2.Stop Time"
        puts "3.Elapsed Time"
        puts "4.Exit"
        print "Enter your choice:"
        choice = gets.chomp.to_i

        case choice
        when 1
            tracker.start
        when 2
            tracker.stop
        when 3
            tracker.elapsed_time
        when 4
            break
        else
            puts "Invalid choice"
        end
    puts "\n\n"
end
