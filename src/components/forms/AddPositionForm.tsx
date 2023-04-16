import { LoadingButton } from "@mui/lab"
import { TextField } from "@mui/material"
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
// import { addPosition, getPositionsFetch } from "../../services/positions.server";
import { useAddPositionMutation } from "../../store";
import { IPosition } from "../../models/position.model";

export type AddPositionFormValues = {
  symbol: string,
  sharesPurchased: number,
  costBasis: number
}
type AddPositionFormProps = {
  handleClose: () => void;
};
export const AddPositionForm = ({handleClose}: AddPositionFormProps) => {
  const {register, control, handleSubmit} = useForm<IPosition>();
  const [addPosition, results] = useAddPositionMutation();
  const handleAddPosition: SubmitHandler<IPosition> = async (formValues) => {
    addPosition(formValues);
    handleClose();
  }
  
  return (
    
  <>
  <form onSubmit={handleSubmit(handleAddPosition)}>

  <TextField label="Ticker symbol" {...register('symbol')}/>
  <TextField
    {...register('sharesOwned')}
    label="Shares Purchased" />
    <TextField
      {...register('purchasePrice')}
      label="Purchase Price" />
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained">
      Add Position
    </LoadingButton>
  </form>
    </>

  )
}

