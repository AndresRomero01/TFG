import '../css/MainNavbar.css';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';

function MainNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args} className="mainNavbar">
        <NavbarBrand href="/" className='brandName'>Arties</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar >
            <NavItem active={true}>
              <NavLink href="/courses">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Books">
                Books
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/courses">Courses</NavLink>
            </NavItem>
          </Nav>
          <Button className="btn btn-primary loginButton" href="/login">Log in</Button>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MainNavbar;