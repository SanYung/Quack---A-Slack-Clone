class User < ApplicationRecord

  attr_reader :password
  validates :username, :email, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  has_many :channels, 
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Channel 

  def self.find_by_credentials(username, email, password)
    user = User.find_by(username: username, email:email)
    if user && user.is_password?(password)
        user 
    else
        nil 
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

    def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
