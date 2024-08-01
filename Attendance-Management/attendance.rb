class Employee
  attr_accessor :id, :name, :department, :position, :attendance

  def initialize(details = {})
    @id = details[:id]
    @name = details[:name]
    @department = details[:department]
    @position = details[:position]
    @attendance = []
  end
end

class AttendanceManager
  attr_accessor :employees

  def initialize
    @employees = []
  end

  def add_employee(employee)
    if @employees.include?(employee)
      puts "Employee already exists!"
    else
      @employees << employee
      puts "Employee Added Successfully: #{employee.name} (ID: #{employee.id})"
    end
  end

  def mark_attendance(employee, date, status)
    if @employees.include?(employee)
      employee.attendance << {date: date, status: status}
      puts "Attendance marked successfully for #{employee.name} (ID: #{employee.id}) on #{date}"
    else
      puts "Employee Not Found..."
    end
  end

  def display_attendance(employee)
    if @employees.include?(employee)
      puts "Attendance Records for #{employee.name} (ID: #{employee.id}):"
      puts "--------------------------------------------------------"
      employee.attendance.each do |attendance|
        puts "Date: #{attendance[:date]} | Status: #{attendance[:status]}"
      end
      puts "--------------------------------------------------------"
    else
      puts "Employee Not Found..."
    end
  end

  def search_attendance(employee, date)
    if @employees.include?(employee)
      record = employee.attendance.find { |att| att[:date] == date }
      if record
        puts "#{employee.name} (ID: #{employee.id}) was #{record[:status]} on #{date}"
      else
        puts "No attendance record found for #{date}"
      end
    else
      puts "Employee Not Found..."
    end
  end

  def delete_attendance(employee, date)
    if @employees.include?(employee)
      if employee.attendance.any? { |att| att[:date] == date }
        employee.attendance.delete_if { |att| att[:date] == date }
        puts "Attendance deleted successfully for #{employee.name} (ID: #{employee.id}) on #{date}"
      else
        puts "No attendance record found for #{date}"
      end
    else
      puts "Employee Not Found..."
    end
  end
end

# Instances
attendance_manager = AttendanceManager.new

def display_header
  puts "----------------------------------------------------------------------------------"
  puts "                       Attendance Management System                               "
  puts "----------------------------------------------------------------------------------"
end

loop do
  display_header
  puts "1. Add Employee"
  puts "2. Mark Attendance"
  puts "3. Display Attendance"
  puts "4. Search Attendance"
  puts "5. Delete Attendance"
  puts "6. Exit"

  print "Enter your choice: "
  choice = gets.chomp.to_i

  case choice
  when 1
    puts "----------------------------------------------------------------------------------"
    print "Enter employee ID: "
    id = gets.chomp
    print "Enter employee name: "
    name = gets.chomp
    print "Enter employee department: "
    department = gets.chomp
    print "Enter employee position: "
    position = gets.chomp
    employee = Employee.new(id: id, name: name, department: department, position: position)
    attendance_manager.add_employee(employee)

  when 2
    puts "----------------------------------------------------------------------------------"
    print "Enter employee ID: "
    id = gets.chomp
    employee = attendance_manager.employees.find { |emp| emp.id == id }
    if employee
      print "Enter date (YYYY-MM-DD): "
      date = gets.chomp
      print "Enter status (Present/Absent): "
      status = gets.chomp
      attendance_manager.mark_attendance(employee, date, status)
    else
      puts "Employee Not Found..."
    end

  when 3
    puts "----------------------------------------------------------------------------------"
    print "Enter employee ID: "
    id = gets.chomp
    employee = attendance_manager.employees.find { |emp| emp.id == id }
    if employee
      attendance_manager.display_attendance(employee)
    else
      puts "Employee Not Found..."
    end

  when 4
    puts "----------------------------------------------------------------------------------"
    print "Enter employee ID: "
    id = gets.chomp
    employee = attendance_manager.employees.find { |emp| emp.id == id }
    if employee
      print "Enter date (YYYY-MM-DD): "
      date = gets.chomp
      attendance_manager.search_attendance(employee, date)
    else
      puts "Employee Not Found..."
    end

  when 5
    puts "----------------------------------------------------------------------------------"
    print "Enter employee ID: "
    id = gets.chomp
    employee = attendance_manager.employees.find { |emp| emp.id == id }
    if employee
      print "Enter date (YYYY-MM-DD): "
      date = gets.chomp
      attendance_manager.delete_attendance(employee, date)
    else
      puts "Employee Not Found..."
    end

  when 6
    puts "Exiting the system..."
    break

  else
    puts "Invalid choice! Please try again."
  end
end
