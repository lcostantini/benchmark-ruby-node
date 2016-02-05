class Test
  def call(env)
    [200, {'Content-Type' => 'text/plain'}, [(File.read './test.txt') * 1000]]
  end
end

APP = Test.new
run APP
