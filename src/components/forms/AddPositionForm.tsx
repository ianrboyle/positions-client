import { LoadingButton } from "@mui/lab"
import { TextField } from "@mui/material"
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { addPosition, getPositionsFetch } from "../../services/positions.server";

export type AddPositionFormValues = {
  symbol: string,
  sharesPurchased: number,
  costBasis: number
}
export const AddPositionForm = () => {
  const {register, control, handleSubmit} = useForm<AddPositionFormValues>();
  const [positionToAdd, setPositionToAdd] = useState<AddPositionFormValues | null>(null);

  const handleAddPosition: SubmitHandler<AddPositionFormValues> = async (formValues) => {
    addPosition(formValues);
  }
  
  return (
    
  <>
  <form onSubmit={handleSubmit(handleAddPosition)}>

  <TextField label="Ticker symbol" {...register('symbol')}/>
  <TextField
    {...register('sharesPurchased')}
    label="Shares Purchased" />
    <TextField
      {...register('costBasis')}
      label="Cost Basis" />
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained">
      Add Position
    </LoadingButton>
  </form>
    </>

  )
}

