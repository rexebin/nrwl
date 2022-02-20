import React from "react";
import { render } from "@testing-library/react";
import { App } from "./app";
import { ContextWrapperForTests } from "../testing/ContextWrapperForTests";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  it("should render header", () => {
    const { getByText } = render(
      <ContextWrapperForTests>
        <App />
      </ContextWrapperForTests>
    );
    const header = getByText(/Tickets/i);
    expect(header).toBeInTheDocument();
  });

  it("should create new ticket", async function () {
    const { getByText, findByLabelText, findByText, debug } = render(
      <ContextWrapperForTests>
        <App />
      </ContextWrapperForTests>
    );
    const button = getByText(/New Ticket/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const description = await findByLabelText(/description/i);
    userEvent.clear(description);
    userEvent.type(description, "test1");
    const saveButton = await findByText(/save/i);
    userEvent.click(saveButton);
    const waitTicket = await findByText(/test1/i, { ignore: "textarea" });

    expect(waitTicket).toBeInTheDocument();
  });

  it("should edit new ticket", async function () {
    const { findByLabelText, findByText } = render(
      <ContextWrapperForTests>
        <App />
      </ContextWrapperForTests>
    );

    const item = await findByText("Install a monitor arm");
    userEvent.click(item);
    const description = await findByLabelText(/description/i);
    let installAMonitorArmAndMountAMonitor =
      "install a monitor arm and mount a monitor";
    userEvent.clear(description);
    userEvent.type(description, installAMonitorArmAndMountAMonitor);
    const complete = await findByLabelText(/complete/i);
    userEvent.click(complete);
    const saveButton = await findByText(/save/i);
    userEvent.click(saveButton);

    const waitTicket = await findByText(installAMonitorArmAndMountAMonitor, {
      ignore: "textarea",
    });
    expect(waitTicket).toBeInTheDocument();
  });
});
