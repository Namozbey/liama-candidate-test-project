import React from "react";
import { render } from "@testing-library/react";
import { FallbackLoading } from ".";

describe("Testing FallbackLoading", () => {
  it("Snapshots", () => {
    const { asFragment } = render(<FallbackLoading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
