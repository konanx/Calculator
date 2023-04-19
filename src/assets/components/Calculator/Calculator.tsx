import React, { useState, useEffect } from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import services from "./services.json";
import ItemPrice from "./ItemPrice";

let promo1: any = { 2023: 79.0, 2024: 89.0, 2025: 99.0 };

function Calculator() {
  const [selectedServices, setSelectedServices] = useState<any>({
    2023: [],
    2024: [],
    2025: [],
  });
  const [zastosowanePromocje, setZastosowanePromocje] = useState([]);
  const [podsumowanie, setPodsumowanie] = useState(0.0);
  const [podsumowaniePromocje, setPodsumowaniePromocje] = useState(0.0);
  useEffect(() => {
    let promocje: any = [];
    let i = 0;
    let end_price = 0.0;
    let end_promocje = 0.0;
    for (let x in selectedServices) {
      let name = "Brak zastosowanych promocji";
      let promo_price = 0.0;
      let normal_price = 0.0;
      if (selectedServices[x].includes(0) && selectedServices[x].includes(1)) {
        normal_price =
          services[0].prices[i].amount + services[1].prices[i].amount;
        promo_price = normal_price - promo1[x];
        name = "Pakiet Internet + Telewizja";
        if (selectedServices[x].includes(3)) {
          promo_price += 29;
          name += " + Dekoder 4k";
        }
      }
      if (selectedServices[x].includes(0) && selectedServices[x].includes(2)) {
        let result =
          services[0].prices[i].amount + services[2].prices[i].amount - 64;
        if (promo_price < result) {
          promo_price = result;
          name = "Pakiet Internet + Abonament telefoniczny";
        }
      }
      promocje.push({
        name,
        year: x,
        normal_price,
        promo_price: promo_price,
      });
      end_promocje += promo_price;
      selectedServices[x].map((id: any) => {
        end_price += services[id].prices[i].amount;
      });
      i++;
    }
    setPodsumowanie(end_price);
    setPodsumowaniePromocje(end_promocje);
    setZastosowanePromocje(promocje);
  }, [selectedServices]);
  return (
    <Container
      maxWidth="md"
      sx={{ mt: 3 }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
      >
        Zadanie rekrutacyjne dla sptech.pl
      </Typography>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {services.map((service) => {
          let { name = "", id } = service;
          return (
            <Box
              key={service.id}
              sx={{ mt: 2 }}
            >
              <Typography
                variant="h6"
                component="div"
                gutterBottom
              >
                {name}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
              >
                {service.prices.length &&
                  service.prices.map((price, index) => {
                    return (
                      <ItemPrice
                        {...price}
                        id={id}
                        currency_display={service.currency_display}
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
                        key={index}
                      />
                    );
                  })}
              </Stack>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mt: 5 }}>
        {zastosowanePromocje.map((item: any, index) => {
          return (
            <Typography
              variant="h6"
              textAlign="center"
              key={index}
            >
              {item.year}: {item.name}{" "}
              {item.promo_price > 0.0 && `(-${item.promo_price.toFixed(2)}zł)`}
            </Typography>
          );
        })}
      </Box>
      <Typography
        sx={{ mt: 3 }}
        variant="h4"
        textAlign="center"
      >
        Do zapłaty: {(podsumowanie - podsumowaniePromocje).toFixed(2)}zł
      </Typography>
    </Container>
  );
}

export default Calculator;
