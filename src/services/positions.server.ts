import { AddPositionFormValues } from "../components/forms/AddPositionForm"

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

export const addPosition = async (formPosition: AddPositionFormValues) => {
  const position = {
    "symbol": formPosition.symbol,
    "sharesOwned": formPosition.sharesPurchased
  }
  const token = localStorage.getItem('token') || ""
  console.log(token)
  return await fetch((`${process.env.REACT_APP_API_URL}/positions/add-position`),{
    method: "POST",
    body: JSON.stringify(position),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
    }
  })
}