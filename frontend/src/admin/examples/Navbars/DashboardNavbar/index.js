import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// Material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";

// Font Awesome components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Material Dashboard 2 React components
import MDBox from "admin/components/MDBox";

// Material Dashboard 2 React example components
import NotificationItem from "admin/examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "admin/examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "admin/context";
import defaultAvatar from "admin/assets/images/user.png";
import MDTypography from "admin/components/MDTypography";

import {
  faEnvelope,
  faPodcast,
  faShoppingCart,
  faBars,
  faTimes,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { color } from "framer-motion";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const admin = useSelector((state) => state.apiAdmin.admin);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        icon={<FontAwesomeIcon fontSize={"30px"} icon={faEnvelope} />}
        title="Check new messages"
      />
      <NotificationItem
        icon={<FontAwesomeIcon fontSize={"30px"} icon={faPodcast} />}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<FontAwesomeIcon fontSize={"30px"} icon={faShoppingCart} />}
        title="Payment successfully completed"
      />
    </Menu>
  );

  const iconsStyle = (theme) => ({
    color:
      light || darkMode ? theme.palette.white.main : theme.palette.dark.main,
    ...(transparentNavbar &&
      !light && {
        color: darkMode
          ? theme.functions.rgba(theme.palette.text.main, 0.6)
          : theme.palette.text.main,
      }),
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar
        sx={(theme) => ({
          ...navbarContainer(theme),
          justifyContent: "space-between",
        })}
      >
        {/* Left side with Avatar and Username */}
        <MDBox display="flex" alignItems="center">
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <FontAwesomeIcon
              fontSize={"30px"}
              icon={miniSidenav ? faBars : faTimes}
              style={iconsStyle}
            />
          </IconButton>

          {/* Admin Avatar */}
          <Link to="/profile">
            <IconButton sx={navbarIconButton} size="small" disableRipple>
              <Avatar
                src={admin?.avatar || defaultAvatar}
                alt="Admin Avatar"
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>
          </Link>
          {/* Admin Username */}
          <MDTypography variant="caption" fontWeight="medium" ml={1}>
            {admin?.username || "Admin"}
          </MDTypography>
        </MDBox>

        {/* Right side with Home Icon and Menu */}
        <MDBox display="flex" alignItems="center">
          <Link to="/">
            <IconButton
              color="inherit"
              sx={navbarIconButton}
              size="small"
              disableRipple
            >
              <FontAwesomeIcon
                icon={faHome}
                style={{ fontSize: "24px", color: "#e67a00" }}
              />
            </IconButton>
          </Link>
          <Link to="/">
            <MDTypography
              variant="caption"
              fontWeight="medium"
              sx={{ cursor: "pointer" }}
            >
              Về trang người dùng
            </MDTypography>
          </Link>

          {renderMenu()}
        </MDBox>
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
