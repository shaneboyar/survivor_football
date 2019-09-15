module Utilities
  class Encryptor
    def initialize(name)
      len   = ActiveSupport::MessageEncryptor.key_len
      salt  =  Rails.application.secrets.secret_key_base
      key   = ActiveSupport::KeyGenerator.new(name).generate_key(salt, len)
      @crypt = ActiveSupport::MessageEncryptor.new(key)  
    end

    def encrypt(message)
      @crypt.encrypt_and_sign(message)
    end

    def decrypt(hash)
      @crypt.decrypt_and_verify(hash)
    end
  end
end