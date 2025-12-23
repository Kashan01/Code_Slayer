"use client";

import * as React from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { usePathname, useRouter } from "next/navigation";

const DRAWER_OPEN_WIDTH = 200;
const DRAWER_CLOSED_WIDTH = 64;

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin",
    },
    {
      text: "Add New Problem",
      icon: <AddCircleOutlineIcon />,
      path: "/admin/add-problem",
    },
    {
      text: "Modify Problem",
      icon: <EditNoteIcon />,
      path: "/admin/modify-problem",
    },
  ];

  const drawerWidth = open ? DRAWER_OPEN_WIDTH : DRAWER_CLOSED_WIDTH;

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          transition: "all 0.3s",
        }}
      >
        <Toolbar sx={{background:"#121214"}}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
            backgroundColor: "#121214",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block",color: pathname === item.path ? "var(--mainCol)" : "white" }}>
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => router.push(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: pathname === item.path ? "var(--mainCol)" : "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: "all 0.3s",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
