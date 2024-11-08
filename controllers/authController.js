const register = async (req, res) => {
  console.log("register user")
  res.send("register user")
}

const login = async (req, res) => {
  console.log("login user")
  res.send("login user")
}

const logout = async (req, res) => {
  console.log("logout user")
  res.send("logout user")
} 

module.exports = {
  register,
  login,
  logout
}

