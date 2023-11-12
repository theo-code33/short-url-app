import { getUserFromLocalToken } from "@/utils/jwt";
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);

  const loginPage = "/login";
  const dashboardPage = "/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  useEffect(() => {
    const token = getUserFromLocalToken();
    if (token) {
      setIsLogged(true);
    }
  }, []);
  return (
    <Navbar maxWidth="2xl">
      <NavbarContent justify="end">
        {isLogged ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link onClick={handleLogout}>Se déconnecter</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href={dashboardPage}
                variant="flat"
              >
                Dashboard
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href={loginPage}>Se connecter</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href={loginPage} variant="flat">
                S&apos;inscrire
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
