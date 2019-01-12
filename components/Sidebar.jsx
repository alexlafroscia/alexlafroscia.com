import Link from "next/link";

import Sidebar, { Header, Nav, Section, Footer } from "../editorial/Sidebar";

export default () => (
  <Sidebar>
    <Nav>
      <Header>Menu</Header>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>
    </Nav>

    <Section title="Find Me Online">
      <ul className="contact">
        <li className="fa-twitter">
          <Link href="https://twitter.com/alexlafroscia">
            <a>@alexlafroscia</a>
          </Link>
        </li>
        <li className="fa-github">
          <Link href="https://github.com/alexlafroscia">
            <a>@alexlafroscia</a>
          </Link>
        </li>
      </ul>
    </Section>

    <Footer />
  </Sidebar>
);
