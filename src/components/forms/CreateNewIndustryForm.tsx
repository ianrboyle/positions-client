import { LoadingButton } from "@mui/lab";
import { Autocomplete, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateIndustryMutation, useCreateSectorMutation } from "../../store";
import CircularIndeterminate from "../progress/Spinner";
import { ISectorDto, IndustryDto } from "../../models/member.model";
import { useState } from "react";

export type CreateIndustryFormValues = {
  industryName: string;
  sectordId: number;
};
type CreateIndustryFormProps = {
  sectors: ISectorDto[] | undefined;
  handleClose: () => void;
};
export const CreateNewIndustryForm = ({ sectors, handleClose }: CreateIndustryFormProps) => {
  const [selectedSector, setSelectedSector] = useState<ISectorDto | null>(null);

  const { register, control, handleSubmit } = useForm<IndustryDto>();
  const [createIndustry, results] = useCreateIndustryMutation();

  const handleCreateIndustry: SubmitHandler<IndustryDto> = async (formValues) => {
    if (selectedSector) {
      formValues.sectorId = selectedSector.id;
      createIndustry(formValues);

      handleClose();
    } else {
      alert("Sector Selection Required");
    }
  };

  const handleSelectSector = (event: React.SyntheticEvent<Element, Event>, value: any) => {
    const selectedSector = sectors?.find((s) => s.sectorName === value);
    console.log(selectedSector);
    if (selectedSector) {
      setSelectedSector(selectedSector);
    }
    if (value === "" || value === null) {
      setSelectedSector(null);
    }
  };

  return (
    <>
      {results.isLoading ? (
        <CircularIndeterminate />
      ) : (
        <form onSubmit={handleSubmit(handleCreateIndustry)}>
          {sectors ? (
            <Autocomplete
              id="sector-search"
              freeSolo
              onChange={handleSelectSector}
              getOptionLabel={(option) => (typeof option != "string" ? option.sectorName : "")}
              options={sectors}
              renderInput={(params) => (
                <TextField {...params} label={selectedSector ? selectedSector.sectorName : "Select Sector"} />
              )}
            />
          ) : null}
          <TextField label="Industry Name" {...register("industryName")} />

          <LoadingButton
            loadingIndicator={results.isLoading}
            loading={results.isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Create Industry
          </LoadingButton>
        </form>
      )}
    </>
  );
};
