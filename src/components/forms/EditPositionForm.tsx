import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { IPosition } from "../../models/position.model";
import { ISectorDto, IndustryDto } from "../../models/member.model";
import Autocomplete from "@mui/material/Autocomplete";

import { Typography } from "@mui/material";
import { useState } from "react";
type EditPositionFormProps = {
  handleClose: () => void;
  position: IPosition | undefined;
  sectors: ISectorDto[] | undefined;
  industries: IndustryDto[] | undefined;
};
export const EditPositionForm = ({ handleClose, position, sectors, industries }: EditPositionFormProps) => {
  const currentSector = sectors?.find((s) => s.id === position?.sectorId);

  const [selectedSector, setSelectedSector] = useState<ISectorDto | null>(null);
  const [sectorIndustries, setSectorIndustries] = useState<IndustryDto[] | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDto | null>(null);

  const handleSelectSector = (event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    const selectedSector = sectors?.find((s) => s.sectorName === value);
    console.log(selectedSector);
    if (selectedSector) {
      setSelectedSector(selectedSector);
      const sectorInds = selectedSector.industries;
      setSectorIndustries(sectorInds);
    }
    if (value === "" || value === null) {
      setSelectedSector(null);
      setSectorIndustries(null);
    }
  };

  const handleSelectIndustry = (event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    const selectedIndustry = industries?.find((i) => i.industryName === value);
    if (selectedIndustry) {
      setSelectedIndustry(selectedIndustry);
      if (!selectedSector) {
        const industrySector = sectors?.find((s) => s.id === selectedIndustry.sectorId);
        industrySector ? setSelectedSector(industrySector) : setSelectedSector(null);
      }
      if (value === "") setSelectedIndustry(null);
    }
  };
  console.log("SEKLEFSA DS:", selectedSector);
  return (
    <>
      <form>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Current Sector: {currentSector?.sectorName}
        </Typography>
        {sectors ? (
          <Autocomplete
            id="sector-search"
            freeSolo
            onChange={handleSelectSector}
            options={sectors.map((s) => s.sectorName)}
            renderInput={(params) => (
              <TextField {...params} label={selectedSector?.sectorName} placeholder={currentSector?.sectorName} />
            )}
          />
        ) : null}
        {industries && !sectorIndustries ? (
          <Autocomplete
            id="sector-search"
            freeSolo
            onChange={handleSelectIndustry}
            options={industries.map((i) => i.industryName)}
            renderInput={(params) => <TextField {...params} label="Industry" placeholder={currentSector?.sectorName} />}
          />
        ) : null}

        {industries && sectorIndustries ? (
          <Autocomplete
            id="sector-search"
            freeSolo
            onChange={handleSelectIndustry}
            options={sectorIndustries.map((i) => i.industryName)}
            renderInput={(params) => <TextField {...params} label="Industry" placeholder={currentSector?.sectorName} />}
          />
        ) : null}

        <TextField label="Shares Purchased" />
        <TextField label="Purchase Price" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Update Position
        </LoadingButton>
      </form>
    </>
  );
};
