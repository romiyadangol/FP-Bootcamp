class Address_Book
    attr_accessor :contacts

    def initialize
        @contacts = []
    end

    def add_contact(contact)
        @contacts << contact
        puts "Contact added successfully"
    end

    def list_contacts
        if @contacts.empty?
            puts "NO contact found"
        else
            puts "Contact List:"
            @contacts.each do |contact|
                puts "Name: #{contact.name}"
                puts "Phone: #{contact.phone}"
                puts "Email: #{contact.email}"
                puts "Address: #{contact.address}"
                puts "---------------------------"
            end
        end
    end

    def search_contacts(name)
        @contacts.each do |contact|
            if contact.name == name
                puts "Name: #{contact.name}"
                puts "Phone: #{contact.phone}"
                puts "Email: #{contact.email}"
                puts "Address: #{contact.address}"
                puts "---------------------------"
            end
        end
    end

    def delete_contact(name)
        @contacts.each do |contact|
            if contact.name == name
                @contacts.delete(contact)
                puts "Contact deleted successfully"
            end
        end
    end


end

class Contact
    attr_accessor :name, :phone, :email, :address

    def initialize(name, phone, email, address)
        @name = name
        @phone = phone
        @email = email
        @address = address
    end
end

def menu 
    puts "Address Book Menu: "
    puts "1. Add contact"
    puts "2. List contacts"
    puts "3. Search contact"
    puts "4. Delete contact"
    puts "5. Exit"
    puts "Enter your choice: "
end

##new instance
address_book = Address_Book.new

loop do
    menu
    choice = gets.chomp.to_i

    case choice
        when 1
            print "Enter Name : "
            name = gets.chomp

            print "Enter Phone No. :"
            phone = gets.chomp

            print "Enter Email Address : "
            email = gets.chomp

            print "Enter Address : "
            address = gets.chomp

            contact = Contact.new(name, phone, email, address)
            address_book.add_contact(contact)
        
        when 2
            address_book.list_contacts

        when 3
            print "Enter Name to search: "
            name = gets.chomp
            address_book.search_contacts(name)

        when 4
            print "Enter Name to delete: "
            name = gets.chomp
            address_book.delete_contact(name)

        else
            break
    end
    puts "===============================\n\n"
end

