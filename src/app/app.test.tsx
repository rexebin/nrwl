import React from "react";
import {render} from "@testing-library/react";
import {App} from "./app";
import {ContextWrapperForTests} from "../testing/ContextWrapperForTests";

test("renders learn react link", () => {
    const {getByText} = render(<ContextWrapperForTests><App
    /></ContextWrapperForTests>);
    const header = getByText(/Tickets/i);
    expect(header).toBeInTheDocument();
});
