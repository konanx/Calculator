import React from "react";
import { Box, Chip, Tooltip } from "@mui/material";

function ItemPrice(price: any) {
  let {
    year = "",
    amount = 9999.99,
    currency_display = "ERROR",
    selectedServices = { 2023: [], 2024: [], 2025: [] },
    setSelectedServices,
    id,
  } = price;
  let active = selectedServices[year].includes(id);
  let disabled = id == 3 && !selectedServices[year].includes(1);

  const handleChange = (active: any) => {
    if (active) {
      setSelectedServices((prev: any) => {
        let new_list = [];
        if (id != 1) {
          new_list = prev[year].filter((item: any) => item != id);
        } else {
          new_list = prev[year].filter((item: any) => item != 3 && item != id);
        }
        return { ...prev, [year]: new_list };
      });
    } else {
      setSelectedServices((prev: any) => {
        prev[year].push(id);
        return { ...prev };
      });
    }
  };
  return (
    <Tooltip
      title={disabled && "Potrzebujesz usługi telewizja aby wybrać tę opcję"}
    >
      <Box>
        <Chip
          label={year + " " + amount.toFixed(2) + currency_display}
          color="success"
          variant={active ? "filled" : "outlined"}
          size="small"
          sx={{ cursor: "pointer" }}
          onClick={(e) => handleChange(active)}
          disabled={disabled}
        />
      </Box>
    </Tooltip>
  );
}

export default ItemPrice;
