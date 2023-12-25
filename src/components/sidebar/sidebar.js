import React, { useState, useEffect } from "react";
import {
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Drawer,
  Box,
} from "@mui/material";
import io from "socket.io-client";
import { AddContent } from "../../assets/icons/Add-Content";
import { styles } from "./styles";

const API_URL = "http://localhost:3001";
const DRAWWER_WIDTH = 348;
const DRAWER_POSITION = "left";

const ListItemComponent = ({ item, index = 0 }) => {
  const fontWeight =  index === 1 ? 600 : 400;

  return (
    <Box sx={{ width: DRAWWER_WIDTH, ...styles.box }}>
      <ListItem style={{ ...styles.listItems, paddingLeft: index * 16 }} key={item.id}>
        <div style={styles.listItemsContentWrapper}>
          <ListItemButton>
            {index > 1 && <span style={styles.dot}>•</span>}
            {item.type === "link" && (
              <Link
                href={item.url}
                color="inherit"
                sx={{ ...styles.text, fontWeight }}
              >
                {" "}
                {item.title}
              </Link>
            )}
            {item.type === "file" && (
              <ListItemText
                primary={item.fileName}
                sx={{ "& .MuiTypography-root": { ...styles.text, fontWeight } }}
              />
            )}
            {item.type !== "link" && item.type !== "file" && (
              <ListItemText
                primary={item.title}
                sx={{ "& .MuiTypography-root": { ...styles.text, fontWeight } }}
              />
            )}
          </ListItemButton>
        </div>
        {item.children && item.children.length > 0 && (
          <List>
            {item.children.map((child) => (
              <ListItemComponent
                key={child.id}
                item={{ ...child, parent: item }}
                index={index + 1}
              />
            ))}
          </List>
        )}
      </ListItem>
    </Box>
  );
};

export const Sidebar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io(API_URL, { transports: ["polling"] });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("updateData", (newData) => {
      console.log("Received updated data:", newData);
      setData(newData);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Drawer anchor={DRAWER_POSITION} open={true}>
      <div style={styles.titleContent}>
        <Typography variant="h6" gutterBottom style={styles.title}>
          Contentaize
        </Typography>
        <AddContent />
      </div>
      {data.map((parent) => (
        <ListItemComponent key={parent.id} item={parent} />
      ))}
    </Drawer>
  );
};
