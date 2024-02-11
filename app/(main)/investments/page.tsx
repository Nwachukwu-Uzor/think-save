import { InvestmentsList } from "@/components/investments";
import { Card, Container } from "@/components/shared";
import React from "react";

const Investment = () => {
  return (
    <Container>
      <Card>
        <InvestmentsList />
      </Card>
    </Container>
  );
};

export default Investment;
