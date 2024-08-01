class Todo
    def initialize(todo_hash = {})
        @todos = todo_hash[:todos] || []
    end

    def add_todo(todo)
        @todos << todo
        puts "Added new task successfully"
    end

    def list_todo
        @todos
    end

    def search_todo(id)
        @todos.find { |todo|
            todo[:id] == id
        }
    end

    def update_todo(id, new_task)
        todo = search_todo(id)
        todo[:task] = new_task[:task]
        todo[:isCompleted] = new_task[:isCompleted]
    end

    def delete_todo(id)
        @todos.delete_if{ |todo|
        todo[:id] == id
    }
    end
end

# hash
todo_hash = {
    todos: [
        { id: 1, isCompleted:false, task: "Study for exam"},
        { id: 2, isCompleted:false, task: "Buy groceries"},
        { id: 3, isCompleted:false, task: "Eat food"}
    ]
}

# new instance
todo_app = Todo.new(todo_hash)

loop do
    puts "Todo- App"
    puts "1. Add Todo List"
    puts "2. List Todo"
    puts "3. Search Todo"
    puts "4. Update Todo"
    puts "5. Delete Todo"
    puts "6. Exit"

    puts "Enter your choice: "
    choice = gets.chomp.to_i

    case choice
        when 1
            puts "Enter task: "
            task = gets.chomp
            todo_app.add_todo({
                id: todo_app.list_todo.length + 1,
                isCompleted: false,
                task: task
            })
        when 2
            puts todo_app.list_todo

        when 3
            puts "Enter id to search: "
            id = gets.chomp.to_i
            puts todo_app.search_todo(id)

        when 4
            puts "Enter id to be updated: "
            id = gets.chomp.to_i
            puts "Enter new task: "
            task = gets.chomp
            puts "isCompleted?"
            isCompleted = gets.chomp
            todo_app.update_todo(id, {task: task, isCompleted: isCompleted})

        when 5
            puts "Enter id to be deleted: "
            id = gets.chomp.to_i
            puts todo_app.delete_todo(id)

        when 6
            break
            
        else
            puts "Invalid choice"
    end
    puts "=========================";
end
