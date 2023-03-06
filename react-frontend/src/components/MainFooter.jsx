import '../css/MainFooter.css';
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

function MainFooter(args) {
  const [isOpen, setIsOpen] = useState(false);
    console.log(args);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {<Navbar {...args}>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="mx-auto" fill>
            <NavItem className='customNavItem'>
              <NavLink href="/">Inicio</NavLink>
            </NavItem>
            <NavItem className='customNavItem'>
              <NavLink href="/books">Books</NavLink>
            </NavItem>
            
            <NavItem className='customNavItem'>
              <NavLink href="/courses">Cursos</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>}
      {/* <Navbar fixed="bottom" className="prueba">
        <Nav className="mx-auto" >
            <NavItem >asd</NavItem>
        </Nav>
      </Navbar> */}
      
    </div>
  );
}

export default MainFooter;