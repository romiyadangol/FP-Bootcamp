class Calculator
    attr_accessor :num1, :num2

    def initialize(numbers = {})
        @num1 = numbers[:num1]
        @num2 = numbers[:num2]
    end

    def add(numbers)
        numbers[:num1] + numbers[:num2]
    end

    def subtract(numbers)
        numbers[:num1] - numbers[:num2]
    end

    def multiply(numbers)
        numbers[:num1] * numbers[:num2]
    end

    def divide(numbers)
        numbers[:num1] / numbers[:num2]
    end
end

calculator = Calculator.new

loop do
    puts "Calculator: "
    puts "1. Add"
    puts "2. Subtract"
    puts "3. Multiply"
    puts "4. Divide"
    puts "5. Exit"

    print "Enter your choice: "
    choice = gets.chomp.to_i

    def get_numbers
        print "Enter first number: "
        num1 = gets.chomp
        print "Enter second number: "
        num2 = gets.chomp

        begin
            num1 = Integer(num1)
            num2 = Integer(num2)
            { num1: num1, num2: num2 }
        rescue ArgumentError
            puts "Invalid input. Please enter numbers only."
            get_numbers
        end
    end

    case choice
    when 1
        numbers = get_numbers
        puts "Result: #{calculator.add(numbers)}"

    when 2
        numbers = get_numbers
        puts "Result: #{calculator.subtract(numbers)}"

    when 3
        numbers = get_numbers
        puts "Result: #{calculator.multiply(numbers)}"

    when 4
        numbers = get_numbers
        puts "Result: #{calculator.divide(numbers)}"

    when 5
        break

    else
        puts "Invalid choice"
    end
    puts "======================================================"
end
