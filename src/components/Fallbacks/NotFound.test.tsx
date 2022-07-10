import React from "react";
import { render } from "@testing-library/react";
import { NotFound } from ".";

describe("Testing NotFound", () => {
  it("Snapshots", () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
