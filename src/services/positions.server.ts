
export const getUsers = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users`)
  // .then(response => response.json())
  // .then(res => res)

}

export const loginUser = async (loginInfo: ILoginInfo) => {
  return await fetch((`${process.env.REACT_APP_API_URL}/account/login`),{
    method: "POST",
    body: JSON.stringify(loginInfo),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

interface ILoginInfo {
  username: string,
  password: string
}