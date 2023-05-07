import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateSectorMutation } from "../../store";
import CircularIndeterminate from "../progress/Spinner";
import { ISectorDto } from "../../models/member.model";

export type CreateSectorFormValues = {
  symbol: string;
  sharesPurchased: number;
  costBasis: number;
};
type CreateSectorFormProps = {
  handleClose: () => void;
};
export const CreateNewSectorForm = ({ handleClose }: CreateSectorFormProps) => {
  const { register, control, handleSubmit } = useForm<ISectorDto>();
  const [createSector, results] = useCreateSectorMutation();

  const handleCreateSector: SubmitHandler<ISectorDto> = async (formValues) => {
    createSector(formValues);

    handleClose();
  };

  return (
    <>
      {results.isLoading ? (
        <CircularIndeterminate />
      ) : (
        <form onSubmit={handleSubmit(handleCreateSector)}>
          <TextField label="Sector Name" {...register("sectorName")} />

          <LoadingButton
            loadingIndicator={results.isLoading}
            loading={results.isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Create Sector
          </LoadingButton>
        </form>
      )}
    </>
  );
};
