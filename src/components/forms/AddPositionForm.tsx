import { LoadingButton } from "@mui/lab";
import { Autocomplete, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddPositionMutation } from "../../store";
import { IPosition } from "../../models/position.model";
import CircularIndeterminate from "../progress/Spinner";
import { ChangeEvent, useEffect, useState } from "react";
import { BestMatch, tickerSearch } from "../../services/positions.server";

export type AddPositionFormValues = {
  symbol: string;
  sharesPurchased: number;
  costBasis: number;
};
type AddPositionFormProps = {
  handleClose: () => void;
};

export const AddPositionForm = ({ handleClose }: AddPositionFormProps) => {
  const { register, control, handleSubmit } = useForm<IPosition>();
  const [addPosition, results] = useAddPositionMutation();
  const [searchText, setSearchText] = useState<string>("");
  const [tickerSearchResponse, setTickerSearchResponse] = useState<BestMatch[]>();

  useEffect(() => {
    tickerSearch(searchText).then((res) => {
      if (res) setTickerSearchResponse(res.bestMatches);
    });
  }, [searchText]);

  const handleSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event", event);
    // console.log("value", value);
    setSearchText(event.target.value);
  };

  const handleAddPosition: SubmitHandler<IPosition> = async (formValues) => {
    formValues.symbol = searchText;
    addPosition(formValues);
    handleClose();
  };

  return (
    <>
      {results.isLoading ? (
        <CircularIndeterminate />
      ) : (
        <form onSubmit={handleSubmit(handleAddPosition)}>
          <Autocomplete
            id="sector-search"
            freeSolo
            options={tickerSearchResponse ? tickerSearchResponse.map((bm) => bm["1. symbol"]) : []}
            renderInput={(params) => <TextField onChange={handleSearchText} {...params} label="Ticker Search" />}
          />
          <TextField {...register("sharesOwned")} label="Shares Purchased" />
          <TextField {...register("purchasePrice")} label="Purchase Price" />

          <LoadingButton
            loadingIndicator={results.isLoading}
            loading={results.isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Add Position
          </LoadingButton>
        </form>
      )}
    </>
  );
};
