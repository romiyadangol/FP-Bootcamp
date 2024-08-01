class Expense
    attr_accessor :amount, :date, :memo
    def initialize(details = {})
        @amount = details[:amount]
        @date = details[:date]
        @memo = details[:memo]
    end

    def to_s
        "Amount: #{@amount}, Date: #{@date}, Memo: #{@memo}"
    end

    def to_h
        { 
            amount: @amount, 
            date: @date, 
            memo: @memo 
        }
    end
end

class ExpenseTracker
    def initialize
        @expenses = []
    end

    def add_expense(expense)
        @expenses << expense
    end

    def list_expenses
        @expenses.each do |expense|
            puts expense.to_s
        end
    end

    def remove_expense(index)
        @expenses.delete_at(index)
    end

    def total_expenses
        total = 0
        @expenses.each do |expense|
            total += expense.amount
        end
        total
    end


    private

    def load_expenses 
        File.open("expense.txt", "r") do |file|
            @expenses = eval(file.read)
        end
    end

    def save_expenses
        File.open("expense.txt", "w") do |file|
            file.write(@expenses)
        end
    end
end


expense_tracker = ExpenseTracker.new

loop do
    puts"Welcome to Expense Tracker"
    puts "1. Add Expense"
    puts "2. List Expenses"
    puts "3. Remove Expense"
    puts "4. Total Expenses"
    puts "5. Exit"
    print "Enter your choice: "
    choice = gets.chomp.to_i

    case choice
    when 1
        print "Enter amount: "
        amount = gets.chomp.to_f
        print "Enter date: "
        date = gets.chomp
        print "Enter memo: "
        memo = gets.chomp
        expense = Expense.new(amount: amount, date: date, memo: memo)
        expense_tracker.add_expense(expense)
        puts "Expense Added Successfully"
    when 2
        expense_tracker.list_expenses
    when 3
        print "Enter index to remove: "
        index = gets.chomp.to_i
        expense_tracker.remove_expense(index)
        puts "Expense Removed Successfully"
    when 4
        puts "Total Expenses: #{expense_tracker.total_expenses}"
    when 5
        break
    else
        puts "Invalid choice"
    end
end