import { LoadingButton } from "@mui/lab";
import { Autocomplete, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateSectorMutation } from "../../store";
import CircularIndeterminate from "../progress/Spinner";
import { ISectorDto, IndustryDto } from "../../models/member.model";
import { useState } from "react";
import { values } from "lodash";

type ModalFormProps = {
  entityName: string;
  mutationHook: any; // Replace with the appropriate mutation hook type
  handleClose: () => void;
  sectors?: ISectorDto[] | undefined;
  industries?: IndustryDto[] | undefined;
};
export const ModalForm = ({ entityName, mutationHook, handleClose, sectors, industries }: ModalFormProps) => {
  const { register, control, handleSubmit } = useForm<any>();
  const [createEntity, results] = mutationHook();
  const [selectedSector, setSelectedSector] = useState<ISectorDto | null>(null);
  const handleCreateEntity: SubmitHandler<any> = async (formValues) => {
    if (entityName.toLocaleLowerCase() === "sector") {
      console.log(formValues);
      if (sectors && sectors.find((s) => s.sectorName === formValues.sectorName)) {
        alert("Sector Already Exists");
        return;
      }
    }
    if (entityName.toLocaleLowerCase() === "industry") {
      console.log(formValues);
      if (industries && industries.find((i) => i.industryName === formValues.industryName)) {
        alert("Industry Already Exists");
        return;
      } else if (selectedSector) {
        formValues.sectorId = selectedSector.id;
        createEntity(formValues);

        handleClose();
        return;
      } else {
        alert("Sector Selection Required");
        return;
      }
    }

    createEntity(formValues);

    handleClose();
  };
  const handleSelectSector = (event: React.SyntheticEvent<Element, Event>, value: any) => {
    const selectedSector = value ? sectors?.find((s) => s.id === value.id) : null;
    console.log("Selected Sectro", selectedSector);
    console.log("value", value);
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
        <form onSubmit={handleSubmit(handleCreateEntity)}>
          {sectors && entityName.toLocaleLowerCase() === "industry" ? (
            <Autocomplete
              id="sector-search"
              freeSolo
              onChange={handleSelectSector}
              getOptionLabel={(option) => (typeof option != "string" ? option.sectorName : "")}
              options={sectors}
              renderInput={(params) => (
                <TextField {...params} label={selectedSector ? selectedSector?.sectorName : "Select Sector"} />
              )}
            />
          ) : null}
          <TextField label={`${entityName} Name`} {...register(`${entityName.toLocaleLowerCase()}Name`)} />

          <LoadingButton
            loadingIndicator={results.isLoading}
            loading={results.isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Create {entityName}
          </LoadingButton>
        </form>
      )}
    </>
  );
};
