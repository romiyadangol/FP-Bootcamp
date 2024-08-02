json.extract! test, :id, :first_name, :last_name, :email, :phone, :address, :created_at, :updated_at
json.url test_url(test, format: :json)
