import { AddPositionFormValues } from "../components/forms/AddPositionForm"
import { IPosition } from "../models/position.model"

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
  const addedPositionData = await fetch((`${process.env.REACT_APP_API_URL}/positions/add-position`),{
    method: "POST",
    body: JSON.stringify(position),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
    }
  })
  // console.log(await addedPositionData.json())
  return await addedPositionData.json()
}

export const getPositionsFetch = async ():Promise<IPosition[]> => {
  
  const token = localStorage.getItem('token') || ""
  const response = await fetch((`${process.env.REACT_APP_API_URL}/positions`),{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
    }
  })
  return response.json();
}
export const tickerSearch = async (searchText: string): Promise<TickerSearch | undefined> => {
  
  // const token = localStorage.getItem('token') || ""
  try {

    const response = await fetch((`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=N8HHW6H9CU7C2Q6B`),{
      method: "GET",
      headers: {
        'User-Agent': 'request',
      },
    });
    if (!response.ok) {
      console.log('Status:', response.status);
    } else {
      const data: TickerSearch = await response.json();
      return data;
    }
  } catch (error) {
    console.log('Error:', error);
    return;
  }


}

export interface TickerSearch {
  bestMatches: BestMatch[];
}

export interface BestMatch {
  "1. symbol":      string;
  "2. name":        string;
  "3. type":        string;
  "4. region":      string;
  "5. marketOpen":  string;
  "6. marketClose": string;
  "7. timezone":    string;
  "8. currency":    string;
  "9. matchScore":  string;
}
