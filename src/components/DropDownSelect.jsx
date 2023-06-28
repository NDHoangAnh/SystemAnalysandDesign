import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DropDown(props) {
  const {
    type,
    handleTypeChange,
    isService,
    listService,
    handleChangeService,
  } = props;

  const [serviceChoice, setServiceChoice] = useState([]);

  const handleChangeServiceChoice = (event) => {
    const selectedServices = event.target.value;
    setServiceChoice(selectedServices);
    const selectedServiceIds = selectedServices.map((service) => service._id);
    handleChangeService(selectedServiceIds);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      {type && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Loại phòng</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="typeChoice"
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <MenuItem value={1}>Phòng bình dân</MenuItem>
            <MenuItem value={2}>Phòng thương gia</MenuItem>
            <MenuItem value={3}>Phòng VIP</MenuItem>
          </Select>
        </FormControl>
      )}
      {isService && (
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">Dịch vụ</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={serviceChoice}
            onChange={handleChangeServiceChoice}
            input={<OutlinedInput label="Dịch vụ" />}
            renderValue={(selected) =>
              selected.map((service) => service.service_name).join(", ")
            }
            MenuProps={MenuProps}
          >
            {listService.map((service) => (
              <MenuItem key={service._id} value={service}>
                <Checkbox
                  checked={serviceChoice.some(
                    (selectedService) => selectedService._id === service._id
                  )}
                />
                <ListItemText primary={service.service_name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
