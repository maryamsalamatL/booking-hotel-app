import "./commands";

import { mount } from "cypress/react18";
import { MemoryRouter } from "react-router-dom";
import Providers from "../../src/components/context/Providers";
import { Toaster } from "react-hot-toast";

Cypress.Commands.add("mount", (component, options = {}) => {
  const { routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;

  const wrapped = (
    <MemoryRouter {...routerProps}>
      <Toaster />
      <Providers>{component}</Providers>
    </MemoryRouter>
  );

  return mount(wrapped, mountOptions);
});
