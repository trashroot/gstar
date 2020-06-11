const bcrypt = require('bcrypt');

const bcryptService = () => {
  const password = (password) => {
    // const salt = bcrypt.genSaltSync();
    const salt = '$2b$10$PdxkWgDmL3pZ4ZyxiTbQDu';    
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  };

  const comparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
  );

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
